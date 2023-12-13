import SeamanHeader from './SeamanHeader';
import SeamanSideBar from './SeamanSideBar';
import SeamanCotent from './SeamanContent';

const Profile = () => {
  return (
    <>
      <SeamanHeader />
      <main className='flex flex-wrap mx-auto container flex-1 px-2 pt-5 gap-4 pb-10 '>
        <SeamanSideBar />
        <SeamanCotent />
      </main>
    </>
  );
};

export default Profile;
