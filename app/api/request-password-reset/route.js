import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import base64url from 'base64url';
import client from '@/dbConnections/mongoDB';

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

await client.connect();
const db = client.db('admin');
const seamenCollection = db.collection('seamen');
const employersCollection = db.collection('employers');

export const POST = async (req) => {
  try {
    const receivedData = await req.json();
    console.log(receivedData);

    let userData = await seamenCollection.findOne({
      email: receivedData.email,
    });

    if (!userData) {
      userData = await employersCollection.findOne({
        email: receivedData.email,
      });
    }

    if (!userData) {
      return Response.json({ message: 'Email not found' });
    }

    const generateTimeLimitedLink = () => {
      const expiresInMinutes = 20;
      const token = jwt.sign({ userId: userData.id }, process.env.JWT_SECRET, {
        expiresIn: expiresInMinutes * 60,
      });
      const linkEncoded = base64url.encode(token);
      return linkEncoded;
    };

    const timeLimitedLink = generateTimeLimitedLink();

    const mailOptions = {
      from: 'Crewboard no-reply <no-reply@crewboard.pp.ua>',
      to: receivedData.email,
      subject: 'Crewboard: reset-password',
      html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin-top: 40px; margin-bottom: 40px; margin-left: auto; margin-right: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
        <h1 style="color: #3498db; text-align: center;">Crewboard</h1>
        <p style="font-size: 16px; color: #555;">Hello ${userData.name}!</p>
        <p style="font-size: 16px; color: #555;">You requested to reset your password on Crewboard. Please follow the link below to reset your password:</p>
        <p style="background-color: #3498db; color: #fff; padding: 10px; border-radius: 5px; text-align: center;">
          <a href="${receivedData.url}/${timeLimitedLink}" style="color: #fff; text-decoration: none; font-weight: bold;">
            Reset My Password
          </a>
        </p>
        <p style="font-size: 16px; color: #555;">This link will be available for the next 20 minutes.</p>
        <p style="font-size: 16px; color: #555;">Thank you!</p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);

    console.log(`Email has been sent to ${receivedData.email}`);
    return Response.json({
      message: `Email has been sent to ${receivedData.email}`,
    });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({
      message: 'An error occurred during password reset.',
    });
  }
};
