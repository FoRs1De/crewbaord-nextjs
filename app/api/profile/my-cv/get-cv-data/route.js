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
          mainData: {
            avatar: userData.avatar.urlCropped,
            name: userData.name,
            lastName: userData.lastName,
            rank: userData.rank,
            desiredWage: userData.desiredWage,
            employmentStatus: userData.employmentStatus,
            cityzenship: userData.personalDetails.cityzenship,
            phone: userData.personalDetails.phone,
            dateOfBirth: userData.personalDetails.dateOfBirth,
            email: userData.email,
            residence: userData.personalDetails.residence,
            aboutMe: userData.aboutMe,
          },
          seaService: userData.seaService,
          documents: userData.documents,
          certificates: userData.certificates,
          education: userData.documents.education,
          personalInfo: {
            height: userData.personalDetails.height,
            weight: userData.personalDetails.weight,
            shoeSize: userData.personalDetails.shoeSize,
            overallSize: userData.personalDetails.overallSize,
            hairColor: userData.personalDetails.hairColor,
            eyeColor: userData.personalDetails.eyeColor,
          },
        });
      }
    }
  }
};
