import promisePool from "@/lib/db/db";
import { ReplyType } from "@/lib/db/type";
import { hasSession } from "@/lib/serverActions/auth";
import { markQuestionAsAnsweredFromConn, retrieveQuestionById } from "@/lib/serverActions/question";
import { deleteReply, insertOrUpdateReply, insertOrUpdateReplyFromConn, retrieveRepliesByQuestionId } from "@/lib/serverActions/question-reply";
import { createUniqId, XSSFilter } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { retrieveUserExpoTokenByQuestionIdFromConn } from "@/lib/serverActions/user";
import { pushNotification } from "@/lib/notification";

export async function GET(req: NextRequest) {
  try {
    console.log("get all question reply");

    const session = await hasSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const params = req.nextUrl.searchParams;
    const question_id = params.get('question_id');

    if (!question_id) {
      return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
    }

    const question = await retrieveQuestionById(question_id);
    let replies = await retrieveRepliesByQuestionId(question_id);

    replies = [
      {
        question_reply_id: 'main',
        question_id: question.question_id,
        user_id: question.user_id,
        content: question.content,
        is_active: true,
        is_replier: false,
        updated_date: new Date(question.updated_date).toLocaleString(),
        created_date: new Date(question.created_date).toLocaleString(),
        user_name: question.user_name
      } as ReplyType
      , ...replies
    ];

    return NextResponse.json(replies, { status: 200 });
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  console.log("insert or update question reply");

  const session = await hasSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  let reply = body as ReplyType;

  if (!reply.question_id || !reply.user_id || !reply.content || !reply.is_replier) {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
  }

  const conn = await promisePool.getConnection();

  try {
    await conn.beginTransaction();
    const reply_id = createUniqId();
    reply.question_reply_id = reply_id;

    reply.content = XSSFilter(reply.content);

    const insertReplyRows = await insertOrUpdateReplyFromConn(conn, reply);

    if (insertReplyRows.affectedRows === 0) {
      return NextResponse.json({ error: 'Failed to save reply' }, { status: 500 });
    }

    // mark question as answered
    const markQuestionRows = await markQuestionAsAnsweredFromConn(conn, reply.question_id);

    if (markQuestionRows.affectedRows === 0) {
      return NextResponse.json({ error: 'Failed to mark question as answered' }, { status: 500 });
    }

    // retrieve user expo token
    const expoPushToken = await retrieveUserExpoTokenByQuestionIdFromConn(conn, reply.question_id);

    // send notification to user
    await pushNotification({
      pushTokens: [expoPushToken],
      body: '상담 내역에서 답변을 확인해보세요!',
      title: '답변이 도착했어요!',
      subtitle: '',
      data: {},
      sound: 'default',
      badge: 0,
    })

    await conn.commit();

    return NextResponse.json({ reply }, { status: 200 });
  } catch (e) {
    console.error(e)
    await conn.rollback();
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    conn.release();
  }
}

export async function PATCH(req: NextRequest) {
  try {
    console.log("update question reply");

    const session = await hasSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    let reply = body as ReplyType;

    if (!reply.question_reply_id || !reply.content) {
      return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
    }

    reply.content = XSSFilter(reply.content);
    reply.is_active = true;
    reply.is_replier = true;
    reply.user_id = 'admin';

    const rows = await insertOrUpdateReply(reply);

    if (rows.affectedRows === 0) {
      return NextResponse.json({ error: 'Failed to update reply' }, { status: 500 });
    }

    return NextResponse.json({ reply }, { status: 200 });
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    console.log("delete question reply");

    const session = await hasSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { question_reply_id } = await req.json();

    if (!question_reply_id) {
      return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
    }

    const rows = await deleteReply(question_reply_id);

    if (rows.affectedRows === 0) {
      return NextResponse.json({ error: 'Failed to delete reply' }, { status: 500 });
    }

    return NextResponse.json({ question_reply_id }, { status: 200 });
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}