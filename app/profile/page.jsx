import SeamanPersonalDetails from './SeamanPersonalDetails';
import SeamanHeader from './SeamanHeader';
import SeamanSeaService from './SeamanSeaService';
import SeamanSideBar from './SeamanSideBar';
import SeamanTopContent from './SeamanTopContent';
import SeamanDocuments from './SeamanDocuments';

const Profile = () => {
  return (
    <>
      <SeamanHeader />
      <main className='flex flex-col md:flex-row mx-auto container flex-1 px-2 pt-5 gap-4 pb-10 '>
        <SeamanSideBar />
        <div className='  w-full md:w-fit md:flex-grow flex flex-col '>
          <SeamanTopContent />
          <SeamanSeaService />
          <SeamanPersonalDetails />
          <SeamanDocuments />
        </div>
      </main>
    </>
  );
};

export default Profile;
