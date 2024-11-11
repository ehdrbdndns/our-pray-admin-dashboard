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

export interface AlarmType extends RowDataPacket {
  alarm_id: string;
  title: string;
  message: string;
  last_notification_date: string | null;
  next_notification_date: string | null;
  created_date: string;
}

export interface PlanType extends RowDataPacket {
  plan_id: string;
  title: string;
  description: string;
  thumbnail: string;
  s_thumbnail: string;

  author_name: string;
  author_description: string;
  author_profile: string;

  is_active: boolean;

  updated_date: string;
  created_date: string;
}

export interface LectureType extends RowDataPacket {
  lecture_id: string;
  plan_id: string;
  title: string;
  description: string;
  time: number;
  bgm: string;
  is_active: boolean;
  updated_date: string;
  created_date: string;
}

export interface LectureAudioType extends RowDataPacket {
  lecture_audio_id: string;
  lecture_id: string;
  file_name: string;
  audio: string;
  caption: string;
  start_time: string;
  created_date: string;
  updated_date: string;
}