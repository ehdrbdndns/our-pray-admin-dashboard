import { PoolConnection } from "mysql2/promise";

export async function insertOrUpdateAuditByConn({
  conn,
  plan_lecture_audit_id,
  plan_id
}: {
  conn: PoolConnection,
  plan_lecture_audit_id?: string;
  plan_id: string;
}) {
  try {

    if (!plan_lecture_audit_id) {
      const [rows]: any = await conn.query(`
      UPDATE plan_lecture_audit
      SET
        UPDATED_DATE = NOW()
      WHERE
        plan_id = ?
      `, [plan_id]);

      return rows;
    } else {
      const [rows]: any = await conn.query(`
      INSERT INTO plan_lecture_audit
        (plan_lecture_audit_id, plan_id)
      VALUES
        (?, ?)
      ON DUPLICATE KEY UPDATE
        UPDATED_DATE = NOW()
      `, [plan_lecture_audit_id, plan_id]);

      return rows;
    }

  } catch (e) {
    console.error(e);
    throw new Error('강의 audit 정보를 저장하는데 실패했습니다.');
  }
}