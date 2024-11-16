import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { hasSession } from "@/lib/serverActions/auth";
import { NextRequest, NextResponse } from "next/server";
import { s3Client } from '@/lib/s3';
import { createUniqId } from '@/lib/utils';

export async function POST(request: NextRequest) {
  console.log("get signed url for s3")

  try {
    const session = await hasSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { path, contentType } = await request.json();

    if (!contentType || !path) {
      return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }

    let maxContentLength = 0;

    if (contentType.startsWith('image/')) {
      maxContentLength = 10 * 1024 * 1024; // 10MB
    } else if (contentType.startsWith('audio/')) {
      maxContentLength = 100 * 1024 * 1024; // 100MB
    } else {
      return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }

    const data = await createPresignedPost(s3Client, {
      Bucket: process.env.AWS_BUCKET_NAME || '',
      Key: path + '/' + createUniqId(),
      Conditions: [
        ['content-length-range', 0, maxContentLength],
        ['starts-with', '$Content-Type', contentType]
      ],
      Fields: {
        acl: 'public-read',
        'Content-Type': contentType,
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}