import SeamanPersonalDetails from './profile-components/seaman/SeamanPersonalDetails';
import SeamanHeader from './profile-components/seaman/SeamanHeader';
import SeamanSeaService from './profile-components/seaman/SeamanSeaService';
import SeamanSideBar from './profile-components/seaman/SeamanSideBar';
import SeamanTopContent from './profile-components/seaman/SeamanTopContent';
import SeamanDocuments from './profile-components/seaman/SeamanDocuments';
import SeamanCertificates from './profile-components/seaman/SeamanCertificates';

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
          <SeamanCertificates />
        </div>
      </main>
    </>
  );
};

export default Profile;
