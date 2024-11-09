import promisePool from "../db/db";
import { LectureType } from "../db/type";

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