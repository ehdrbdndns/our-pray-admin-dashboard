import promisePool from "@/lib/db/db";
import { PlanType } from "@/lib/db/type";
import { insertOrUpdateAuditByConn } from "@/lib/serverActions/audit";
import { hasSession } from "@/lib/serverActions/auth";
import { getAllPlans, insertOrUpdatePlan, insertOrUpdatePlanByConn } from "@/lib/serverActions/plan";
import { createUniqId } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("get all plans");

  try {
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

export async function POST(req: NextRequest) {
  console.log("post plan detail");

  const conn = await promisePool.getConnection();

  try {
    const session = await hasSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();

    const plan = {
      title: formData.get('title'),
      description: formData.get('description'),
      author_description: formData.get('author_description'),
      author_name: formData.get('author_name'),
      author_profile: formData.get('author_profile'),
      thumbnail: formData.get('thumbnail'),
      s_thumbnail: formData.get('s_thumbnail'),
      is_active: false,
      updated_date: '',
      created_date: ''
    } as PlanType;

    if (
      !plan.title || !plan.description || !plan.author_description || !plan.author_name
      || !plan.author_profile || !plan.thumbnail || !plan.s_thumbnail
    ) {
      return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }

    // start transaction
    await conn.beginTransaction();

    const plan_id = createUniqId();
    const newPlan = { ...plan, plan_id };

    const { affectedRows: affectedPlanRows } = await insertOrUpdatePlanByConn(conn, newPlan) as { affectedRows: number };

    if (affectedPlanRows === 0) {
      return NextResponse.json({ error: "Failed to insert plan" }, { status: 500 });
    }

    const plan_lecture_audit_id = createUniqId();

    const { affectedRows: affectedAuditRows } = await insertOrUpdateAuditByConn({
      conn, plan_lecture_audit_id, plan_id
    }) as { affectedRows: number };

    if (affectedAuditRows === 0) {
      return NextResponse.json({ error: "Failed to insert audit" }, { status: 500 });
    }

    await conn.commit();

    return NextResponse.json({ plan_id }, { status: 200 });
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    conn.release();
  }
}

export async function PUT(req: NextRequest) {
  console.log("put plan detail");

  const conn = await promisePool.getConnection();
  try {
    const session = await hasSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();

    const plan = {
      plan_id: formData.get('plan_id'),
      title: formData.get('title'),
      description: formData.get('description'),
      author_description: formData.get('author_description'),
      author_name: formData.get('author_name'),
      author_profile: formData.get('author_profile'),
      thumbnail: formData.get('thumbnail'),
      s_thumbnail: formData.get('s_thumbnail'),
      is_active: formData.get('is_active') === 'true',
      updated_date: new Date().toISOString(),
      created_date: ''
    } as PlanType;

    if (
      !plan.plan_id || !plan.title || !plan.description || !plan.author_description || !plan.author_name
      || !plan.author_profile || !plan.thumbnail || !plan.s_thumbnail
    ) {
      return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }

    await conn.beginTransaction();

    const { affectedRows } = await insertOrUpdatePlanByConn(conn, plan) as { affectedRows: number };

    if (affectedRows === 0) {
      return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }

    const { affectedRows: affectedAuditRows } = await insertOrUpdateAuditByConn({
      conn, plan_id: plan.plan_id
    }) as { affectedRows: number };

    if (affectedAuditRows === 0) {
      return NextResponse.json({ error: "Failed to insert audit" }, { status: 500 });
    }

    await conn.commit();

    return NextResponse.json({ plan_id: plan.plan_id }, { status: 200 });
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    conn.release();
  }
}