'use client';
import { Button, Form, Input } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import { Alert } from 'antd';

const ChangePassword = () => {
  const [form] = Form.useForm();
  const sessionStatus = useSelector((state) => state.authReducer);
  const [responseMessage, setResponseMessage] = useState(null);

  const onFinish = async (values) => {
    const userId = sessionStatus.id;
    const userRole = sessionStatus.userRole;
    const password = values.password;
    const dataToSend = { userId, userRole, password };

    try {
      const res = await axios.put(
        `/api/profile/settings/change-password`,
        dataToSend
      );
      if (res.data.message === 'Password updated') {
        setResponseMessage(res.data.message);
        setTimeout(() => {
          setResponseMessage(null);
        }, 5000);
        form.setFieldsValue({ password: '', confirm: '' });
      } else {
        setResponseMessage(res.data.message);
      }
    } catch (error) {
      setResponseMessage('Internal server error please contact support');
    }
  };
  return (
    <>
      <div className='flex rounded-lg justify-center items-center w-full sm:w-min lg:w-fit bg-white p-6 sm:p-8 mt-2 mb-2 sm:mt-8 sm:mb-8 shadow-xl flex-wrap-reverse'>
        <Form
          form={form}
          name='password-change'
          className='px-10'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout='vertical'
        >
          <div className='flex flex-wrap flex-col lg:flex-row lg:justify-between'>
            <h1 className='m-auto w-fit mb-5 lg:m-0 '>Password</h1>
            {responseMessage && (
              <Alert
                className='mb-5 lg:m-0'
                message={responseMessage}
                type={
                  responseMessage === 'Password updated' ? 'success' : 'error'
                }
                showIcon
              />
            )}
          </div>
          <div className='flex font-semibold   flex-wrap justify-center lg:gap-10 w-64 sm:w-full '>
            <Form.Item
              name='password'
              label='New password'
              rules={[
                {
                  type: 'password',
                  message: 'Please input your password!',
                },
                {
                  required: true,
                  min: 6,
                  message: 'Password must be at least 6 characters',
                },
              ]}
            >
              <Input.Password
                className='w-64'
                placeholder='Enter new password'
              />
            </Form.Item>

            <Form.Item
              name='confirm'
              label='Confirm password'
              dependencies={['password']}
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
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
                className='w-64'
                placeholder='Enter new password again'
              />
            </Form.Item>

            <Form.Item className=' flex items-end'>
              <Button
                type='primary'
                className='bg-blue-500  w-28'
                htmlType='submit'
              >
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};

export default ChangePassword;
