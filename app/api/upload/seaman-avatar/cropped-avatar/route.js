import { writeFile, unlink } from 'fs/promises';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import client from '@/dbConnections/mongoDB';
import { ObjectId } from 'mongodb';

export const POST = async (req) => {
  const data = await req.formData();
  console.log(data);
  const headers = await req.headers;
  const url = headers.get('origin');
  const userId = data.get('userId');
  const file = data.get('croppedImage');
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const newFileName = `ava-${uuid()}${extname(file.name)}`;
  const path = `public/upload/seamen-avatars/${newFileName}`;
  await writeFile(path, buffer);

  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');
  const employersCollection = db.collection('employers');

  const existingSeamanAvatar = await seamenCollection.findOne({
    _id: new ObjectId(userId),
  });
  if (existingSeamanAvatar && existingSeamanAvatar.avatar.fileNameCropped) {
    await unlink(
      `public/upload/seamen-avatars/${existingSeamanAvatar.avatar.fileNameCropped}`
    );
  }

  const existingEmployerAvatar = await employersCollection.findOne({
    _id: new ObjectId(userId),
  });
  if (existingEmployerAvatar && existingEmployerAvatar.avatar.fileNameCropped) {
    await unlink(
      `public/upload/seamen-avatars/${existingEmployerAvatar.avatar.fileNameCropped}`
    );
  }

  const existingSeaman = await seamenCollection.findOneAndUpdate(
    { _id: new ObjectId(userId) },
    {
      $set: {
        'avatar.urlCropped': `${url}/upload/seamen-avatars/${newFileName}`,
        'avatar.fileNameCropped': newFileName,
      },
    }
  );
  if (!existingSeaman) {
    await employersCollection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      {
        $set: {
          'avatar.urlCropped': `${url}/upload/seamen-avatars/${newFileName}`,
          'avatar.fileNameCropped': newFileName,
        },
      }
    );
  }

  return Response.json({ message: 'Success' });
};
