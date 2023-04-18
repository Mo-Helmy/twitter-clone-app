import { uploadImageToS3 } from '@/libs/aws';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  uploadImageToS3(req.body.key, req.body.body);
}
