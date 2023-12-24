import client from '@/dbConnections/mongoDB';
import { ObjectId } from 'mongodb';

export const PUT = async (req) => {
  const receivedData = await req.json();
  const { userId, ...data } = receivedData;
  console.log(receivedData);
  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');

  try {
    await seamenCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          name: data.name,
          lastName: data.lastName,
          'personalDetails.dateOfBirth': data.dateOfBirth,
          'personalDetails.cityzenship': data.cityzenship,
          'personalDetails.residence': data.residence,
          'personalDetails.city': data.city,
          'personalDetails.address': data.address,
          'personalDetails.phone': data.phone,
          'personalDetails.airport': data.airport,
          'personalDetails.englishLevel': data.englishLevel,
          'personalDetails.height': data.height,
          'personalDetails.weight': data.weight,
          'personalDetails.sizeShoe': data.sizeShoe,
          'personalDetails.sizeOverall': data.sizeOverall,
          'personalDetails.colorHair': data.colorHair,
          'personalDetails.colorEye': data.colorEye,
          'personalDetails.updated': new Date(),
        },
      }
    );
    return Response.json({ message: 'Personal details updated' });
  } catch (error) {
    return Response.json({ message: error.message });
  }
};
