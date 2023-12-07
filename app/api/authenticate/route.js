import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { decode } from 'jsonwebtoken';
import client from '@/dbConnections/mongoDB';

export const GET = async () => {
  const cookiesList = cookies();
  const token = cookiesList.get('JWT');

  if (!token) {
    return Response.json({ message: 'Unouthenticated' });
  }

  if (token) {
    const { value } = token;
    const secret = process.env.JWT_SECRET;
    const verification = verify(value, secret);

    if (!verification) {
      return Response.json({ message: 'Token not verfifed' });
    }

    const decodedToken = decode(token.value, { complete: true });
    const userId = decodedToken.payload.id;
    if (verification) {
      await client.connect();
      const db = client.db('admin');
      const seamenCollection = db.collection('seamen');
      const employersCollection = db.collection('employers');
      let userData;
      userData = await seamenCollection.findOne({
        id: userId,
      });
      if (!userData) {
        userData = await employersCollection.findOne({
          id: userId,
        });
      }
      if (userData) {
        return Response.json({
          id: userData.id,
          userRole: userData.userRole,
          name: userData.name,
          avatarUrl: userData.avatarUrl,
          registered: userData.registered,
          message: 'Authenticated',
          hiddenTill: userData.hiddenTill,
        });
      } else {
        return Response.json({ message: 'User not found' });
      }
    }
  }
};
