import { getSession } from "@/lib/serverActions/auth";
import { insertOrUpdateUserState } from "@/lib/serverActions/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { user_id, role, status } = await req.json();

    await insertOrUpdateUserState(user_id, role, status);

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}