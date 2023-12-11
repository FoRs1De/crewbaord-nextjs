import { writeFile, unlink } from 'fs/promises';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import client from '@/dbConnections/mongoDB';
import { ObjectId } from 'mongodb';

export const POST = async (req) => {
  const data = await req.formData();
  const headers = await req.headers;
  const url = process.env.DOMAIN_URL;
  const userId = headers.get('authorization');
  const file = data.get('avatar');
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const newFileName = `${uuid()}${extname(file.name)}`;
  const path = `public/upload/avatars/${newFileName}`;
  await writeFile(path, buffer);

  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');
  const employersCollection = db.collection('employers');

  const existingSeamanAvatar = await seamenCollection.findOne({
    _id: new ObjectId(userId),
  });
  if (existingSeamanAvatar && existingSeamanAvatar.avatar.fileName) {
    try {
      await unlink(
        `public/upload/avatars/${existingSeamanAvatar.avatar.fileName}`
      );
    } catch (err) {
      console.log(err);
    }
  }

  const existingEmployerAvatar = await employersCollection.findOne({
    _id: new ObjectId(userId),
  });
  if (existingEmployerAvatar && existingEmployerAvatar.avatar.fileName) {
    try {
      await unlink(
        `public/upload/avatars/${existingEmployerAvatar.avatar.fileName}`
      );
    } catch (err) {
      console.log(err);
    }
  }
  console.log(url);
  const existingSeaman = await seamenCollection.findOneAndUpdate(
    { _id: new ObjectId(userId) },
    {
      $set: {
        'avatar.url': `${url}/upload/avatars/${newFileName}`,
        'avatar.fileName': newFileName,
      },
    }
  );
  if (!existingSeaman) {
    await employersCollection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      {
        $set: {
          'avatar.url': `${url}/upload/avatars/${newFileName}`,
          'avatar.fileName': newFileName,
        },
      }
    );
  }

  return Response.json({ message: 'Success' });
};
