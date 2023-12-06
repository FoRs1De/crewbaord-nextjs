import client from '@/dbConnections/mongoDB';
import { cookies } from 'next/headers';

export const POST = async (req) => {
  const receivedData = await req.json();

  client.connect();
  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');
  const employersCollection = db.collection('employers');
  console.log(receivedData);

  const deletedSeaman = await seamenCollection.findOneAndDelete({
    id: receivedData.userId,
  });

  const deletedEmployer = await employersCollection.findOneAndDelete({
    id: receivedData.userId,
  });

  if (deletedSeaman || deletedEmployer) {
    cookies().set('JWT', 'remove', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: -1,
      path: '/',
    });
    return Response.json({ message: 'User deleted' });
  } else {
    return Response.json({ message: 'User not found' });
  }
};
