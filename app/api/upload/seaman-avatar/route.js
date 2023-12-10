import { writeFile, unlink } from 'fs/promises';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import client from '@/dbConnections/mongoDB';
import { ObjectId } from 'mongodb';

export const POST = async (req) => {
  const data = await req.formData();
  const headers = await req.headers;
  const url = headers.get('origin');
  const userId = headers.get('authorization');
  const file = data.get('avatar');
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const newFileName = `${uuid()}${extname(file.name)}`;
  const path = `public/upload/seamen-avatars/${newFileName}`;
  await writeFile(path, buffer);

  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');
  const employersCollection = db.collection('employers');

  const existingSeamanAvatar = await seamenCollection.findOne({
    _id: new ObjectId(userId),
  });
  if (existingSeamanAvatar && existingSeamanAvatar.avatar.fileName) {
    await unlink(
      `public/upload/seamen-avatars/${existingSeamanAvatar.avatar.fileName}`
    );
  }

  const existingEmployerAvatar = await employersCollection.findOne({
    _id: new ObjectId(userId),
  });
  if (existingEmployerAvatar && existingEmployerAvatar.avatar.fileName) {
    await unlink(
      `public/upload/seamen-avatars/${existingEmployerAvatar.avatar.fileName}`
    );
  }
  console.log(url);
  const existingSeaman = await seamenCollection.findOneAndUpdate(
    { _id: new ObjectId(userId) },
    {
      $set: {
        'avatar.url': `${url}/upload/seamen-avatars/${newFileName}`,
        'avatar.fileName': newFileName,
      },
    }
  );
  if (!existingSeaman) {
    await employersCollection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      {
        $set: {
          $set: {
            'avatar.url': `${url}/upload/seamen-avatars/${newFileName}`,
            'avatar.fileName': newFileName,
          },
        },
      }
    );
  }

  return Response.json({ message: 'Success' });
};
