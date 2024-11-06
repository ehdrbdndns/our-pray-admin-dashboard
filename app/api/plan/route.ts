import { PlanType } from "@/lib/db/type";
import { hasSession } from "@/lib/serverActions/auth";
import { getAllPlans, insertOrUpdatePlan } from "@/lib/serverActions/plan";
import { createUniqId } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
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
  console.log("Hello");
  console.log("post plan");
  try {
    const session = await hasSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    // const safeData = createPlanFormSchema.safeParse(formData);

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

    // Todo update thumbnail to AWS S3
    const thumbnailPath = "";

    // Todo update s_thumbnail to AWS S3
    const s_thumbnailPath = "";

    // Todo update author_profile to AWS S3
    const author_profilePath = "";

    const plan_id = createUniqId();

    const newPlan = {
      ...plan,
      plan_id,
      thumbnail: thumbnailPath,
      s_thumbnail: s_thumbnailPath,
      author_profile: author_profilePath,
      updated_date: "",
      created_date: "",
    } as PlanType;

    const { affectedRows } = await insertOrUpdatePlan(newPlan) as { affectedRows: number };

    if (affectedRows === 0) {
      return NextResponse.json({ error: "Failed to insert" }, { status: 500 });
    }

    return NextResponse.json({ plan_id }, { status: 200 });
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}