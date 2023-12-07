'use client';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../redux/actions/auth';
import { useRouter } from 'next/navigation';
import { setUpdateTrigger } from '../redux/actions/updateTrigger';

const GoogleButton = ({ setResponseError, setIsVerified }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const updateTrigger = useSelector((state) => state.updateTriggerReducer);

  const handleSuccess = (data) => {
    const accessToken = data.credential;
    const request = async () => {
      const res = await axios.post('/api/login-user/googleauth', {
        token: accessToken,
      });
      if (res.data.message === 'Authenticated') {
        setResponseError(null);
        dispatch(setAuth(res.data));
        dispatch(setUpdateTrigger(!updateTrigger));
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
