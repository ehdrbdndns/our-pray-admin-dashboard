import { RowDataPacket } from "mysql2";

export interface UserType extends RowDataPacket {
  // 정보
  user_id: string;
  email: string;
  oauth_email: string;
  oauth_provider: string;
  name: string;
  profile: string;
  created_date: Date;

  // 상태
  role: 'admin' | 'counselor' | 'user';
  status: 'active' | 'inactive' | 'banned';
  alarm: boolean;
}

export interface BibleType extends RowDataPacket {
  bible_quote_id: string;
  title: string;
  content: string;
  created_date: Date;
}

export interface QuestionType extends RowDataPacket {
  question_id: string;
  user_id: string;
  content: string;
  category: string;
  is_answered: boolean;
  is_active: boolean;
  updated_date: Date;
  created_date: Date;

  user_name: string;
}

export interface ReplyType extends RowDataPacket {
  question_reply_id: string;
  user_id: string;
  question_id: string;
  content: string;
  is_active: boolean;
  is_replier: boolean;
  updated_date: string;
  created_date: string;

  user_name: string;
}