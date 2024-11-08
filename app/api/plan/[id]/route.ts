import { hasSession } from "@/lib/serverActions/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  console.log("retrieve plan by id");
  const id = params.id;
  console.log(id);

  try {
    const session = await hasSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log(req);

    // const plan = await retrievePlanById(plan_id);

    // return NextResponse.json(plan, { status: 200 });
    return NextResponse.json({ error: 'Not Implemented' }, { status: 501 });
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}