import client from '@/dbConnections/mongoDB';
import { cookies } from 'next/headers';
import { ObjectId } from 'mongodb';
import { unlink } from 'fs/promises';

export const POST = async (req) => {
  const receivedData = await req.json();

  client.connect();
  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');
  const employersCollection = db.collection('employers');

  // AVATAR DELETE-----------------------------------------------------------------------------
  const existingSeamanAvatar = await seamenCollection.findOne({
    _id: new ObjectId(receivedData.userId),
  });
  if (existingSeamanAvatar && existingSeamanAvatar.avatar.fileNameCropped) {
    try {
      await unlink(
        `public/upload/seamen-avatars/${existingSeamanAvatar.avatar.fileNameCropped}`
      );
    } catch (err) {
      console.log(err);
    }
    if (existingSeamanAvatar.avatar.fileName) {
      try {
        await unlink(
          `public/upload/seamen-avatars/${existingSeamanAvatar.avatar.fileName}`
        );
      } catch (err) {
        console.log(err);
      }
    }
  }

  const existingEmployerAvatar = await employersCollection.findOne({
    _id: new ObjectId(receivedData.userId),
  });
  if (existingEmployerAvatar && existingEmployerAvatar.avatar.fileNameCropped) {
    try {
      await unlink(
        `public/upload/seamen-avatars/${existingEmployerAvatar.avatar.fileNameCropped}`
      );
    } catch (err) {
      console.log(err);
    }
    if (existingEmployerAvatar.avatar.fileName) {
      try {
        await unlink(
          `public/upload/seamen-avatars/${existingEmployerAvatar.avatar.fileName}`
        );
      } catch (err) {
        console.log(err);
      }
    }
  }
  //------------------------------------------------------------------------------------------

  const deletedSeaman = await seamenCollection.findOneAndDelete({
    _id: new ObjectId(receivedData.userId),
  });

  const deletedEmployer = await employersCollection.findOneAndDelete({
    _id: new ObjectId(receivedData.userId),
  });

  if (deletedSeaman || deletedEmployer) {
    cookies().set('JWT', 'remove', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: -1,
      path: '/',
    });
    return Response.json({ message: 'User deleted' });
  } else {
    return Response.json({ message: 'User not found' });
  }
};
