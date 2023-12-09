import client from '@/dbConnections/mongoDB';
import { cookies } from 'next/headers';
import { ObjectId } from 'mongodb';

export const POST = async (req) => {
  const receivedData = await req.json();

  client.connect();
  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');
  const employersCollection = db.collection('employers');

  const deletedSeaman = await seamenCollection.findOneAndDelete({
    _id: new ObjectId(receivedData.userId),
  });

  const deletedEmployer = await employersCollection.findOneAndDelete({
    _id: new ObjectId(receivedData.userId),
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
