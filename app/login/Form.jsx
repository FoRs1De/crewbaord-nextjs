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
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../redux/actions/auth';
import { setUpdateTrigger } from '../redux/actions/updateTrigger';

const LoginForm = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [responseError, setResponseError] = useState(null);
  const [emailDisplay, setEmailDisplay] = useState(null);
  const [isVerified, setIsVerified] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const dispatch = useDispatch();
  const updateTrigger = useSelector((state) => state.updateTriggerReducer);

  const onFinish = async (values) => {
    let { email, ...otherValues } = values;
    const emailLower = email.toLowerCase();
    setEmailDisplay(emailLower);
    const valuesToSend = { ...otherValues, email: emailLower };

    try {
      const res = await axios.post('/api/login-user', valuesToSend);
      if (res.data.message === 'Authenticated') {
        form.setFieldsValue({ password: '', email: '' });
        setResponseError(null);
        dispatch(setAuth(res.data));

        dispatch(setUpdateTrigger(!updateTrigger));
        router.push('/');
      } else if (res.data.message === 'Account not verified') {
        setResponseError(null);
        setIsVerified(false);
        form.setFieldsValue({ password: '', email: '' });
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
      if (emailDisplay) {
        await axios.post(`/api/email-verification/email-verification-resend`, {
          email: emailDisplay,
          url: originUrl,
        });
        setButtonDisabled(true);
        setTimeout(() => {
          setButtonDisabled(false);
        }, 60000);
      }
    } catch (error) {
      console.error('Something went wrong', error);
    }
  };

  return (
    <>
      <div className='flex rounded-lg justify-center items-center w-full sm:w-min lg:w-fit bg-white p-6 sm:p-8 mt-2 mb-2 sm:mt-8 sm:mb-8 shadow-xl flex-wrap-reverse'>
        <Form
          scrollToFirstError
          form={form}
          name='normal_login'
          className='w-80 sm:ml-10 sm:mr-10'
          initialValues={{ remember: false }}
          onFinish={onFinish}
        >
          <div className='mt-6'>
            {' '}
            <GoogleButton
              setResponseError={setResponseError}
              setIsVerified={setIsVerified}
            />
          </div>

          <Divider className='text-black'>OR</Divider>
          <div className='flex justify-center'>
            {responseError && (
              <div className='mb-5 w-full'>
                <Alert message={responseError} type='error' showIcon />
              </div>
            )}
            {!isVerified && (
              <div className='w-full mb-5'>
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
                          Thank you for registration! An activation email has
                          been sent to (<strong>{emailDisplay}</strong>).
                        </p>{' '}
                      </center>
                      <br />
                      <center>
                        <p>
                          Please check your inbox and, if needed, your Spam
                          folder for the activation message. Follow the link
                          provided to activate your account.
                        </p>
                      </center>
                      <center>
                        <p>
                          <br /> {`Didn't`} receive the email? Please click
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
                      <Divider className='text-black'>OR</Divider>
                      <center>
                        <p>
                          Alternatively, use the Google button at the top to
                          login. If you registered with a Google-associated
                          email, your account will be automatically verified.
                        </p>
                      </center>
                    </div>
                  }
                  type='info'
                />
              </div>
            )}
          </div>
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
          <div className='w-80 lg:ml-10 lg:mr-10'>
            <Image src={drawerLogo} alt='Crewboard' priority={true} />
          </div>
          <center>
            <h1 className='text-2xl font-bold '>Login</h1>
          </center>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
