import client from '@/dbConnections/mongoDB';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import base64url from 'base64url';
import { ObjectId } from 'mongodb';

const smtpHost = process.env.SMTP_HOST;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: 587, // SMTP port
  secure: false, // true for 465, false for other ports
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

export const PUT = async (req) => {
  const receivedData = await req.json();

  await client.connect();
  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');
  const employersCollection = db.collection('employers');
  console.log(receivedData);

  const existingEmail =
    receivedData.userRole === 'seaman'
      ? await seamenCollection.findOne({ email: receivedData.email })
      : await employersCollection.findOne({ email: receivedData.email });

  if (existingEmail) {
    return Response.json({ message: 'Email already in use' });
  }

  const existingUser =
    receivedData.userRole === 'seaman'
      ? await seamenCollection.findOne({
          _id: new ObjectId(receivedData.userId),
        })
      : await employersCollection.findOne({
          _id: new ObjectId(receivedData.userId),
        });

  if (existingUser) {
    const generateTimeLimitedLink = () => {
      const expiresInMinutes = 60;
      const token = jwt.sign(
        {
          userId: existingUser._id.toString(),
          email: receivedData.email,
          userRole: receivedData.userRole,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: expiresInMinutes * 60,
        }
      );
      const linkEncoded = base64url.encode(token);
      return linkEncoded;
    };

    const timeLimitedLink = generateTimeLimitedLink();

    const mailOptions = {
      from: 'Crewboard no-reply <no-reply@crewboard.pp.ua>',
      to: receivedData.email,
      subject: 'Crewboard: Email Change Confirmation',
      html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin-top: 40px; margin-bottom: 40px; margin-left: auto; margin-right: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
            <h1 style="color: #3498db; text-align: center;">Crewboard</h1>
            <p style="font-size: 16px; color: #555;">Hello ${existingUser.name}</p>
            <p style="font-size: 16px; color: #555;">You recently requested to change the email address associated with your Crewboard account. To complete this process, please follow the link below:</p>
            <p style="background-color: #3498db; color: #fff; padding: 10px; border-radius: 5px; text-align: center;">
              <a href="${receivedData.url}/email-change-confirmation/${timeLimitedLink}" style="color: #fff; text-decoration: none; font-weight: bold;">
                Confirm Email Change
              </a>
            </p>
            <p style="font-size: 16px; color: #555;">This link will expire after a certain period. If you did not request this change, please contact us immediately.</p>
            <p style="font-size: 16px; color: #555;">Thank you!</p>
            <div style="margin-top: 20px; text-align: center;">
            <img src="https://example.com/logo.png" alt="Crewboard Logo" style="max-width: 100px; margin-bottom: 10px;">
            <p>Contact us at: <a href="mailto:info@crewboard.pp.ua" style="color: #3498db;">info@crewboard.pp.ua</a></p>
          </div>
          </div>
        `,
    };
    try {
      await transporter.sendMail(mailOptions);
      return Response.json({ message: 'Email sent' });
    } catch (err) {
      console.log(err.message);
      return Response.json({ message: 'Email not sent' });
    }
  } else {
    return Response.json({ message: 'User not found' });
  }
};
