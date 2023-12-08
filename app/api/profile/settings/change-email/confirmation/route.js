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
      client.connect();
      const db = client.db('admin');
      const seamenCollection = db.collection('seamen');
      const employersCollection = db.collection('employers');

      const existingEmail =
        tokenData.userRole === 'seaman'
          ? await seamenCollection.findOne({ email: tokenData.email })
          : await employersCollection.findOne({ email: tokenData.email });

      if (existingEmail) {
        return Response.json({ message: 'Email already in use' });
      }

      const existingUser =
        tokenData.userRole === 'seaman'
          ? await seamenCollection.findOneAndUpdate(
              { id: tokenData.userId },
              { $set: { email: tokenData.email } }
            )
          : await employersCollection.findOneAndUpdate(
              { id: tokenData.userId },
              { $set: { email: tokenData.email } }
            );
      console.log(existingUser);
      if (existingUser) {
        return Response.json({
          message: 'Email updated',
          newEmail: tokenData.email,
        });
      } else {
        return Response.json({ message: 'User not found' });
      }
    }
  } catch (error) {
    console.log(error.message);
    return Response.json({ message: 'Invalid token' });
  }
};
