'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Loader from '@/app/components/Loader';
import Link from 'next/link.js';
import { Button, Result } from 'antd';
import axios from 'axios';

const EmailVerification = () => {
  const params = useParams();
  const token = params.token;
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      const res = await axios.put(
        '/api/profile/settings/change-email/confirmation',
        { token }
      );
      console.log(res.data.message);
      if (res.data.message === 'Email updated') {
        setIsVerified(true);
        setLoading(false);
        setNewEmail(res.data.newEmail);
      } else if (res.data.message === 'Invalid token') {
        setResponseMessage('The link has been expired or incorrect.');
        setIsVerified(false);
        setLoading(false);
      } else if (res.data.message === 'Email already in use') {
        setResponseMessage('Email already exists.');
        setIsVerified(false);
        setLoading(false);
      } else {
        setResponseMessage('Internal server error.');
        setIsVerified(false);
        setLoading(false);
      }
    };
    validateToken();
  }, [token]);

  return (
    <main className='flex  mx-auto justify-center items-center container flex-1 p-2 sm:px-0'>
      {loading ? (
        <Loader />
      ) : (
        <>
          {isVerified ? (
            <>
              <Result
                status='success'
                title={`Your email successfully changed to ${newEmail} !`}
                extra={
                  <Link href='/profile/settings'>
                    <Button
                      type='primary'
                      className='bg-blue-400 text-white  w-fit'
                      key='console'
                    >
                      Back to settings
                    </Button>
                  </Link>
                }
              />
            </>
          ) : (
            <>
              <Result
                status='warning'
                title={`There are some problems to change email for your account. ${responseMessage}`}
                subTitle='Try to change email again or contact support.'
                extra={
                  <Link href='/profile/settings'>
                    <Button
                      type='primary'
                      className='bg-blue-400 text-white  w-fit'
                      key='console'
                    >
                      To settings page
                    </Button>
                  </Link>
                }
              />
            </>
          )}
        </>
      )}
    </main>
  );
};

export default EmailVerification;
