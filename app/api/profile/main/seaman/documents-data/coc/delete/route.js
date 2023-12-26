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
          'documents.coc.qualification': null,
          'documents.coc.country': null,
          'documents.coc.issueDateCoC': null,
          'documents.coc.expiryDateCoC': null,
          'documents.coc.issueDateCoE': null,
          'documents.coc.expiryDateCoE': null,
          'documents.coc.number': null,
          'documents.updated': new Date(),
        },
      }
    );
    return Response.json({ message: 'SeamansBook updated' });
  } catch (error) {
    console.log(error.message);
    return Response.json({ message: error.message });
  }
};
