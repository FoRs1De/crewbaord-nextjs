import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';

const Login = () => {
  return (
    <main className='flex  mx-auto justify-center items-center container flex-1 p-2 sm:px-0'>
      <ChangeEmail />
      <ChangePassword />
      <DeleteAccount />
    </main>
  );
};

export default Login;
