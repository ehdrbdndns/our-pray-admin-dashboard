import { hasSession } from "@/lib/serverActions/auth";
import { getAllUsers } from "@/lib/serverActions/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await hasSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const users = await getAllUsers();

    return NextResponse.json(users, { status: 200 });
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}