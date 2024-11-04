import { AlarmType } from "@/lib/db/type";
import { deleteAlarm, getAllAlarms, insertOrUpdateAlarm } from "@/lib/serverActions/alarm";
import { hasSession } from "@/lib/serverActions/auth";
import { createUniqId, XSSFilter } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(req: NextRequest) {
  try {
    console.log("create alarm");

    const session = await hasSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, message, next_notification_date } = await req.json() as AlarmType;

    if (!title || !message) {
      return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
    }

    const alarm_id = createUniqId();

    const alarm = {
      alarm_id,
      title,
      message: XSSFilter(message),
      last_notification_date: null,
      next_notification_date
    } as AlarmType;

    const rows = await insertOrUpdateAlarm(alarm);

    if (rows.affectedRows === 0) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    return NextResponse.json({ alarm }, { status: 200 });
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    console.log("update alarm");

    const session = await hasSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { alarm_id, title, message, last_notification_date, next_notification_date } = await req.json() as AlarmType;

    if (!alarm_id || !title || !message) {
      return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
    }

    const alarm = {
      alarm_id,
      title,
      message: XSSFilter(message),
      last_notification_date: last_notification_date || null,
      next_notification_date: next_notification_date || null
    } as AlarmType;

    const rows = await insertOrUpdateAlarm(alarm);

    if (rows.affectedRows === 0) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    return NextResponse.json({ alarm }, { status: 200 });
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    console.log("delete alarm");

    const session = await hasSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { alarm_id } = await req.json() as { alarm_id: string };

    if (!alarm_id) {
      return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
    }

    const rows = await deleteAlarm(alarm_id);

    if (rows.affectedRows === 0) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    return NextResponse.json({ alarm_id }, { status: 200 });
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}