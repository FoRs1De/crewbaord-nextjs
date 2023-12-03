import jwt from 'jsonwebtoken';
import client from '@/dbConnections/mongoDB';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';

const maxAgeRemember = 30 * 24 * 60 * 60;
const secret = process.env.JWT_SECRET;

export const POST = async (req, res) => {
  const receivedData = await req.json();
  const token = receivedData.token;
  const decodedJwt = jwt.decode(token);
  const email = decodedJwt.email;

  await client.connect();
  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');
  const employersCollection = db.collection('employers');

  try {
    const existingSeaman = await seamenCollection.findOneAndUpdate(
      { email },
      { $set: { verified: true } }
    );

    const existingEmployer = await employersCollection.findOneAndUpdate(
      { email },
      { $set: { verified: true } }
    );

    if (!existingEmployer && !existingSeaman) {
      return Response.json({ message: 'Email not found' });
    }

    if (existingSeaman) {
      const token = sign({ id: existingSeaman.id }, secret, {
        expiresIn: maxAgeRemember,
      });

      cookies().set('JWT', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: maxAgeRemember,
        path: '/',
      });
      return Response.json({
        id: existingSeaman.id,
        userRole: existingSeaman.userRole,
        name: existingSeaman.name,
        avatarUrl: existingSeaman.avatarUrl,
        registered: existingSeaman.registered,
        message: 'Authenticated',
      });
    }

    if (existingEmployer) {
      const token = sign({ id: existingEmployer }, secret, {
        expiresIn: maxAgeRemember,
      });
      cookies().set('JWT', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: maxAgeRemember,
        path: '/',
      });
      return Response.json({
        id: existingEmployer.id,
        userRole: existingEmployer.userRole,
        name: existingEmployer.name,
        avatarUrl: existingEmployer.avatarUrl,
        registered: existingEmployer.registered,
        message: 'Authenticated',
      });
    }
  } catch (error) {
    console.log(error.message);
    return Response.json({ error: 'Internal server error.' });
  }
};
