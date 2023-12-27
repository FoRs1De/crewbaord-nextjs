import client from '@/dbConnections/mongoDB';
import { ObjectId } from 'mongodb';

export const PUT = async (req) => {
  const receivedData = await req.json();
  console.log(receivedData);
  const { userId, ...data } = receivedData;
  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');
  try {
    seamenCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          'documents.yellowFever.place': data.place,
          'documents.yellowFever.issueDate': data.issueDate,
          'documents.updated': new Date(),
        },
      }
    );
    return Response.json({ message: 'Yellow fever updated' });
  } catch (error) {
    console.log(error.message);
    return Response.json({ message: error.message });
  }
};
