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