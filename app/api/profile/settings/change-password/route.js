import client from '@/dbConnections/mongoDB';
import bcrypt from 'bcrypt';

export const PUT = async (req) => {
  const receivedData = await req.json();
  console.log(receivedData);

  client.connect();
  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');
  const employersCollection = db.collection('employers');
  const hashedPassword = await bcrypt.hash(receivedData.password, 10);

  const existingUser =
    receivedData.userRole === 'seaman'
      ? await seamenCollection.findOneAndUpdate(
          { id: receivedData.userId },
          { $set: { password: hashedPassword } }
        )
      : await employersCollection.findOneAndUpdate(
          { id: receivedData.userId },
          { $set: { password: hashedPassword } }
        );

  if (existingUser) {
    return Response.json({ message: 'Password updated' });
  } else {
    return Response.json({ message: 'User not found' });
  }
};
