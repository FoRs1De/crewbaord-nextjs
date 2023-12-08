import client from '@/dbConnections/mongoDB';
import cron from 'node-cron';

cron.schedule('0 0 * * *', async () => {
  try {
    console.log('Script started at:', new Date().toLocaleString());

    await client.connect();
    const db = client.db('admin');
    const seamenCollection = db.collection('seamen');
    const employersCollection = db.collection('employers');
    const currentDate = new Date();

    const seamenResult = await seamenCollection.updateMany(
      { hideTill: { $lte: currentDate } },
      { $set: { hideTill: null } }
    );

    const employersResult = await employersCollection.updateMany(
      { hideTill: { $lte: currentDate } },
      { $set: { hideTill: null } }
    );

    console.log(
      `Modified seamen: ${seamenResult.modifiedCount}, Modified employers: ${employersResult.modifiedCount}`
    );

    console.log(
      'Script completed successfully at:',
      new Date().toLocaleString()
    );
  } catch (error) {
    console.error('Error in script:', error);
  } finally {
    // Close the MongoDB connection after the script is executed
    await client.close();
  }
});
