import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { decode } from 'jsonwebtoken';
import client from '@/dbConnections/mongoDB';
import { ObjectId } from 'mongodb';

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
    const userId = new ObjectId(decodedToken.payload.id);
    if (verification) {
      await client.connect();
      const db = client.db('admin');
      const seamenCollection = db.collection('seamen');
      const employersCollection = db.collection('employers');
      let userData;
      userData = await seamenCollection.findOne({
        _id: userId,
      });
      if (!userData) {
        userData = await employersCollection.findOne({
          _id: userId,
        });
      }
      if (userData) {
        if (userData.userRole === 'seaman') {
          return Response.json({
            id: userData._id.toString(),
            userRole: userData.userRole,
            name: userData.name,
            lastName: userData.lastName,
            rank: userData.rank,
            avatar: userData.avatar,
            registered: userData.registered,
            employmentStatus: userData.employmentStatus,
            employmentStatusUntil: userData.employmentStatusUntil,
            desiredWage: userData.desiredWage,
            hiddenTill: userData.hiddenTill,
            seaService: userData.seaService,
            seaServiceUpdated: userData.seaServiceUpdated,
            message: 'Authenticated',
          });
        } else {
          return Response.json({
            id: userData._id.toString(),
            userRole: userData.userRole,
            name: userData.name,
            avatar: userData.avatar,
            registered: userData.registered,
            message: 'Authenticated',
          });
        }
      } else {
        return Response.json({ message: 'User not found' });
      }
    }
  }
};
