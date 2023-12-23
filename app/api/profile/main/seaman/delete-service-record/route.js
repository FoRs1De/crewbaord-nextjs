import client from '@/dbConnections/mongoDB';
import { ObjectId } from 'mongodb';

export const POST = async (req) => {
  const receivedData = await req.json();
  const userId = receivedData.userId;
  const serviceRecordId = receivedData.recordId;

  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');

  try {
    await seamenCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $pull: {
          seaService: {
            recordId: serviceRecordId,
          },
        },
        $set: {
          seaServiceUpdated: new Date().toISOString(),
        },
      }
    );

    return Response.json({ message: 'Service record deleted' });
  } catch (e) {
    console.log(e.message);
    return Response.json({ message: e.message });
  }
};
