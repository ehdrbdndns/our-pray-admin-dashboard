import { hasSession } from "@/lib/serverActions/auth";
import { retrievePlanById } from "@/lib/serverActions/plan";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  console.log("retrieve plan by id");

  const id = params.id;

  try {
    const session = await hasSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }

    const plan = await retrievePlanById(id);

    return NextResponse.json(plan, { status: 200 });
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}