import promisePool from "@/lib/db/db";
import { LectureAudioType, LectureType } from "@/lib/db/type";
import { hasSession } from "@/lib/serverActions/auth";
import { insertOrUpdateLecture, insertOrUpdateLectureAudio } from "@/lib/serverActions/lecture";
import { createUniqId } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  console.error("error");
  return NextResponse.json({ error: 'Bad request' }, { status: 400 });
}

export async function POST(req: NextRequest) {
  console.log("create lecture");

  try {

    const session = await hasSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // transaction on
    await promisePool.beginTransaction();

    const formData = await req.formData();
    const lecture_id = createUniqId();
    const plan_id = formData.get('plan_id');

    const lecture = {
      lecture_id: createUniqId(),
      plan_id: plan_id,
      title: formData.get('title'),
      description: formData.get('description'),
      time: formData.get('time'),
      bgm: formData.get('bgm'),
      is_active: true,
      updated_date: '',
      created_date: '',
    } as LectureType;

    if (!lecture.plan_id || !lecture.title || !lecture.description
      || !lecture.time || !lecture.bgm
    ) {
      return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }

    const lectureRows = await insertOrUpdateLecture(lecture);

    if (lectureRows.affectedRows === 0) {
      console.error("affectedRows is 0 of lecture");
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    const audioList = formData.get('audioList') as unknown as string[];
    const audioNameList = formData.get('audioNameList') as unknown as string[];
    const startTimeList = formData.get('startTimeList') as unknown as string[];
    const captionList = formData.get('captionList') as unknown as string[];

    const lectureAudioList = [] as LectureAudioType[];

    for (let i = 0; i < audioList.length; i++) {
      lectureAudioList.push({
        lecture_audio_id: createUniqId(),
        lecture_id: lecture_id,
        file_name: audioNameList[i],
        audio: audioList[i],
        caption: captionList[i],
        start_time: startTimeList[i],
        updated_date: '',
        created_date: ''
      } as LectureAudioType)
    }

    if (lectureAudioList.length !== 0) {
      const audioRows = await insertOrUpdateLectureAudio(lectureAudioList);

      if (audioRows.affectedRows === 0) {
        console.error("affectedRows is 0 of audio");
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
    }

    // transaction commit
    await promisePool.commit();

    return NextResponse.json({ plan_id }, { status: 200 });
  } catch (e) {
    console.error(e);
    await promisePool.rollback();
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}