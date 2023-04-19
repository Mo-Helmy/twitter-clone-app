import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const client = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export const uploadImageToS3 = async (key: any, body: any) => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    Body: body,
    ContentType: 'image/jpeg',
  });

  const results = await client.send(command);
  console.log('🚀 ~ file: aws.ts:28 ~ uploadImageToS3 ~ results', results);
  console.log(
    'Successfully created ' +
      key +
      ' and uploaded it to ' +
      process.env.AWS_BUCKET +
      '/' +
      key
  );

  return results;
};

export const getS3SignedUrl = async (key: string, body: any) => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    Body: body,
    // ContentType: 'image/png',
  });

  const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
  console.log('🚀 ~ file: aws.ts:57 ~ signedUrl:', signedUrl);

  return signedUrl;
};
