import { S3Client } from '@aws-sdk/client-s3';

export const Bucket = process.env.AWS_BUCKET_NAME;
export const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export const uploadFileToS3 = async (path: string, file: File): Promise<string> => {
  const signRes = await fetch('/api/s3/sign', {
    method: 'POST',
    body: JSON.stringify({
      path,
      contentType: file.type,
    }),
  })

  if (!signRes.ok) {
    throw new Error('failed to get signed url');
  }

  const { url, fields } = await signRes.json();

  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value as string);
  });
  formData.append('file', file);

  const uploadRes = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!uploadRes.ok) {
    throw new Error('failed to upload file');
  }

  return url;
}