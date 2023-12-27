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
          'documents.education.institutionType': data.institutionType,
          'documents.education.institutionName': data.institutionName,
          'documents.education.degree': data.degree,
          'documents.education.graduationDate': data.graduationDate,
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
