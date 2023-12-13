import { unlink } from 'fs/promises';
import client from '@/dbConnections/mongoDB';
import { ObjectId } from 'mongodb';
const db = client.db('admin');
const seamenCollection = db.collection('seamen');
const employersCollection = db.collection('employers');

export const POST = async (req) => {
  const receivedData = await req.json();
  const userId = receivedData.userId;

  const existingSeamanAvatar = await seamenCollection.findOne({
    _id: new ObjectId(userId),
  });
  if (existingSeamanAvatar && existingSeamanAvatar.avatar.fileNamePreload) {
    try {
      await unlink(
        `public/upload/avatars/${existingSeamanAvatar.avatar.fileNamePreload}`
      );
    } catch (err) {
      console.log(err);
    }
  }

  const existingEmployerAvatar = await employersCollection.findOne({
    _id: new ObjectId(userId),
  });
  if (existingEmployerAvatar && existingEmployerAvatar.avatar.fileNamePreload) {
    try {
      await unlink(
        `public/upload/avatars/${existingEmployerAvatar.avatar.fileNamePreload}`
      );
    } catch (err) {
      console.log(err);
    }
  }

  const existingSeaman = await seamenCollection.findOneAndUpdate(
    { _id: new ObjectId(userId) },
    {
      $set: {
        'avatar.urlPreload': null,
        'avatar.fileNamePreload': null,
      },
    }
  );
  if (!existingSeaman) {
    await employersCollection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      {
        $set: {
          'avatar.urlPreload': null,
          'avatar.fileNamePreload': null,
        },
      }
    );
  }

  return Response.json({ message: 'Avatar upload canceled' });
};
