import jwt from 'jsonwebtoken';
import base64url from 'base64url';

export const POST = async (req) => {
  const receivedData = await req.json();
  const codedToken = receivedData.token;
  const token = base64url.decode(codedToken);
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return Response.json({ message: 'verified' });
  } catch (error) {
    console.log(error.message);
    return Response.json({ message: error.message });
  }
};
