import client from '@/dbConnections/mongoDB';
import { ObjectId } from 'mongodb';

export const PUT = async (req) => {
  const receivedData = await req.json();
  const { userId, ...data } = receivedData;
  const certificateId = receivedData.certificateId;
  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');

  await seamenCollection.updateOne(
    { _id: new ObjectId(userId), 'certificates.certificateId': certificateId },
    {
      $set: {
        'certificates.$': data,
        certificatesUpdated: new Date().toISOString(),
      },
    }
  );

  return Response.json({ message: 'Certificate updated' });
};
