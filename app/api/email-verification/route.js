import client from '@/dbConnections/mongoDB';
import jwt from 'jsonwebtoken';
import base64url from 'base64url';

export const PUT = async (req) => {
  const receivedData = await req.json();
  const codedToken = receivedData.token;
  const token = base64url.decode(codedToken);
  try {
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    console.log(tokenData);
    if (tokenData) {
      const userId = tokenData.userId;
      await client.connect();
      const db = client.db('admin');
      const seamenCollection = db.collection('seamen');
      const employersCollection = db.collection('employers');

      let userData = await seamenCollection.findOneAndUpdate(
        { id: userId },
        { $set: { verified: true } }
      );

      if (!userData) {
        userData = await employersCollection.findOneAndUpdate(
          { id: userId },
          { $set: { verified: true } }
        );
      }

      if (userData) {
        return Response.json({ message: 'Account verified' });
      } else {
        console.log('User not found');
        return Response.json({ message: 'User not found' });
      }
    }
  } catch (error) {
    console.log(error.message);
    return Response.json({ message: 'Invalid token' });
  }
};
