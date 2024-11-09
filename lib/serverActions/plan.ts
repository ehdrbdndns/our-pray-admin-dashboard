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

export async function retrievePlanById(plan_id: string) {
  try {
    const [rows] = await promisePool.query<PlanType[]>(`
      SELECT * 
      FROM plan 
      WHERE plan_id = ?
      LIMIT 1
    `, [plan_id]);

    return rows[0];
  } catch (e) {
    console.error(e);
    throw new Error('기도 플랜 정보를 가져오는데 실패했습니다.');
  }
}

export async function insertOrUpdatePlan(plan: PlanType) {
  const {
    plan_id, title, description, author_name,
    author_description, author_profile, is_active,
    thumbnail, s_thumbnail
  } = plan;
  try {

    const [rows]: any = await promisePool.query(`
      INSERT INTO plan 
        (plan_id, title, description, author_name, author_description, author_profile, is_active, thumbnail, s_thumbnail)
      VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        description = VALUES(description),
        author_name = VALUES(author_name),
        author_description = VALUES(author_description),
        author_profile = VALUES(author_profile),
        is_active = VALUES(is_active),
        thumbnail = VALUES(thumbnail),
        s_thumbnail = VALUES(s_thumbnail),
        updated_date = NOW()
    `, [
      plan_id, title, description, author_name,
      author_description, author_profile, is_active,
      thumbnail, s_thumbnail
    ]);

    return rows;
  } catch (e) {
    console.error(e);
    throw new Error('기도 플랜 정보를 저장하는데 실패했습니다.');
  }
}