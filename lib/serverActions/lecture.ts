import promisePool from "../db/db";
import { LectureAudioType, LectureType } from "../db/type";

export const retrieveLecturesByPlanId = async (plan_id: string) => {
  try {
    const [rows] = await promisePool.query<LectureType[]>(`
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

export const insertOrUpdateLecture = async (lecture: LectureType) => {
  try {
    const { plan_id, title, description, time, bgm, is_active } = lecture;

    const [rows]: any = await promisePool.query<LectureType[]>(`
      INSERT INTO lecture (plan_id, title, description, time, bgm, is_active)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        description = VALUES(description),
        time = VALUES(time),
        bgm = VALUES(bgm),
        is_active = VALUES(is_active)
    `, [plan_id, title, description, time, bgm, is_active]);

    return rows;
  } catch (e) {
    console.error(e);
    throw new Error('강의 정보를 저장하는데 실패했습니다.');
  }
}

export const insertOrUpdateLectureAudio = async (lectureAudioList: LectureAudioType[]) => {
  try {
    const [rows]: any = await promisePool.query<LectureAudioType[]>(`
      INSERT INTO lecture_audio 
      
      (lecture_audio_id, lecture_id, file_name, audio, caption, start_time)

      VALUES ?

      ON DUPLICATE KEY UPDATE
        file_name = VALUES(file_name),
        audio = VALUES(audio),
        caption = VALUES(caption),
        start_time = VALUES(start_time)
    `, [lectureAudioList]);

    return rows;
  } catch (e) {
    console.error(e);
    throw new Error('강의 음성 정보를 저장하는데 실패했습니다.');
  }
}