import client from '@/dbConnections/mongoDB';
import { ObjectId } from 'mongodb';

export const PUT = async (req) => {
  const receivedData = await req.json();
  const userId = receivedData.userId;

  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');
  try {
    seamenCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          'documents.education.institutionType': null,
          'documents.education.institutionName': null,
          'documents.education.degree': null,
          'documents.education.graduationDate': null,
          'documents.updated': new Date(),
        },
      }
    );
    return Response.json({ message: 'Education updated' });
  } catch (error) {
    console.log(error.message);
    return Response.json({ message: error.message });
  }
};
