import client from '@/dbConnections/mongoDB';
import { ObjectId } from 'mongodb';

export const POST = async (req) => {
  const receivedData = await req.json();
  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');
  console.log(receivedData);
  try {
    await seamenCollection.updateOne(
      { _id: new ObjectId(receivedData.userId) },
      {
        $set: {
          'desiredWage.amount': receivedData.desiredWageAmount,
        },
      }
    );

    return Response.json({ message: 'Status updated' });
  } catch (e) {
    console.log(e.message);
    return Response.json({ message: e.message });
  }
};
