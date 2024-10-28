import { getSession } from "@/lib/serverActions/auth";
import { insertOrUpdateUserState } from "@/lib/serverActions/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { user_id, role, status } = await req.json();

    if (!user_id || !role || !status) {
      return NextResponse.json({ error: 'Invalid Request' }, { status: 400 });
    }

    await insertOrUpdateUserState(user_id, role, status);

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}