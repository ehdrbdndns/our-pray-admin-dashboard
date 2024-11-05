import promisePool from "../db/db";
import { PlanType } from "../db/type";

export async function getAllPlans() {
  try {
    const [rows] = await promisePool.query<PlanType[]>(`
      SELECT * FROM plan
    `);

    return rows;
  } catch (e) {
    console.error(e);
    throw new Error('기도 플랜 정보를 가져오는데 실패했습니다.');
  }
}