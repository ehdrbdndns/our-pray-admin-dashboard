import promisePool from "../db/db";
import { BibleType } from "../db/type";

export async function getAllBibles() {
  try {
    const [rows] = await promisePool.query<BibleType[]>(`
      SELECT * FROM bible_quote
    `);

    return rows;
  } catch (e) {
    console.error(e);
    throw new Error('성경 정보를 가져오는데 실패했습니다.');
  }
}

export async function insertOrUpdateBible(bible_quote_id: string, title: string, content: string) {
  try {
    const [rows]: any = await promisePool.query(`
      INSERT INTO bible_quote (bible_quote_id, title, content)
  
        VALUES (?, ?, ?)
  
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        content = VALUES(content)
    `, [bible_quote_id, title, content]);

    if (rows.affectedRows === 0) {
      throw new Error('성경 정보를 입력/수정하는데 실패했습니다.');
    }
  } catch (e) {
    console.error(e);
    throw new Error('성경 정보를 입력/수정하는데 실패했습니다.');
  }
}

export async function deleteBible(bible_quote_id: string) {
  try {
    const [rows]: any = await promisePool.query(`
    DELETE FROM bible_quote
    WHERE bible_quote_id = ?
    `, [bible_quote_id]);

    if (rows.affectedRows === 0) {
      throw new Error('성경 정보를 삭제하는데 실패했습니다.');
    }

  } catch (e) {
    console.error(e);
    throw new Error('성경 정보를 삭제하는데 실패했습니다.');
  }
}