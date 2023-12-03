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

export const POST = async (req) => {
  const receivedData = await req.json();
  const email = receivedData.email;
  const url = receivedData.url;

  await client.connect();
  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');
  const employersCollection = db.collection('employers');
  const existingSeaman = await seamenCollection.findOne({ email });
  const existingEmployer = await employersCollection.findOne({ email });

  let mailOptions;
  if (existingSeaman) {
    const generateTimeLimitedLink = () => {
      const expiresInMinutes = 60;
      const token = jwt.sign(
        { userId: existingSeaman.id },
        process.env.JWT_SECRET,
        {
          expiresIn: expiresInMinutes * 60,
        }
      );
      const linkEncoded = base64url.encode(token);
      return linkEncoded;
    };

    const timeLimitedLink = generateTimeLimitedLink();

    mailOptions = {
      from: 'Crewboard no-reply <no-reply@crewboard.pp.ua>',
      to: email,
      subject: 'Crewboard: Account verfication',
      html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin-top: 40px; margin-bottom: 40px; margin-left: auto; margin-right: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
      <h1 style="color: #3498db; text-align: center;">Crewboard</h1>
      <p style="font-size: 16px; color: #555;">Hello ${existingSeaman.name}!</p>
      <p style="font-size: 16px; color: #555;">Thank you for registering with Crewboard. To activate your account, please follow the link below:</p>
      <p style="background-color: #3498db; color: #fff; padding: 10px; border-radius: 5px; text-align: center;">
        <a href="${url}/email-verification/${timeLimitedLink}" style="color: #fff; text-decoration: none; font-weight: bold;">
          Verify My Account
        </a>
      </p>
      <p style="font-size: 16px; color: #555;">This link will expire after a certain period. Please activate your account as soon as possible.</p>
      <p style="font-size: 16px; color: #555;">Thank you!</p>
    </div>
  `,
    };
  } else if (existingEmployer) {
    const generateTimeLimitedLink = () => {
      const expiresInMinutes = 60;
      const token = jwt.sign(
        { userId: existingEmployer.id },
        process.env.JWT_SECRET,
        {
          expiresIn: expiresInMinutes * 60,
        }
      );
      const linkEncoded = base64url.encode(token);
      return linkEncoded;
    };

    const timeLimitedLink = generateTimeLimitedLink();

    mailOptions = {
      from: 'Crewboard no-reply <no-reply@crewboard.pp.ua>',
      to: email,
      subject: 'Crewboard: Account verfication',
      html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin-top: 40px; margin-bottom: 40px; margin-left: auto; margin-right: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
        <h1 style="color: #3498db; text-align: center;">Crewboard</h1>
        <p style="font-size: 16px; color: #555;">Hello ${existingEmployer.name} representative!</p>
        <p style="font-size: 16px; color: #555;">Thank you for registering with Crewboard. To activate your account, please follow the link below:</p>
        <p style="background-color: #3498db; color: #fff; padding: 10px; border-radius: 5px; text-align: center;">
          <a href="${url}/email-verification/${timeLimitedLink}" style="color: #fff; text-decoration: none; font-weight: bold;">
            Verify My Account
          </a>
        </p>
        <p style="font-size: 16px; color: #555;">This link will expire after a certain period. Please activate your account as soon as possible.</p>
        <p style="font-size: 16px; color: #555;">Thank you!</p>
      </div>
    `,
    };
  } else {
    return Response.json({ message: 'User not found' });
  }
  try {
    await transporter.sendMail(mailOptions);
    return Response.json({ message: { message: 'Email sent' } });
  } catch (err) {
    console.log(err.message);
    return Response.json({ message: 'Email not sent' });
  }
};
