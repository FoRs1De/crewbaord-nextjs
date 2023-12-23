import client from '@/dbConnections/mongoDB';
import { ObjectId } from 'mongodb';

export const PUT = async (req) => {
  const receivedData = await req.json();
  const { userId, ...data } = receivedData;
  const recordId = receivedData.recordId;
  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');

  await seamenCollection.updateOne(
    { _id: new ObjectId(userId), 'seaService.recordId': recordId },
    {
      $set: {
        'seaService.$': data,
        seaServiceUpdated: new Date().toISOString(),
      },
    }
  );

  return Response.json({ message: 'Service record updated' });
};
