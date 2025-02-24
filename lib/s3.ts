import { S3Client } from '@aws-sdk/client-s3';

export const Bucket = process.env.AWS_BUCKET_NAME;
export const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

const getFileExtensionFromMimeType = (mimeType: string) => {
  let extension = '';

  switch (mimeType) {
    case 'audio/mpeg':
      extension = 'mp3';
      break;
    case 'audio/mp4':
    case 'audio/x-m4a':
      extension = 'm4a';
      break;
    case 'audio/x-wav':
      extension = 'wav';
      break;
    case 'image/png':
      extension = 'png';
      break;
    case 'image/jpeg':
      extension = 'jpeg';
      break;
    // 필요한 경우 다른 MIME 타입을 추가
    default:
      throw new Error('Unsupported MIME type: ' + mimeType);
  }

  return extension;
};

export const uploadFileToS3 = async (path: string, file: File): Promise<{
  url: string,
  extension: string
}> => {
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

  return {
    url: url + fields.key,
    extension: getFileExtensionFromMimeType(file.type),
  };
}