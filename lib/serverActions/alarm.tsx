import promisePool from "../db/db";
import { AlarmType } from "../db/type";

export const getAllAlarms = async () => {
  try {
    const [rows] = await promisePool.query<AlarmType[]>(`
      SELECT * FROM alarm
    `);

    return rows;
  } catch (e) {
    console.error(e);
    throw new Error('알람 정보를 가져오는데 실패했습니다.');
  }
}