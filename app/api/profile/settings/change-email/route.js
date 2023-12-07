import client from '@/dbConnections/mongoDB';

export const PUT = async (req) => {
  const receivedData = await req.json();

  client.connect();
  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');
  const employersCollection = db.collection('employers');

  const existingUser =
    receivedData.userRole === 'seaman'
      ? await seamenCollection.findOneAndUpdate(
          { id: receivedData.userId },
          { $set: { email: receivedData.email } }
        )
      : await employersCollection.findOneAndUpdate(
          { id: receivedData.userId },
          { $set: { email: receivedData.email } }
        );

  if (existingUser) {
    return Response.json({ message: 'Email updated' });
  } else {
    return Response.json({ message: 'User not found' });
  }
};
