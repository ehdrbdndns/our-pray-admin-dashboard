import promisePool from "../db/db";
import { LectureType } from "../db/type";

export const retrieveLectureByLectureId = async (lecture_id: string) => {
  try {
    const [rows] = await promisePool.query<LectureType[]>(`
      SELECT * 
      FROM lecture 
      WHERE lecture_id = ?
      LIMIT 1
    `, [lecture_id]);

    return rows[0];
  } catch (e) {
    console.error(e);
    throw new Error('강의 정보를 가져오는데 실패했습니다.');
  }
}