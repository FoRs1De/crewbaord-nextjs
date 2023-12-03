'use client';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/actions/auth';
import { useRouter } from 'next/navigation';

const GoogleButton = ({ setResponseError, setIsVerified }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSuccess = (data) => {
    const accessToken = data.credential;
    const request = async () => {
      const res = await axios.post('/api/login-user/googleauth', {
        token: accessToken,
      });
      if (res.data.message === 'Authenticated') {
        setResponseError(null);
        dispatch(setAuth(res.data));
        router.push('/');
      } else {
        setResponseError(res.data.message);
        setIsVerified(true);
      }
    };
    request();
  };

  const handleError = () => {};
  return (
    <div className='flex items-center justify-center'>
      <GoogleLogin
        onSuccess={(credentialResponse) => handleSuccess(credentialResponse)}
        onError={() => handleError()}
      />
    </div>
  );
};

export default GoogleButton;
