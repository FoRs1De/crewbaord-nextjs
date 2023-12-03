import client from '@/dbConnections/mongoDB';

const TopHeader = async () => {
  const countUsers = async () => {
    await client.connect();
    const db = client.db('admin');
    const seamenCollection = db.collection('seamen');
    const employersCollection = db.collection('employers');
    const vacanciesCollection = db.collection('vacancies');

    const seamenCount = await seamenCollection.countDocuments();
    const employersCount = await employersCollection.countDocuments();
    const vacanciesCount = await vacanciesCollection.countDocuments();

    const users = {
      seamen: seamenCount,
      employers: employersCount,
      vacancies: vacanciesCount,
      total: seamenCount + employersCount,
    };
    return users;
  };
  const users = await countUsers();
  return (
    <div className='bg-sky-400 flex justify-center'>
      <div className='container flex justify-center gap-3 text-sm sm:text-base'>
        <div className='flex flex-col p-2 text-white justify-center items-center  '>
          <p className='font-bold '>{users.total}</p>
          <p className=''>Users</p>
        </div>
        <div className='flex flex-col p-2 text-white justify-center items-center'>
          <p className='font-bold'>{users.seamen}</p>
          <p>Seafarers</p>
        </div>
        <div className='flex flex-col p-2 text-white justify-center items-center'>
          <p className='font-bold'>{users.employers}</p>
          <p>Employers</p>
        </div>
        <div className='flex flex-col p-2 text-white justify-center items-center'>
          <p className='font-bold'>{users.vacancies}</p>
          <p>Vacancies</p>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
