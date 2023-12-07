import client from '@/dbConnections/mongoDB';

export const PUT = async (req) => {
  const receivedData = await req.json();

  client.connect();
  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');
  const employersCollection = db.collection('employers');

  receivedData.userRole === 'seaman'
    ? await seamenCollection.updateOne(
        { id: receivedData.userId },
        {
          $set: {
            hiddenTill: receivedData.hiddenTill,
          },
        }
      )
    : await employersCollection.updateOne(
        { id: receivedData.userId },
        {
          $set: {
            hiddenTill: receivedData.hiddenTill,
          },
        }
      );

  const existingUser =
    receivedData.userRole === 'seaman'
      ? await seamenCollection.findOne({ id: receivedData.userId })
      : await employersCollection.findOne({ id: receivedData.userId });

  if (existingUser) {
    return Response.json({
      message: 'Status updated',
      hiddenTill: existingUser.hiddenTill,
    });
  } else {
    return Response.json({ message: 'User not found' });
  }
};
