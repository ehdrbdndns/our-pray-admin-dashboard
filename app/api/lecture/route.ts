import promisePool from "@/lib/db/db";
import { AudioType, LectureAudioType, LectureType } from "@/lib/db/type";
import { insertOrUpdateAuditByConn } from "@/lib/serverActions/audit";
import { hasSession } from "@/lib/serverActions/auth";
import { deleteAudioListByAudioIdFromConn, insertOrUpdateAudioFromConn, insertOrUpdateLectureFromConn } from "@/lib/serverActions/lecture";
import { createUniqId } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("create lecture");

  const conn = await promisePool.getConnection();
  await conn.beginTransaction();

  try {
    const session = await hasSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const lecture_id = createUniqId();
    const plan_id = formData.get('plan_id');

    const lecture = {
      lecture_id,
      plan_id: plan_id,
      title: formData.get('title'),
      description: formData.get('description'),
      time: formData.get('time'),
      bgm: formData.get('bgm'),
      bgmExtension: formData.get('bgmExtension'),
      is_active: true,
      updated_date: '',
      created_date: '',
    } as LectureType;

    if (!lecture.plan_id || !lecture.title || !lecture.description
      || !lecture.time || !lecture.bgm
    ) {
      return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }

    // insert lecture
    const lectureRows = await insertOrUpdateLectureFromConn(conn, lecture);

    if (lectureRows.affectedRows === 0) {
      console.error("affectedRows is 0 of lecture");
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    const audioList = JSON.parse(formData.get('audioList') as string) as AudioType[];
    const audioNameList = JSON.parse(formData.get('audioNameList') as string) as string[];
    const startTimeList = JSON.parse(formData.get('startTimeList') as string) as string[];
    const captionList = JSON.parse(formData.get('captionList') as string) as string[];

    const lectureAudioList = [] as LectureAudioType[];

    for (let i = 0; i < audioList.length; i++) {
      lectureAudioList.push({
        lecture_audio_id: createUniqId(),
        lecture_id: lecture_id,
        file_name: audioNameList[i],
        audio: audioList[i].url,
        extension: audioList[i].extension,
        caption: captionList[i],
        is_active: true,
        start_time: startTimeList[i],
        updated_date: '',
        created_date: ''
      } as LectureAudioType)
    }

    // insert lecture audio
    if (lectureAudioList.length !== 0) {
      const audioRows = await insertOrUpdateAudioFromConn(conn, lectureAudioList);

      if (audioRows.affectedRows === 0) {
        console.error("affectedRows is 0 of audio");
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
    }

    // update plan lecture audit
    const { affectedRows } = await insertOrUpdateAuditByConn({
      conn, plan_id: lecture.plan_id
    }) as { affectedRows: number };

    if (affectedRows === 0) {
      console.error("affectedRows is 0 of audit");
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    // transaction commit
    await conn.commit();

    return NextResponse.json({ plan_id }, { status: 200 });
  } catch (e) {
    console.error(e);
    await conn.rollback();
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    conn.release();
  }
}

export async function PATCH(req: NextRequest) {
  console.log("update lecture");

  const conn = await promisePool.getConnection();
  await conn.beginTransaction();

  try {
    const session = await hasSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const lecture_id = formData.get('lecture_id');
    const plan_id = formData.get('plan_id');

    const lecture = {
      lecture_id,
      plan_id: plan_id,
      title: formData.get('title'),
      description: formData.get('description'),
      time: formData.get('time'),
      bgm: formData.get('bgm'),
      bgmExtension: formData.get('bgmExtension'),
      is_active: formData.get('is_active') === 'true',
      updated_date: '',
      created_date: '',
    } as LectureType;

    if (!lecture.plan_id || !lecture.title || !lecture.description
      || !lecture.time || !lecture.bgm || !lecture.bgmExtension
    ) {
      return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }

    // insert lecture
    const lectureRows = await insertOrUpdateLectureFromConn(conn, lecture);

    if (lectureRows.affectedRows === 0) {
      console.error("affectedRows is 0 of lecture");
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    // insert lecture audio
    const insertAudioList = JSON.parse(formData.get('insertAudioList') as string) as AudioType[];
    const audioNameList = JSON.parse(formData.get('audioNameList') as string) as string[];
    const startTimeList = JSON.parse(formData.get('startTimeList') as string) as string[];
    const captionList = JSON.parse(formData.get('captionList') as string) as string[];
    const existingAudioListCount = parseInt(formData.get('existingAudioListCount') as string);

    const insertAudioRows = [] as LectureAudioType[];

    for (let i = 0; i < insertAudioList.length; i++) {
      const { url, extension } = insertAudioList[i];
      const index = i + existingAudioListCount;

      insertAudioRows.push({
        lecture_audio_id: createUniqId(),
        lecture_id: lecture_id,
        file_name: audioNameList[index],
        audio: url,
        extension: extension,
        caption: captionList[index],
        is_active: true,
        start_time: startTimeList[index],
        updated_date: '',
        created_date: ''
      } as LectureAudioType)
    }

    if (insertAudioList.length !== 0) {
      const rows = await insertOrUpdateAudioFromConn(conn, insertAudioRows);

      if (rows.affectedRows === 0) {
        console.error("affectedRows is 0 of audio");
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
    }

    // delete lecture audio
    const deleteAudioList = JSON.parse(formData.get('deleteAudioList') as string) as string[];
    if (deleteAudioList.length !== 0) {
      const rows = await deleteAudioListByAudioIdFromConn(conn, deleteAudioList);

      if (rows.affectedRows === 0) {
        console.error("affectedRows is 0 of delete audio");
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
    }

    // update plan lecture audit
    const { affectedRows } = await insertOrUpdateAuditByConn({
      conn, plan_id: lecture.plan_id
    }) as { affectedRows: number };

    if (affectedRows === 0) {
      console.error("affectedRows is 0 of audit");
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    // transaction commit
    await conn.commit();

    return NextResponse.json({ plan_id }, { status: 200 });
  } catch (e) {
    console.error(e);
    await conn.rollback();
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    conn.release();
  }
}