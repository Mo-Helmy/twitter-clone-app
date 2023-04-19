import { getS3SignedUrl, uploadImageToS3 } from '@/libs/aws';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { key, body } = req.body;
    const result = await getS3SignedUrl(key, body);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
