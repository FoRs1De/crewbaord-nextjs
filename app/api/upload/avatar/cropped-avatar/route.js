import { writeFile, readFile, unlink } from 'fs/promises';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import client from '@/dbConnections/mongoDB';
import { ObjectId } from 'mongodb';
import sharp from 'sharp';

export const POST = async (req) => {
  const data = await req.formData();

  const url = process.env.DOMAIN_URL;
  const userId = data.get('userId');
  const fileName = data.get('fileName');
  const cropData = JSON.parse(data.get('cropData'));
  const imageData = JSON.parse(data.get('imageData'));

  const newFileName = `ava-${uuid()}${extname(fileName)}`;

  const db = client.db('admin');
  const seamenCollection = db.collection('seamen');
  const employersCollection = db.collection('employers');

  try {
    const imageBuffer = await readFile(`public/upload/avatars/${fileName}`);
    const metadata = await sharp(imageBuffer).metadata();

    const scaleX = metadata.width / imageData.width;
    const scaleY = metadata.height / imageData.height;

    const cropX = Math.round(cropData.x * scaleX);
    const cropY = Math.round(cropData.y * scaleY);
    const cropWidth = Math.round(cropData.width * scaleX);
    const cropHeight = Math.round(cropData.height * scaleY);

    const croppedBuffer = await sharp(imageBuffer)
      .extract({
        left: cropX,
        top: cropY,
        width: cropWidth,
        height: cropHeight,
      })
      .toBuffer();

    const targetSize = 1024;
    const finalBuffer = await sharp(croppedBuffer)
      .resize(targetSize, targetSize)
      .toBuffer();

    const path = `public/upload/avatars/${newFileName}`;
    await writeFile(path, finalBuffer);
  } catch (err) {
    if (err.message.startsWith('ENOENT: no such file or directory')) {
      const existingSeaman = await seamenCollection.findOneAndUpdate(
        { _id: new ObjectId(userId) },
        {
          $set: {
            'avatar.url': `${url}/images/seaman-placeholder.jpeg`,
            'avatar.fileName': null,
            'avatar.urlCropped': `${url}/images/seaman-placeholder.jpeg`,
            'avatar.fileNameCropped': null,
            'avatar.urlPreload': null,
            'avatar.fileNamePreload': null,
          },
        }
      );
      if (!existingSeaman) {
        await employersCollection.findOneAndUpdate(
          { _id: new ObjectId(userId) },
          {
            $set: {
              'avatar.url': `${url}/images/employer-placeholder.jpeg`,
              'avatar.fileName': null,
              'avatar.urlCropped': `${url}/images/employer-placeholder.jpeg`,
              'avatar.fileNameCropped': null,
              'avatar.urlPreload': null,
              'avatar.fileNamePreload': null,
            },
          }
        );
      }
      return Response.json({ message: 'No file' });
    }
    console.log(err);
    return Response.json({ message: err.message });
  }

  const existingSeamanAvatar = await seamenCollection.findOne({
    _id: new ObjectId(userId),
  });
  if (existingSeamanAvatar && existingSeamanAvatar.avatar.fileNameCropped) {
    try {
      await unlink(
        `public/upload/avatars/${existingSeamanAvatar.avatar.fileNameCropped}`
      );
    } catch (err) {
      console.log(err);
    }
  }

  const existingEmployerAvatar = await employersCollection.findOne({
    _id: new ObjectId(userId),
  });
  if (existingEmployerAvatar && existingEmployerAvatar.avatar.fileNameCropped) {
    try {
      await unlink(
        `public/upload/avatars/${existingEmployerAvatar.avatar.fileNameCropped}`
      );
    } catch (err) {
      console.log(err);
    }
  }

  const existingSeaman = await seamenCollection.findOneAndUpdate(
    { _id: new ObjectId(userId) },
    {
      $set: {
        'avatar.urlCropped': `${url}/upload/avatars/${newFileName}`,
        'avatar.fileNameCropped': newFileName,
        'avatar.url': `${url}/upload/avatars/${fileName}`,
        'avatar.fileName': fileName,
        'avatar.urlPreload': null,
        'avatar.fileNamePreload': null,
      },
    }
  );
  if (!existingSeaman) {
    await employersCollection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      {
        $set: {
          'avatar.urlCropped': `${url}/upload/avatars/${newFileName}`,
          'avatar.fileNameCropped': newFileName,
          'avatar.url': `${url}/upload/avatars/${fileName}`,
          'avatar.fileName': fileName,
          'avatar.urlPreload': null,
          'avatar.fileNamePreload': null,
        },
      }
    );
  }

  return Response.json({ message: 'Success' });
};
