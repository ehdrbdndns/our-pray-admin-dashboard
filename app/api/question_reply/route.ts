import { ReplyType } from "@/lib/db/type";
import { hasSession } from "@/lib/serverActions/auth";
import { retrieveQuestionById } from "@/lib/serverActions/question";
import { insertOrUpdateReply, retrieveRepliesByQuestionId } from "@/lib/serverActions/question-reply";
import { createUniqId, XSSFilter } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

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
  try {
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

    const reply_id = createUniqId();
    reply.question_reply_id = reply_id;

    reply.content = XSSFilter(reply.content);

    const rows = await insertOrUpdateReply(reply);

    if (rows.affectedRows === 0) {
      return NextResponse.json({ error: 'Failed to save reply' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}