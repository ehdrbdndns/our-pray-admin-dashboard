import { getAllAlarms } from "@/lib/serverActions/alarm";
import { hasSession } from "@/lib/serverActions/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("get all alarm");

    const session = await hasSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const alarms = await getAllAlarms();

    return NextResponse.json(alarms, { status: 200 });
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}