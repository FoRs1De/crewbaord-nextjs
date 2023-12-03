'use client';
import { useState } from 'react';
import { Button, Form, Input, Result, Alert, Space, message } from 'antd';
import Loader from '../components/Loader';
import axios from 'axios';
import Image from 'next/image';
import drawerLogo from '../../public/images/DrawerLogo.png';

const RequestPasswordReset = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [responseError, setResponseError] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);

  const errorMessage = () => {
    messageApi.open({
      type: 'error',
      content: responseError,
    });
  };

  const onFinish = async (value) => {
    setEmail(value);
    try {
      const currentURL = window.location.href;
      const valueWithUrl = { ...value, url: currentURL };
      setLoader(true);
      const res = await axios.post('/api/request-password-reset', valueWithUrl);
      console.log(res.data.message);
      if (
        res.data.message === `Email not found` ||
        res.data.message === `An error occurred during password reset.`
      ) {
        setLoader(false);
        form.setFieldsValue({ email: '' });
        setResponseError(res.data.message);
      } else {
        setLoader(false);
        setIsSubmitted(true);
      }
    } catch (error) {
      setLoader(false);
      setResponseError(error.message);
      console.log(error);
      form.setFieldsValue({ email: '' });
      errorMessage();
    }
  };

  return (
    <main className='flex  mx-auto justify-center items-center container flex-1 p-2 sm:px-0'>
      {!isSubmitted ? (
        <div className='flex justify-center items-center   sm:w-fit bg-white p-6 sm:p-8 sm:pl-14 sm:pr-14 w-full mt-2 mb-2 sm:mt-8 sm:mb-8 shadow-xl '>
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
                <Image src={drawerLogo} alt='Crewboard' priority={true} />
              </div>
            </div>
            <center>
              <h1 className='text-2xl font-bold mb-6'>Reset password</h1>
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
              name='email'
              label='Email'
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <div className='reset-password-button'>
                <center>
                  {contextHolder}
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
          title={`Email with instructions has been sent to ${email.email}`}
          subTitle='Please check your email and follow the instructions to reset password.'
          extra={[]}
        />
      )}
    </main>
  );
};

export default RequestPasswordReset;
