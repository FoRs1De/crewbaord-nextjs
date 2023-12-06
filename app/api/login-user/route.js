import client from '@/dbConnections/mongoDB';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { cookies } from 'next/headers';

const maxAge = 1 * 24 * 60 * 60;
const maxAgeRemember = 30 * 24 * 60 * 60;
const secret = process.env.JWT_SECRET;

export const POST = async (req, res) => {
  await client.connect();
  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');
  const employersCollection = db.collection('employers');

  try {
    const receivedData = await req.json();

    const email = receivedData.email;
    const password = receivedData.password;
    const remember = receivedData.remember;

    const existingSeaman = await seamenCollection.findOne({
      email: email,
    });

    const existingEmployer = await employersCollection.findOne({
      email: email,
    });

    if (!existingEmployer && !existingSeaman) {
      return Response.json({ message: 'Email not found' });
    }

    if (existingSeaman) {
      const passwordsMatch = await bcrypt.compare(
        password,
        existingSeaman.password
      );
      if (passwordsMatch) {
        let verified = existingSeaman.verified;
        if (!verified) {
          return Response.json({ message: 'Account not verified' });
        }

        let token;
        if (remember) {
          token = sign({ id: existingSeaman.id, userRole: 'seaman' }, secret, {
            expiresIn: maxAgeRemember,
          });
        } else {
          token = sign({ id: existingSeaman.id, userRole: 'seaman' }, secret, {
            expiresIn: maxAge,
          });
        }
        cookies().set('JWT', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: remember ? maxAgeRemember : maxAge,
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
      } else {
        return Response.json({ message: 'Incorrect password' });
      }
    }
    if (existingEmployer) {
      const passwordsMatch = await bcrypt.compare(
        password,
        existingEmployer.password
      );
      if (passwordsMatch) {
        let verified = existingEmployer.verified;
        if (!verified) {
          return Response.json({ message: 'Account not verified' });
        }

        let token;
        if (remember) {
          token = sign(
            { id: existingEmployer.id, userRole: 'employer' },
            secret,
            {
              expiresIn: maxAgeRemember,
            }
          );
        } else {
          token = sign(
            { id: existingEmployer.id, userRole: 'employer' },
            secret,
            {
              expiresIn: maxAge,
            }
          );
        }
        cookies().set('JWT', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: remember ? maxAgeRemember : maxAge,
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
      } else {
        return Response.json({ message: 'Incorrect password' });
      }
    }
  } catch (error) {
    console.log(error.message);
    return Response.json({ error: 'Internal server error.' });
  }
};
