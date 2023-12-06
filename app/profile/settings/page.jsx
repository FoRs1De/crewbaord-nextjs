import SeamanHeader from '../SeamanHeader';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';
import HideAccount from './HideAccount';

const Login = () => {
  return (
    <>
      <SeamanHeader />
      <main className='flex flex-col  mx-auto justify-center items-center container flex-1 p-2 sm:px-0 '>
        <HideAccount />
        <ChangeEmail />
        <ChangePassword />
        <DeleteAccount />
      </main>
    </>
  );
};

export default Login;
