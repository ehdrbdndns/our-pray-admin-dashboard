import promisePool from "../db/db";
import { ReplyType } from "../db/type";

export const retrieveRepliesByQuestionId = async (questionId: string) => {
  try {
    const [rows] = await promisePool.query<ReplyType[]>(`
      SELECT 
        question_reply_id, reply.user_id, user.name as user_name
        , question_id, content, is_active, is_replier
        , reply.updated_date, reply.created_date
      
      FROM question_reply as reply

      LEFT JOIN user 
        ON reply.user_id = user.user_id

      WHERE question_id = ?

      ORDER BY reply.created_date ASC
    `, [questionId]);

    return rows;
  } catch (e) {
    console.error(e);
    throw new Error('답변 목록을 불러오는데 실패했습니다.');
  }
}

export const insertOrUpdateReply = async (reply: ReplyType) => {
  const { question_reply_id, question_id, user_id, content, is_active, is_replier } = reply;

  try {
    const [rows]: any = await promisePool.query(`
      INSERT INTO question_reply 
        (question_reply_id, question_id, user_id, content, is_active, is_replier)
      VALUES 
        (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        content = ?,
        updated_date = NOW()
    `, [question_reply_id, question_id, user_id, content, is_active, is_replier, content]);

    return rows;
  } catch (e) {
    console.error(e);
    throw new Error('답변을 저장하는데 실패했습니다.');
  }
}