import client from '@/dbConnections/mongoDB';
import jwt from 'jsonwebtoken';
import base64url from 'base64url';
import bcrypt from 'bcrypt';

export const PUT = async (req) => {
  const receivedData = await req.json();
  const password = receivedData.password;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(receivedData);
  const codedToken = receivedData.token;
  const token = base64url.decode(codedToken);
  try {
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenData) {
      const userId = tokenData.userId;
      await client.connect();
      const db = client.db('admin');
      const seamenCollection = db.collection('seamen');
      const employersCollection = db.collection('employers');

      let userData = await seamenCollection.updateOne(
        { id: userId },
        { $set: { password: hashedPassword } }
      );

      if (!userData) {
        userData = await employersCollection.updateOne(
          { id: userId },
          { $set: { password: hashedPassword } }
        );
      }
      console.log(userData);
      if (userData) {
        console.log('Password changed');
        return Response.json({ message: 'Password changed' });
      } else {
        console.log('User not found');
        return Response.json({ message: 'User not found' });
      }
    }
  } catch (error) {
    console.log(error.message);
    return Response.json({ message: error.message });
  }
};
