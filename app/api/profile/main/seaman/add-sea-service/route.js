import client from '@/dbConnections/mongoDB';
import { ObjectId } from 'mongodb';

export const POST = async (req) => {
  const receivedData = await req.json();
  const { userId, ...data } = receivedData;

  console.log(userId, data);

  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');
  try {
    await seamenCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $push: {
          seaService: data,
        },
        $set: {
          seaServiceUpdated: new Date().toISOString(),
        },
      }
    );

    return Response.json({ message: 'Sea record added' });
  } catch (e) {
    console.log(e.message);
    return Response.json({ message: e.message });
  }
};
