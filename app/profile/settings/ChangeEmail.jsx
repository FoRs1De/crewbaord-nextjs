'use client';
import { Button, Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Alert } from 'antd';
import axios from 'axios';
import Loader from '../../components/Loader';

const ChangeEmail = () => {
  const [form] = Form.useForm();
  const sessionStatus = useSelector((state) => state.authReducer);
  const [responseMessage, setResponseMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    const userId = sessionStatus.id;
    const userRole = sessionStatus.userRole;
    const email = values.email;
    const currentURL = window.location.href;
    const url = new URL(currentURL);
    const originUrl = url.origin;
    const dataToSend = { userId, userRole, email, url: originUrl };
    setLoading(true);
    try {
      const res = await axios.put(
        `/api/profile/settings/change-email`,
        dataToSend
      );
      setLoading(false);
      if (res.data.message === 'Email sent') {
        setSuccessMessage(true);
        setResponseMessage(
          `Email has been sent to ${email}. Please check your inbox.`
        );
        form.setFieldsValue({ email: '', confirm: '' });
        setTimeout(() => {
          setResponseMessage(null);
        }, 10000);
      } else {
        setSuccessMessage(false);
        setResponseMessage(res.data.message);
        setTimeout(() => {
          setResponseMessage(null);
        }, 10000);
      }
    } catch (error) {
      setLoading(false);
      setSuccessMessage(false);
      setResponseMessage('Internal server error please contact support');
      setTimeout(() => {
        setResponseMessage(null);
      }, 10000);
    }
  };

  return (
    <>
      <div className='flex rounded-lg justify-center items-center w-full sm:w-min lg:w-fit bg-white p-6 sm:p-8 mt-2 mb-2 sm:my-5 shadow-xl flex-wrap-reverse'>
        <Form
          form={form}
          name='email-change'
          className='px-10'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout='vertical'
        >
          <div className='flex flex-wrap flex-col lg:flex-row lg:justify-between'>
            <h1 className='m-auto w-fit mb-5 lg:m-0 '>Email</h1>
            {responseMessage && (
              <Alert
                className='mb-5 lg:m-0'
                message={responseMessage}
                type={successMessage ? 'info' : 'error'}
                showIcon
              />
            )}
          </div>
          <div className='flex font-semibold   flex-wrap justify-center lg:gap-10 w-64 sm:w-full '>
            <Form.Item
              name='email'
              label='New Email'
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
              <Input className='w-64' placeholder='Enter new email' />
            </Form.Item>

            <Form.Item
              name='confirm'
              label='Confirm Email'
              dependencies={['email']}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your email!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('email') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Emails do not match!'));
                  },
                }),
              ]}
            >
              <Input className='w-64' placeholder='Enter new email again' />
            </Form.Item>

            <Form.Item>
              {loading ? (
                <div className='flex justify-center mt-7 w-28'>
                  <Loader />
                </div>
              ) : (
                <Button
                  type='primary'
                  className='bg-blue-500 mt-7 w-28'
                  htmlType='submit'
                >
                  Submit
                </Button>
              )}
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};

export default ChangeEmail;
