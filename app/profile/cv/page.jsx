import SeamanHeader from '../SeamanHeader';
import PersonalDetails from './PersonalDetails';

const CV = () => {
  return (
    <>
      <SeamanHeader />
      <main className='flex-col mx-auto container flex-1 p-2 '>
        <PersonalDetails />
      </main>
    </>
  );
};

export default CV;
