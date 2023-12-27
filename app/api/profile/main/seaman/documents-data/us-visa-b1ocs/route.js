import client from '@/dbConnections/mongoDB';
import { ObjectId } from 'mongodb';

export const PUT = async (req) => {
  const receivedData = await req.json();
  const { userId, ...data } = receivedData;
  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');
  try {
    seamenCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          'documents.b1ocs.number': data.number,
          'documents.b1ocs.expiryDate': data.expiryDate,
          'documents.updated': new Date(),
        },
      }
    );
    return Response.json({ message: 'Visa updated' });
  } catch (error) {
    console.log(error.message);
    return Response.json({ message: error.message });
  }
};
