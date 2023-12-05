'use client';
import { Button, Form, Input } from 'antd';

const ChangePassword = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  return (
    <>
      {' '}
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
          <h1 className='m-auto w-fit lg:m-0'>Password</h1>
          <div className='flex font-semibold   flex-wrap justify-center lg:gap-10 w-64 sm:w-full '>
            <Form.Item
              name='password'
              label='New password'
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
              <Input className='w-64' placeholder='Enter new password' />
            </Form.Item>

            <Form.Item
              name='confirm'
              label='Confirm password'
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
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input className='w-64' placeholder='Enter new password again' />
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                className='bg-blue-500 mt-7 w-28'
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
