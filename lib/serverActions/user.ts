import promisePool from "@/lib/db/db";
import { UserType } from "../db/type";
import { PoolConnection } from "mysql2/promise";

async function getAllUsers() {
  const [rows] = await promisePool.query<UserType[]>(`
    SELECT 
      user.user_id, user.created_date, email
      , name, profile, role, status, alarm
      , oauth_email, oauth_provider
    FROM user

    LEFT JOIN user_state 
      
      ON user.user_id = user_state.user_id
  `);

  return rows;
}

async function retrieveUserExpoTokenByQuestionIdFromConn(conn: PoolConnection, question_id: string) {
  try {
    const [rows]: any = await conn.query(`
      SELECT 
        expo_push_token
      FROM question

        INNER JOIN user_state
          ON question.user_id = user_state.user_id

      WHERE question_id = ?
    `, [question_id]);

    console.log(question_id);

    console.log(JSON.stringify(rows));

    return rows[0].expo_push_token as string;
  } catch (e) {
    console.error(e);
    throw new Error('사용자 정보를 불러오는데 실패했습니다.');
  }
}

async function insertOrUpdateUserState(user_id: string, role: string, status: string) {
  try {
    const [result]: any = await promisePool.query(`
      INSERT INTO user_state (role, status, user_id)
  
        VALUES (?, ?, ?)
  
      ON DUPLICATE KEY UPDATE
        role = VALUES(role),
        status = VALUES(status)
    `, [role, status, user_id]);

    if (result.affectedRows === 0) {
      throw new Error('사용자 상태 변경에 실패했습니다.');
    }
  } catch (e) {
    console.error(e);
    throw new Error('사용자 상태 변경에 실패했습니다.');
  }
}

async function disableUserAlarm(user_id: string) {
  try {
    const [result]: any = await promisePool.query(`
      UPDATE user_state
      SET alarm = false
      WHERE user_id = ?
    `, [user_id]);

    if (result.affectedRows === 0) {
      throw new Error('사용자 알람 변경에 실패했습니다.');
    }
  } catch (e) {
    console.error(e);
    throw new Error('사용자 알람 변경에 실패했습니다.');
  }
}

export { getAllUsers, insertOrUpdateUserState, retrieveUserExpoTokenByQuestionIdFromConn, disableUserAlarm }