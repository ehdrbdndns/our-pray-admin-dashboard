import promisePool from "@/lib/db/db";
import { AlarmType } from "@/lib/db/type";
import { pushNotification } from "@/lib/notification";
import { hasSession } from "@/lib/serverActions/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  const conn = await promisePool.getConnection();

  try {
    await conn.beginTransaction();

    const session = await hasSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { alarm_id } = await req.json() as { alarm_id: string };

    if (!alarm_id) {
      return NextResponse.json({ error: 'Bad Request' }, { status: 400 });
    }

    // retrieve expo push token of user that has alarm permission
    const [users] = await conn.query(`
    SELECT expo_push_token
    FROM user_state
    WHERE alarm = 1
      AND status = 'active'
    `, []) as [{ expo_push_token: string }[], unknown];

    if (users.length === 0) {
      return NextResponse.json({ message: 'No user has alarm permission' }, { status: 200 });
    }

    // retrieve alarm information
    const [alarm] = await conn.query(`
    SELECT *
    FROM alarm
    WHERE alarm_id = ?
    LIMIT 1
    `, [alarm_id]) as [AlarmType[], unknown];

    if (alarm.length === 0) {
      return NextResponse.json({ message: `can't find alarm` }, { status: 400 });
    }

    const { title, message } = alarm[0];

    // send alarm
    await pushNotification({
      pushTokens: users.map((user: { expo_push_token: string }) => user.expo_push_token),
      body: message,
      title,
      subtitle: '',
      data: {},
      sound: 'default',
      badge: 0,
    })

    // update alarm last_notification_date
    const [updatedAlarmRows] = await conn.query(`
    UPDATE alarm
    SET last_notification_date = NOW()
    WHERE alarm_id = ?
    `, [alarm_id]) as [{ affectedRows: number }, unknown];

    console.log(updatedAlarmRows);

    if (updatedAlarmRows.affectedRows !== 1) {
      return NextResponse.json({ message: 'Failed to update alarm last_notification_date' }, { status: 500 });
    }

    await conn.commit();

    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch (e) {
    console.error(e)
    await conn.rollback();
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    conn.release();
  }
}