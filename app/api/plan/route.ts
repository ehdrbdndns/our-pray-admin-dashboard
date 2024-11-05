import { hasSession } from "@/lib/serverActions/auth";
import { getAllPlans } from "@/lib/serverActions/plan";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("get all plans");

    const session = await hasSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const plans = await getAllPlans();

    return NextResponse.json(plans, { status: 200 });
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}