'use client';
import { Button, Form, Checkbox, DatePicker } from 'antd';
import { useState } from 'react';
import moment from 'moment';

const HideAccount = () => {
  const [disabled, setDisabled] = useState(true);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const handleChecked = () => {
    setDisabled((prev) => !prev);
  };
  const disabledDate = (current) => {
    return current && current <= moment();
  };
  return (
    <>
      <div className='flex rounded-lg justify-center items-center w-full sm:w-min lg:w-fit bg-white p-6 sm:p-8 mt-2 mb-2 sm:mt-8 sm:mb-8 shadow-xl flex-wrap-reverse'>
        <Form
          form={form}
          name='account-hide'
          className='px-10'
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout='vertical'
        >
          <h1 className='m-auto w-fit mb-5 lg:m-0'>Status</h1>
          <div className='flex font-semibold   flex-wrap justify-center  lg:gap-10 w-64 sm:w-full '>
            <div className='flex items-center mb-5 lg:mb-0'>
              <Checkbox onChange={handleChecked} className='flex items-center'>
                Hide my account until:
              </Checkbox>
            </div>
            <Form.Item name='hideTill' className='flex  lg:m-0 items-center'>
              <DatePicker
                disabled={disabled}
                disabledDate={disabledDate}
                format='DD.MM.YYYY'
              />
            </Form.Item>

            <Form.Item className='flex  lg:m-0 items-center'>
              <Button
                type='primary'
                className='bg-blue-500  w-28'
                htmlType='submit'
              >
                Submit
              </Button>
            </Form.Item>
            <div className='flex items-center'>
              <p className='w-64'>
                When your account is hidden you will not be displayed on the
                website and companies cannot contact you.
              </p>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default HideAccount;
