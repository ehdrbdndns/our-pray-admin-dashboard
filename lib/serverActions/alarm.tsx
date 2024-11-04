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

export const insertOrUpdateAlarm = async (alarm: AlarmType) => {
  const { alarm_id, title, message, last_notification_date, next_notification_date } = alarm;

  try {
    const [rows]: any = await promisePool.query(`
    INSERT INTO alarm 
    
    (alarm_id, title, message, last_notification_date, next_notification_date)

    VALUES (?, ?, ?, ?, ?)

    ON DUPLICATE KEY UPDATE
      title = VALUES(title),
      message = VALUES(message),
      last_notification_date = VALUES(last_notification_date),
      next_notification_date = VALUES(next_notification_date)
    `, [alarm_id, title, message, last_notification_date, next_notification_date]);

    return rows;
  } catch (e) {
    console.error(e);
    throw new Error('알람 정보를 입력/수정하는데 실패했습니다.');
  }
}
