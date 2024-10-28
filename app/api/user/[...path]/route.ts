import { getSession } from "@/lib/serverActions/auth";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse<any>) {
  console.log(req);
  try {
    const session = await getSession();
    console.log(
      session
    )
  } catch (e) {
    console.error(e)

  }
}