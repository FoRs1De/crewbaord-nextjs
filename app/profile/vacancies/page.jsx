import SeamanHeader from '../profile-components/seaman/SeamanHeader';
import SeamanVacancies from './SeamanVacancies';

const Vacancies = () => {
  return (
    <>
      <SeamanHeader />
      <main className='flex-col mx-auto container flex-1 p-2 '>
        <SeamanVacancies />
      </main>
    </>
  );
};

export default Vacancies;
