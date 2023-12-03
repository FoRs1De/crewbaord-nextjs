'use client';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Alert } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import drawerLogo from '../../public/images/DrawerLogo.png';
import GoogleButton from './GoogleButton';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import { Divider } from 'antd';
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/actions/auth';

const LoginForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [responseError, setResponseError] = useState(null);
  const [email, setEmail] = useState(null);
  const [isVerified, setIsVerified] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setEmail(values.email);
    try {
      const res = await axios.post('/api/login-user', values);
      if (res.data.message === 'Authenticated') {
        form.setFieldsValue({ password: '', email: '' });
        setResponseError(null);
        dispatch(setAuth(res.data));
        router.push('/');
      } else if (res.data.message === 'Account not verified') {
        setIsVerified(false);
        form.setFieldsValue({ password: '', email: '' });
        const currentUrl = window.location.href;
        const url = new URL(currentUrl);
        const originUrl = url.origin;
        await axios.post(`/api/email-verification/email-verification-resend`, {
          email,
          url: originUrl,
        });
        setResponseError('');
      } else {
        form.setFieldsValue({ password: '', email: '' });
        setResponseError(res.data.message);
        setIsVerified(true);
      }
    } catch (error) {
      console.log(error.message);
      setIsVerified(true);
      setResponseError(error.message);
    }
  };

  const resendEmailHandler = async () => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const originUrl = url.origin;
    try {
      if (email) {
        await axios.post(`/api/email-verification/email-verification-resend`, {
          email,
          url: originUrl,
        });
        setButtonDisabled(true);
        setTimeout(() => {
          setButtonDisabled(false);
        }, 60000);
      }
    } catch (error) {
      console.error('Something went wrong', error.response.data.error);
    }
  };

  return (
    <>
      <div className='flex justify-center items-center w-min lg:w-fit bg-white p-6 sm:p-8 mt-2 mb-2 sm:mt-8 sm:mb-8 shadow-xl flex-wrap-reverse'>
        <Form
          scrollToFirstError
          form={form}
          name='normal_login'
          className='login-form w-80 sm:m-10'
          initialValues={{ remember: false }}
          onFinish={onFinish}
        >
          <center>
            <h1 className='text-2xl font-bold mb-6'>Login</h1>
          </center>
          {responseError && (
            <div className='mb-5'>
              <Alert message={responseError} type='error' showIcon />
            </div>
          )}

          <GoogleButton
            setResponseError={setResponseError}
            setIsVerified={setIsVerified}
          />
          <Divider className='text-black'>OR</Divider>
          <Form.Item
            name='email'
            rules={[
              {
                required: true,
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Email'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>
          <div className='flex justify-between pb-5'>
            <Form.Item name='remember' valuePropName='checked'>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link
              href='/request-password-reset'
              className='login-form-forgot text-blue-600'
            >
              Forgot password
            </Link>
          </div>

          <Form.Item>
            <Button
              type='primary'
              className='bg-blue-500 text-white  w-full'
              htmlType='submit'
            >
              Log in
            </Button>
            Or{' '}
            <Link href='/registration' className='text-blue-600'>
              register now!
            </Link>
          </Form.Item>
        </Form>
        <div className='divider md:divider-horizontal hidden lg:flex '></div>
        <div className='w-fit  flex flex-col items-center justify-center'>
          <div className='w-80 lg:m-10'>
            <Link href='/'>
              <Image src={drawerLogo} alt='Crewboard' priority={true} />
            </Link>
          </div>
          {!isVerified && (
            <div className='w-80 lg:m-10 mt-10 sm:md-0 mb-10 sm:mb-0'>
              <Alert
                message={
                  <center>
                    <p>
                      <strong>
                        Please confirm your email to complete the process of
                        registration.
                      </strong>
                    </p>
                  </center>
                }
                description={
                  <div>
                    <br />
                    <center>
                      <p>
                        The email has been sent to your designated address (
                        <strong>{email}</strong>).
                      </p>{' '}
                    </center>
                    <br />
                    <center>
                      <p>
                        {' '}
                        Kindly follow the link from our message to activate your
                        account. Check the Spam folder if the email is not in
                        the Inbox.
                      </p>
                    </center>
                    <center>
                      <p>
                        <br /> No Email? Please click
                        <>
                          <Button
                            disabled={buttonDisabled}
                            onClick={resendEmailHandler}
                            type='link'
                          >
                            Resend Email
                          </Button>
                        </>
                      </p>
                    </center>
                  </div>
                }
                type='info'
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginForm;