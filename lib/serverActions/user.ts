import promisePool from "@/lib/db/db";
import { UserType } from "../db/type";

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

async function insertOrUpdateUserState(user_id: string, role: string, status: string) {
  try {
    const [result, fields] = await promisePool.query(`
      INSERT INTO user_state (role, status)
  
        VALUES (?, ?)
  
      ON DUPLICATE KEY UPDATE
        role = VALUES(role),
        status = VALUES(status)
  
      WHERE user_id = ?
    `, [role, status, user_id]);

    console.log(result, fields);
  } catch (e) {
    console.error(e);
    throw new Error('사용자 상태 변경에 실패했습니다.');
  }
}

export { getAllUsers, insertOrUpdateUserState }