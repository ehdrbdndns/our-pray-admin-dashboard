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

      LEFT JOIN user ON question.user_id = user.user_id
    `);

    return rows;
  } catch (e) {
    console.error(e);
    throw new Error('질문 목록을 불러오는데 실패했습니다.');
  }
}