import { PoolConnection } from "mysql2/promise";
import promisePool from "../db/db";
import { QuestionType } from "../db/type";

export const getAllQuestions = async () => {
  try {
    const [rows] = await promisePool.query<QuestionType[]>(`
      SELECT 
        question_id, question.user_id, content
        , category, user.name as user_name
        , is_answered, is_active
        , question.updated_date, question.created_date
      
      FROM question

        LEFT JOIN user 
          ON question.user_id = user.user_id

      ORDER BY question.updated_date DESC
    `);

    return rows;
  } catch (e) {
    console.error(e);
    throw new Error('질문 목록을 불러오는데 실패했습니다.');
  }
}

export const retrieveQuestionById = async (questionId: string) => {
  try {
    const [rows] = await promisePool.query<QuestionType[]>(`
      SELECT 
        question_id, question.user_id, content
        , category, user.name as user_name
        , is_answered, is_active
        , question.updated_date, question.created_date
      
      FROM question

      LEFT JOIN user ON question.user_id = user.user_id

      WHERE question_id = ?

      LIMIT 1
    `, [questionId]);

    return rows[0];
  } catch (e) {
    console.error(e);
    throw new Error('질문을 불러오는데 실패했습니다.');
  }
}

export const markQuestionAsAnsweredFromConn = async (conn: PoolConnection, questionId: string) => {
  try {
    const [rows]: any = await conn.query(`
      UPDATE question
      SET is_answered = true, updated_date = NOW()
      WHERE question_id = ?
    `, [questionId]);

    return rows;
  } catch (e) {
    console.error(e);
    throw new Error('질문을 답변 완료로 변경하는데 실패했습니다.');
  }
}