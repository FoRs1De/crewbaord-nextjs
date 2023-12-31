import client from '@/dbConnections/mongoDB';
import { ObjectId } from 'mongodb';

export const POST = async (req) => {
  const receivedData = await req.json();
  const { userId, ...data } = receivedData;

  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');
  try {
    await seamenCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          aboutMe: data.aboutMe,
          aboutMeUpdated: new Date().toISOString(),
        },
      }
    );

    return Response.json({ message: 'About me updated' });
  } catch (e) {
    console.log(e.message);
    return Response.json({ message: e.message });
  }
};
