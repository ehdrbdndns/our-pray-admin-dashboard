import promisePool from "@/lib/db";
import { UserType } from "./type";

async function getAllUsers() {
  const [rows] = await promisePool.query<UserType[]>(`
    SELECT 
      user.user_id, user.created_date, email
      , name, profile, role, status, alarm
      , oauth_email, oauth_provider
    FROM user

    LEFT JOIN user_state ON user.user_id = user_state.user_id
  `);

  return rows;
}

export { getAllUsers }