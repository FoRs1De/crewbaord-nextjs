import client from '@/dbConnections/mongoDB';
import { ObjectId } from 'mongodb';
import { verify, decode } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const GET = async (req) => {
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

      let userData;
      userData = await seamenCollection.findOne({
        _id: userId,
      });

      if (userData) {
        return Response.json({
          name: userData.name,
          lastName: userData.lastName,
          dateOfBirth: userData.personalDetails.dateOfBirth,
          cityzenship: userData.personalDetails.cityzenship,
          residence: userData.personalDetails.residence,
          city: userData.personalDetails.city,
          address: userData.personalDetails.address,
          phone: userData.personalDetails.phone,
          airport: userData.personalDetails.airport,
          englishLevel: userData.personalDetails.englishLevel,
          height: userData.personalDetails.height,
          weight: userData.personalDetails.weight,
          sizeShoe: userData.personalDetails.sizeShoe,
          sizeOverall: userData.personalDetails.sizeOverall,
          colorHair: userData.personalDetails.colorHair,
          colorEye: userData.personalDetails.colorEye,
        });
      }
    }
  }
};
