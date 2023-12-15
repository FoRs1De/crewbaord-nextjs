import client from '@/dbConnections/mongoDB';
import bcrypt from 'bcrypt';
import moment from 'moment';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import base64url from 'base64url';

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
  await client.connect();
  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');
  const employersCollection = db.collection('employers');

  try {
    const hashedPassword = await bcrypt.hash(receivedData.password, 10);

    const existingSeaman = await seamenCollection.findOne({
      email: receivedData.email,
    });

    const existingEmployer = await employersCollection.findOne({
      email: receivedData.email,
    });

    if (existingSeaman || existingEmployer) {
      return Response.json({ message: 'Email already in use' });
    }

    if (receivedData.userRole !== 'seaman') {
      const existingCompany = await employersCollection.findOne({
        name: receivedData.name,
      });

      if (existingCompany) {
        return Response.json({ message: 'Company already in use' });
      }
    }

    if (receivedData.userRole === 'seaman') {
      const currentDateTime = moment().format('DD.MM.YYYY');

      const seaman = {
        userRole: receivedData.userRole,
        email: receivedData.email,
        name: receivedData.name,
        lastName: receivedData.lastName,
        rank: null,
        employmentStatus: 'empty',
        availableFrom: null,
        password: hashedPassword,
        agreement: receivedData.agreement,
        verified: false,
        avatar: {
          url: `${receivedData.url}/images/seaman-placeholder.jpeg`,
          fileName: null,
          urlCropped: `${receivedData.url}/images/seaman-placeholder.jpeg`,
          fileNameCropped: null,
          urlPreload: null,
          filenamePreload: null,
        },
        personalDetails: {
          firstName: null,
          lastName: null,
          dateOfBirth: null,
          citizenship: null,
          residence: null,
          city: null,
          address: null,
          phone: null,
          airport: null,
          englishLevel: null,
          height: null,
          weight: null,
          sizeShoe: null,
          sizeOverall: null,
          colorHair: null,
          colorEye: null,
        },
        seaService: [
          /*{
          id: uuid(),
          position: null,
          vesselName: null,
          vesselType: null,
          vesselFlag: null,
          vesselDWT: null,
          vesselYearBuilt: null,
          mainEngineType: null,
          shipowner: null,
          crewing: null,
          signOnDate: null,
          signOffDate: null,
        }*/
        ],
        vacanciesApplied: [],
        desiredWage: {
          amount: null,
          currency: null,
          period: null,
        },
        seaServiceUpdated: null,
        dataUpdated: null,
        registered: currentDateTime,
        hiddenTill: null,
      };

      const result = await seamenCollection.insertOne(seaman);
      const userId = result.insertedId.toString();
      const generateTimeLimitedLink = () => {
        const expiresInMinutes = 60;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
          expiresIn: expiresInMinutes * 60,
        });
        const linkEncoded = base64url.encode(token);
        return linkEncoded;
      };

      const timeLimitedLink = generateTimeLimitedLink();

      const mailOptions = {
        from: 'Crewboard no-reply <no-reply@crewboard.pp.ua>',
        to: receivedData.email,
        subject: 'Crewboard: Account verfication',
        html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin-top: 40px; margin-bottom: 40px; margin-left: auto; margin-right: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
          <h1 style="color: #3498db; text-align: center;">Crewboard</h1>
          <p style="font-size: 16px; color: #555;">Hello ${receivedData.name}!</p>
          <p style="font-size: 16px; color: #555;">Thank you for registering with Crewboard. To activate your account, please follow the link below:</p>
          <p style="background-color: #3498db; color: #fff; padding: 10px; border-radius: 5px; text-align: center;">
            <a href="${receivedData.url}/email-verification/${timeLimitedLink}" style="color: #fff; text-decoration: none; font-weight: bold;">
              Verify My Account
            </a>
          </p>
          <p style="font-size: 16px; color: #555;">This link will expire after a certain period. Please activate your account as soon as possible.</p>
          <p style="font-size: 16px; color: #555;">Thank you!</p>
        </div>
      `,
      };
      try {
        await transporter.sendMail(mailOptions);
        return Response.json({ message: { message: 'Email sent' } });
      } catch (err) {
        console.log(err.message);
        return Response.json({ message: 'Email not sent' });
      }
    } else {
      const currentDateTime = moment().format('DD.MM.YYYY');

      const employer = {
        userRole: receivedData.userRole,
        email: receivedData.email,
        name: receivedData.name,
        password: hashedPassword,
        agreement: receivedData.agreement,
        country: receivedData.country,
        website: receivedData.website,
        verified: false,
        postedVacancies: [],
        address: null,
        city: null,
        contactPerson: null,
        description: null,
        licenceNumber: null,
        licenseUrl: null,
        avatar: {
          url: `${receivedData.url}/images/employer-placeholder.jpeg`,
          fileName: null,
          urlCropped: `${receivedData.url}/images/employer-placeholder.jpeg`,
          fileNameCropped: null,
          urlPreload: null,
          filenamePreload: null,
        },
        phone: null,
        dataUpdated: null,
        hiddenTill: null,
        registered: currentDateTime,
      };

      const result = await employersCollection.insertOne(employer);
      const userId = result.insertedId.toString();
      const generateTimeLimitedLink = () => {
        const expiresInMinutes = 60;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
          expiresIn: expiresInMinutes * 60,
        });
        const linkEncoded = base64url.encode(token);
        return linkEncoded;
      };

      const timeLimitedLink = generateTimeLimitedLink();

      const mailOptions = {
        from: 'Crewboard no-reply <no-reply@crewboard.pp.ua>',
        to: receivedData.email,
        subject: 'Crewboard: Account verfication',
        html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin-top: 40px; margin-bottom: 40px; margin-left: auto; margin-right: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9;">
          <h1 style="color: #3498db; text-align: center;">Crewboard</h1>
          <p style="font-size: 16px; color: #555;">Hello ${receivedData.name} representative!</p>
          <p style="font-size: 16px; color: #555;">Thank you for registering with Crewboard. To activate your account, please follow the link below:</p>
          <p style="background-color: #3498db; color: #fff; padding: 10px; border-radius: 5px; text-align: center;">
            <a href="${receivedData.url}/email-verification/${timeLimitedLink}" style="color: #fff; text-decoration: none; font-weight: bold;">
              Verify My Account
            </a>
          </p>
          <p style="font-size: 16px; color: #555;">This link will expire after a certain period. Please activate your account as soon as possible.</p>
          <p style="font-size: 16px; color: #555;">Thank you!</p>
        </div>
      `,
      };
      try {
        await transporter.sendMail(mailOptions);
        return Response.json({ message: { message: 'Email sent' } });
      } catch (err) {
        console.log(err.message);
        return Response.json({ message: 'Email not sent' });
      }
    }
  } catch (error) {
    error.message;
    return Response.json({ error: 'User creation failed.' });
  }
};
