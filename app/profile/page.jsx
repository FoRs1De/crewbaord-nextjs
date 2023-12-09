import SeamanHeader from './SeamanHeader';
import SeamanSideBar from './SeamanSideBar';

const Profile = () => {
  return (
    <>
      <SeamanHeader />
      <main className='flex-col mx-auto container flex-1 px-2 pt-5  pb-10 '>
        <SeamanSideBar />
      </main>
    </>
  );
};

export default Profile;
