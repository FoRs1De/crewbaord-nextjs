import client from '@/dbConnections/mongoDB';
import moment from 'moment';
export const GET = async (req) => {
  try {
    console.log('Script started at:', new Date().toLocaleString());

    await client.connect();
    const db = client.db('admin');
    const seamenCollection = db.collection('seamen');
    const employersCollection = db.collection('employers');
    let currentDate = new Date().toISOString();

    const seamenResult = await seamenCollection.updateMany(
      { hiddenTill: { $lte: currentDate } },
      { $set: { hiddenTill: null } }
    );

    const employersResult = await employersCollection.updateMany(
      { hiddenTill: { $lte: currentDate } },
      { $set: { hiddenTill: null } }
    );

    console.log(
      `Modified seamen: ${seamenResult.modifiedCount}, Modified employers: ${employersResult.modifiedCount}`
    );

    console.log(
      'Script completed successfully at:',
      new Date().toLocaleString()
    );
    const result =
      'Script completed successfully at:' + new Date().toLocaleString();
    return Response.json({ message: result });
  } catch (error) {
    console.error('Error in script:', error);
    return Response.json({ message: 'Error in script' });
  }
};
