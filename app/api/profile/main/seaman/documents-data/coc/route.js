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
          'documents.coc.qualification': data.qualification,
          'documents.coc.country': data.country,
          'documents.coc.issueDateCoC': data.issueDateCoC,
          'documents.coc.expiryDateCoC': data.expiryDateCoC,
          'documents.coc.issueDateCoE': data.issueDateCoE,
          'documents.coc.expiryDateCoE': data.expiryDateCoE,
          'documents.coc.number': data.number,
          'documents.updated': new Date(),
        },
      }
    );
    return Response.json({ message: 'TravelPassport updated' });
  } catch (error) {
    console.log(error.message);
    return Response.json({ message: error.message });
  }
};
