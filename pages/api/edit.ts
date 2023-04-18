import { NextApiRequest, NextApiResponse } from 'next';

import serverAuth from '@/libs/serverAuth';
import prisma from '@/libs/prismadb';
import { getS3SignedUrl, uploadImageToS3 } from '@/libs/aws';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PATCH') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    const {
      name,
      username,
      bio,
      profileImage,
      coverImage,
      profileImageFile,
      coverImageFile,
    } = req.body;
    console.log('________1________');

    if (!name || !username) {
      throw new Error('Missing fields');
    }

    // const fs = require('fs');
    // const base64Image = 'data:image/png;base64,iVBORw0KG...'; // base64-encoded image
    // const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, ''); // remove image header
    // const buffer = Buffer.from(base64Data, 'base64'); // convert base64-encoded string to buffer
    // fs.writeFileSync('image.png', buffer); // write buffer to file

    // const profileImageKey = `api/users/${
    //   currentUser.id
    // }/media/profile-${new Date().getTime()}.jpg`;
    // const profileImageSignedUrl = await getS3SignedUrl(
    //   profileImageKey,
    //   profileImageFile
    // );

    // await axios.put(profileImageSignedUrl, profileImageFile, {
    //   headers: { 'Content-Type': 'image/jpeg' },
    // });

    const profileImageKey = `api/users/${
      currentUser.id
    }/media/profile-${new Date().getTime()}.jpg`;
    const coverImageKey = `api/users/${
      currentUser.id
    }/media/cover-${new Date().getTime()}.jpg`;

    await uploadImageToS3(
      profileImageKey,
      Buffer.from(
        profileImage.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
      )
    );
    await uploadImageToS3(
      coverImageKey,
      Buffer.from(coverImage.replace(/^data:image\/\w+;base64,/, ''), 'base64')
    );

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage:
          'https://project-twitter-clone-app.s3.amazonaws.com/' +
          profileImageKey,
        coverImage:
          'https://project-twitter-clone-app.s3.amazonaws.com/' + coverImageKey,
      },
    });

    return res.status(200).json(updatedUser);
    // return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error });
  }
}
