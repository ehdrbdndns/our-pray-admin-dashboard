import { hasSession } from "@/lib/serverActions/auth";
import { deleteBible, getAllBibles, insertOrUpdateBible } from "@/lib/serverActions/bible";
import { getUniqId } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("get all bibile");

    const session = await hasSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const bibles = await getAllBibles();

    return NextResponse.json(bibles, { status: 200 });
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    console.log("insert bible");

    const session = await hasSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
    }

    const bible_quote_id = getUniqId();

    await insertOrUpdateBible(bible_quote_id, title, content);

    return NextResponse.json({ bible_quote_id }, { status: 200 });
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    console.log("update bible");

    const session = await hasSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { bible_quote_id, title, content } = await req.json();

    if (!bible_quote_id || !title || !content) {
      return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
    }

    await insertOrUpdateBible(bible_quote_id, title, content);

    return NextResponse.json({ bible_quote_id }, { status: 200 });
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    console.log("delete bible");

    const session = await hasSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { bible_quote_id } = await req.json();

    if (!bible_quote_id) {
      return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
    }

    await deleteBible(bible_quote_id);

    return NextResponse.json({ bible_quote_id }, { status: 200 });
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}