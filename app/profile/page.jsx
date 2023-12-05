import SeamanHeader from './SeamanHeader';
import SeamanProfile from './SeamanProfile';

const Profile = () => {
  return (
    <>
      <SeamanHeader />
      <main className='flex-col mx-auto container flex-1 p-2 '>
        <SeamanProfile />
      </main>
    </>
  );
};

export default Profile;
