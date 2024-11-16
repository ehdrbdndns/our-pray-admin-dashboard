import { PoolConnection } from "mysql2/promise";
import promisePool from "../db/db";
import { LectureAudioType, LectureType } from "../db/type";

export const retrieveLectureByLectureId = async (lecture_id: string) => {
  try {
    const [rows] = await promisePool.execute<LectureType[]>(`
      SELECT * 
      FROM lecture 
      WHERE lecture_id = ?
    `, [lecture_id]);

    return rows[0];
  } catch (e) {
    console.error(e);
    throw new Error('강의 정보를 가져오는데 실패했습니다.');
  }
}

export const retrieveLecturesByPlanId = async (plan_id: string) => {
  try {
    const [rows] = await promisePool.execute<LectureType[]>(`
      SELECT * 
      FROM lecture 
      WHERE plan_id = ?
    `, [plan_id]);

    return rows;
  } catch (e) {
    console.error(e);
    throw new Error('강의 정보를 가져오는데 실패했습니다.');
  }
}

export const insertOrUpdateLectureFromConn = async (conn: PoolConnection, lecture: LectureType) => {
  try {
    const { lecture_id, plan_id, title, description, time, bgm, is_active } = lecture;

    const [rows]: any = await conn.execute(`
      INSERT INTO lecture (lecture_id, plan_id, title, description, time, bgm, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        description = VALUES(description),
        time = VALUES(time),
        bgm = VALUES(bgm),
        is_active = VALUES(is_active),
        updated_date = NOW()
    `, [lecture_id, plan_id, title, description, time, bgm, is_active]);

    return rows;
  } catch (e) {
    console.error(e);
    throw new Error('강의 정보를 저장하는데 실패했습니다.');
  }
}

export const insertOrUpdateAudioFromConn = async (conn: PoolConnection, lectureAudioList: LectureAudioType[]) => {
  try {
    const values = lectureAudioList.map((audio) => [
      audio.lecture_audio_id,
      audio.lecture_id,
      audio.file_name,
      audio.audio,
      audio.caption,
      audio.is_active,
      audio.start_time
    ])

    const [rows]: any = await conn.query(`
      INSERT INTO lecture_audio 
      (lecture_audio_id, lecture_id, file_name, audio, caption, is_active, start_time)
      VALUES ?
      ON DUPLICATE KEY UPDATE
        file_name = VALUES(file_name),
        audio = VALUES(audio),
        caption = VALUES(caption),
        is_active = VALUES(is_active),
        start_time = VALUES(start_time),
        updated_date = NOW()
    `, [values]);

    return rows;
  } catch (e) {
    console.error(e);
    throw new Error('강의 음성 정보를 저장하는데 실패했습니다.');
  }
}

export const retrieveAudioByLectureId = async (lecture_id: string) => {
  try {
    const [rows] = await promisePool.execute<LectureAudioType[]>(`
      SELECT * 
      FROM lecture_audio 
      WHERE lecture_id = ?
       AND is_active = 1
    `, [lecture_id]);

    return rows;
  } catch (e) {
    console.error(e);
    throw new Error('강의 음성 정보를 가져오는데 실패했습니다.');
  }
}

export const deleteAudioListByAudioIdFromConn = async (conn: PoolConnection, audioIdList: string[]) => {
  try {
    const [rows]: any = await conn.query(`
      UPDATE lecture_audio
      SET is_active = 0
      WHERE lecture_audio_id IN (?)
    `, [audioIdList]);

    return rows;
  } catch (e) {
    console.error(e);
    throw new Error('강의 음성 정보를 삭제하는데 실패했습니다.');
  }
}