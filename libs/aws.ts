import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
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

  console.log('=========test===========');

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
    ContentType: 'image/png',
  });

  const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
  console.log('🚀 ~ file: aws.ts:57 ~ signedUrl:', signedUrl);

  return signedUrl;
};

// export const deleteObjectFromS3 = async (key: string) => {
//   const command = new DeleteObjectCommand({
//     Bucket: config.aws_media_bucket,
//     Key: key,
//   });

//   const result = await client.send(command);
//   console.log('🚀 ~ file: aws.ts:57 ~ deleteObjectFromS3 ~ result:', result);
//   console.log(
//     'Successfully Deleted ' +
//       key +
//       ' and deleted from ' +
//       config.aws_media_bucket +
//       '/' +
//       key
//   );

//   return result;
// };

// export const deleteManyObjectFromS3 = async (key: string) => {
//   const listCommand = new ListObjectsCommand({
//     Bucket: config.aws_media_bucket,
//     Prefix: key,
//   });

//   const allObjects = await client.send(listCommand);

//   const transformedAllObjects = allObjects.Contents?.map((object) => ({
//     Key: object.Key,
//   }));
//   console.log(
//     '🚀 ~ file: aws.ts:84 ~ deleteManyObjectFromS3 ~ transformedAllObjects:',
//     transformedAllObjects
//   );

//   if (!transformedAllObjects) return;

//   const deleteCommand = new DeleteObjectsCommand({
//     Bucket: config.aws_media_bucket,
//     Delete: { Objects: transformedAllObjects },
//   });

//   const result = await client.send(deleteCommand);
//   console.log(
//     '🚀 ~ file: aws.ts:97 ~ deleteManyObjectFromS3 ~ result:',
//     result
//   );
//   return result;
// };
