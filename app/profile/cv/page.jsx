import SeamanHeader from '../SeamanHeader';
import SeamanCV from './SeamanCV';

const CV = () => {
  return (
    <>
      <SeamanHeader />
      <main className='flex-col mx-auto container flex-1 p-2 '>
        <SeamanCV />
      </main>
    </>
  );
};

export default CV;
