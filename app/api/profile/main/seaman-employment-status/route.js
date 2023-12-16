import client from '@/dbConnections/mongoDB';
import { ObjectId } from 'mongodb';

export const POST = async (req) => {
  const receivedData = await req.json();
  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');

  try {
    if (
      receivedData.employmentStatus === 'On board' ||
      receivedData.employmentStatus === 'On vacation'
    ) {
      await seamenCollection.updateOne(
        { _id: new ObjectId(receivedData.userId) },
        {
          $set: {
            employmentStatus: receivedData.employmentStatus,
          },
        }
      );
    } else {
      await seamenCollection.updateOne(
        { _id: new ObjectId(receivedData.userId) },
        {
          $set: {
            employmentStatus: receivedData.employmentStatus,
            employmentStatusUntil: null,
          },
        }
      );
    }
    return Response.json({ message: 'Status updated' });
  } catch (e) {
    console.log(e.message);
    return Response.json({ message: e.message });
  }
};
