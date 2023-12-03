'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button, Form, Input, Result, Alert, Space } from 'antd';
import Image from 'next/image';
import drawerLogo from '../../../public/images/DrawerLogo.png';
import Link from 'next/link.js';
import Loader from '@/app/components/Loader';
import axios from 'axios';

const ResetPassword = () => {
  const params = useParams();
  const token = params.token;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseError, setResponseError] = useState(null);
  const [validToken, setValidToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const res = await axios.post('/api/reset-password-verify', { token });
      console.log(res.data.message);
      if (res.data.message === 'verified') {
        setValidToken(true);
        setLoading(false);
      } else {
        setValidToken(false);
        setLoading(false);
      }
    };
    validateToken();
  }, [token]);

  const onFinish = async (value) => {
    try {
      setLoader(true);
      const res = await axios.put(`/api/reset-password-verify/reset-password`, {
        ...value,
        token,
      });
      form.setFieldsValue({ password: '', confirm: '' });
      if (res.data.message === 'jwt expired') {
        setValidToken(false);
        setLoader(false);
      } else if (res.data.message === 'Password changed') {
        setIsSubmitted(true);
        setLoader(false);
      } else {
        setResponseError(res.data.message);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      setResponseError(error.message);
      console.log(error);
    }
  };

  return (
    <main className='flex  mx-auto justify-center items-center container flex-1 p-2 sm:px-0'>
      {loading ? (
        <Loader />
      ) : (
        <>
          {validToken ? (
            <>
              {!isSubmitted ? (
                <div className='flex justify-center items-center  w-full sm:w-fit bg-white p-6 sm:p-8 sm:pl-14 sm:pr-14  mt-2 mb-2 sm:mt-8 sm:mb-8 shadow-xl '>
                  <Form
                    form={form}
                    name='resetPassword'
                    className='reset-password-form'
                    onFinish={onFinish}
                    scrollToFirstError
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                  >
                    <div className='w-full  flex flex-col items-center justify-center'>
                      <div className='w-80 '>
                        <Image
                          src={drawerLogo}
                          alt='Crewboard'
                          priority={true}
                        />
                      </div>
                    </div>
                    <center>
                      <h1 className='text-2xl font-bold mb-4'>
                        Reset password
                      </h1>
                    </center>
                    <Space
                      direction='vertical'
                      style={{
                        width: '100%',
                        marginBottom: 20,
                      }}
                    >
                      {responseError ? (
                        <Alert message={responseError} type='error' showIcon />
                      ) : null}
                    </Space>
                    <Form.Item
                      name='password'
                      label='New Password'
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                        {
                          min: 6,
                          message: 'Password must be at least 6 characters',
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item
                      name='confirm'
                      label='Confirm New Password'
                      dependencies={['password']}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error('Entered passwords do not match!')
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <Form.Item>
                      <div className='reset-password-button'>
                        <center>
                          {loader ? (
                            <div className='w-full flex justify-center'>
                              <Loader />
                            </div>
                          ) : (
                            <Button
                              type='primary'
                              className='bg-blue-400 text-white  w-fit'
                              htmlType='submit'
                            >
                              Reset Password
                            </Button>
                          )}
                        </center>
                      </div>
                    </Form.Item>
                  </Form>
                </div>
              ) : (
                <Result
                  status='success'
                  title={`Your password was successfully changed`}
                  subTitle='Please login with your new password.'
                  extra={[
                    <Link key='goLogin' href='/login'>
                      <Button
                        className='bg-blue-400 text-white  w-fit'
                        type='primary'
                      >
                        Go to login page
                      </Button>
                    </Link>,
                  ]}
                />
              )}
            </>
          ) : (
            <Result
              status='warning'
              title='The link has been expired or incorrect'
              extra={
                <Link href='/request-password-reset'>
                  <Button
                    type='primary'
                    className='bg-blue-400 text-white  w-fit'
                    key='console'
                  >
                    Try again
                  </Button>
                </Link>
              }
            />
          )}
        </>
      )}
    </main>
  );
};

export default ResetPassword;
