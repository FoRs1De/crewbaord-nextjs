import client from '@/dbConnections/mongoDB';
import { ObjectId } from 'mongodb';
import { unlink } from 'fs/promises';

export const POST = async (req) => {
  const receivedData = await req.json();
  const userId = receivedData.userId;
  const url = process.env.DOMAIN_URL;
  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');
  const employersCollection = db.collection('employers');

  const existingSeamanAvatar = await seamenCollection.findOne({
    _id: new ObjectId(userId),
  });
  if (existingSeamanAvatar && existingSeamanAvatar.avatar.fileNameCropped) {
    try {
      await unlink(
        `public/upload/avatars/${existingSeamanAvatar.avatar.fileNameCropped}`
      );
    } catch (err) {
      console.log(err);
    }
    if (existingSeamanAvatar.avatar.fileName) {
      try {
        await unlink(
          `public/upload/avatars/${existingSeamanAvatar.avatar.fileName}`
        );
      } catch (err) {
        console.log(err);
      }
    }
  }

  const existingEmployerAvatar = await employersCollection.findOne({
    _id: new ObjectId(userId),
  });
  if (existingEmployerAvatar && existingEmployerAvatar.avatar.fileNameCropped) {
    try {
      await unlink(
        `public/upload/avatars/${existingEmployerAvatar.avatar.fileNameCropped}`
      );
    } catch (err) {
      console.log(err);
    }
    if (existingEmployerAvatar.avatar.fileName) {
      try {
        await unlink(
          `public/upload/avatars/${existingEmployer.avatar.fileName}`
        );
      } catch (err) {
        console.log(err);
      }
    }
  }

  const existingSeaman = await seamenCollection.findOneAndUpdate(
    { _id: new ObjectId(userId) },
    {
      $set: {
        'avatar.url': `${url}/images/seaman-placeholder.jpeg`,
        'avatar.fileName': null,
        'avatar.urlCropped': `${url}/images/seaman-placeholder.jpeg`,
        'avatar.fileNameCropped': null,
      },
    }
  );
  if (!existingSeaman) {
    await employersCollection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      {
        $set: {
          'avatar.url': `${url}/images/employer-placeholder.jpeg`,
          'avatar.fileName': null,
          'avatar.urlCropped': `${url}/images/employer-placeholder.jpeg`,
          'avatar.fileNameCropped': null,
        },
      }
    );
  }
  return Response.json({ message: 'Avatar deleted' });
};
