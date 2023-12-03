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

  useEffect(() => {
    const validateToken = async () => {
      const res = await axios.put('/api/email-verification', { token });
      console.log(res.data.message);
      if (res.data.message === 'Account verified') {
        setIsVerified(true);
        setLoading(false);
      } else {
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
                title='Your email successfully verified!'
                subTitle='From now you are verified Crewboard user. Please login with your email and password.'
                extra={
                  <Link href='/login'>
                    <Button
                      type='primary'
                      className='bg-blue-400 text-white  w-fit'
                      key='console'
                    >
                      To login page
                    </Button>
                  </Link>
                }
              />
            </>
          ) : (
            <>
              <Result
                status='warning'
                title='There are some problems with verification. The link has been expired or incorrect.'
                subTitle='Try to login and resend account verification email.'
                extra={
                  <Link href='/login'>
                    <Button
                      type='primary'
                      className='bg-blue-400 text-white  w-fit'
                      key='console'
                    >
                      To login page
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
