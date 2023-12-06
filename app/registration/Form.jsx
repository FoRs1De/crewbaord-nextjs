'use client';
import drawerLogo from '../../public/images/DrawerLogo.png';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link.js';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  message,
  Alert,
  Space,
  Result,
} from 'antd';
import Loader from '../components/Loader';
const { Option } = Select;
import countryList from '../assets/countries';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const [userType, setUserType] = useState('seaman');
  const [isCaptchaVerified, setCaptchaVerified] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [responseError, setResponseError] = useState(null);
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [userEmail, setUserEmail] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleSelectUserChange = (value) => {
    setUserType(value);
  };

  const handleCaptchaChange = (value) => {
    if (value) {
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
    }
  };

  const errorMessage = () => {
    messageApi.open({
      type: 'error',
      content: 'Email already in use.',
    });
  };

  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'Please, complete captacha!',
    });
  };

  const successMsg = () => {
    messageApi.open({
      type: 'success',
      content: `Email has been sent successfully to ${userEmail}`,
      duration: 10,
    });
  };

  const onFinish = async (values) => {
    if (isCaptchaVerified) {
      const currentURL = window.location.href;
      const url = new URL(currentURL);
      const originUrl = url.origin;
      const { email, confirm, ...valuesWithoutConfirm } = values;
      const emailLower = email.toLowerCase();
      setUserEmail(emailLower);
      setLoader(true);
      try {
        const res = await axios.post(`/api/post-user`, {
          ...valuesWithoutConfirm,
          email: emailLower,
          url: originUrl,
        });
        console.log(res);
        if (res.data.message === 'Email already in use') {
          setResponseError('Email already in use');
          errorMessage();
          form.setFieldsValue({
            email: '',
          });
        } else if (res.data.message === 'Company already in use') {
          setResponseError('Company name already registered');
          form.setFieldsValue({
            name: '',
          });
          setLoader(false);
        } else {
          form.setFieldsValue({
            password: '',
            userRole: '',
            name: '',
            country: '',
            name: '',
            lastName: '',
            website: '',
            email: '',
            confirm: '',
            agreement: '',
          });
          setFormIsSubmitted(true);
          setUserEmail(emailLower);
          setLoader(false);
        }
      } catch (error) {
        setResponseError(error.message);
        setLoader(false);
      }
    } else {
      warning();
    }
  };

  const resendEmailHandler = async () => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const originUrl = url.origin;
    try {
      setIsButtonDisabled(true);
      setSeconds(60);

      await axios.post(`/api/email-verification/email-verification-resend`, {
        email: userEmail,
        url: originUrl,
      });
      successMsg();
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 60000);
    } catch (error) {
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 60000);
      console.error('Something went wrong', error.response.data.error);
    }
  };

  useEffect(() => {
    let intervalId;

    if (isButtonDisabled) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [seconds, isButtonDisabled]);

  return (
    <>
      {formIsSubmitted ? (
        <div className='flex items-center justify-center'>
          <Result
            status='success'
            title='You have been successfully registered! Please confirm your email to complete the process of
            registration.'
            subTitle={
              <div>
                <br />
                <center>
                  <p>
                    The email has been sent to your designated address (
                    <strong>{userEmail}</strong>).
                  </p>{' '}
                </center>
                <br />
                <center>
                  <p>
                    {' '}
                    Kindly follow the link of our message to activate your
                    account. Check the Spam folder if the email is not in the
                    Inbox.
                  </p>
                </center>
                <center>
                  <p>
                    No Email? Please click
                    <>
                      {contextHolder}
                      <Button
                        disabled={isButtonDisabled}
                        onClick={resendEmailHandler}
                        type='link'
                      >
                        Resend Email
                      </Button>
                      {isButtonDisabled
                        ? `will be enabled after ${seconds} sec`
                        : null}
                    </>
                  </p>
                </center>
              </div>
            }
          />
        </div>
      ) : (
        <div className='flex rounded-lg justify-center items-center w-full sm:w-min lg:w-fit bg-white p-6 sm:p-8 mt-2 mb-2 sm:mt-8 sm:mb-8 shadow-xl flex-wrap-reverse'>
          <Form
            form={form}
            name='register'
            className='w-80 sm:ml-10 sm:mr-10'
            onFinish={onFinish}
            scrollToFirstError
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            {responseError ? (
              <div className='error-message'>
                <Space direction='vertical' style={{ width: '100%' }}>
                  {' '}
                  <Alert
                    message={responseError}
                    type='error'
                    showIcon
                    closable
                  />
                </Space>
              </div>
            ) : null}
            <Form.Item
              name='userRole'
              label='Register as'
              rules={[
                {
                  required: true,
                  message: 'Please select!',
                },
              ]}
            >
              <Select
                placeholder='Select if you are seaman or employer'
                onChange={handleSelectUserChange}
              >
                <Option value='seaman'>Seaman / Job seeker</Option>
                <Option value='Crewing agency'>Crewing compnay</Option>
                <Option value='Shipowner company'>
                  Ship owner / Ship operator
                </Option>
              </Select>
            </Form.Item>
            {userType !== 'seaman' ? (
              <>
                <Form.Item
                  name='name'
                  label='Company Name'
                  tooltip='Fill in with Company or Crewing name'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your company name!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name='country'
                  label='Country'
                  rules={[
                    {
                      required: true,
                      message: 'Please select!',
                    },
                  ]}
                >
                  <Select showSearch>
                    {countryList.map((country, index) => {
                      return (
                        <Option key={index} value={country}>
                          {country}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item
                  name='website'
                  label='Official Website'
                  rules={[
                    {
                      required: false,
                      message: 'Please input website!',
                    },
                  ]}
                >
                  <Input placeholder='https://' />
                </Form.Item>
              </>
            ) : (
              <>
                <Form.Item
                  name='name'
                  label='First Name'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your name!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name='lastName'
                  label='Last Name'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Last Name!',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </>
            )}
            <Form.Item
              name='email'
              label='E-mail'
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

            <Form.Item
              name='password'
              label='Password'
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
              label='Confirm Password'
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
                      new Error(
                        'The new password that you entered do not match!'
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name='agreement'
              valuePropName='checked'
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error('Should read and agree with Privacy policy')
                        ),
                },
              ]}
            >
              <Checkbox>
                I have read and agree with the{' '}
                <Link href='/privacy-policy' target='_Blank'>
                  Privacy policy
                </Link>
                .
              </Checkbox>
            </Form.Item>
            <ReCAPTCHA
              className='captcha'
              sitekey='6LfXZfsnAAAAAIfP25irSYWTscKObKZT2k41hz5E'
              onChange={handleCaptchaChange}
            />

            <Form.Item>
              {contextHolder}
              {loader ? (
                <div className='w-full flex justify-center mt-8'>
                  <Loader />
                </div>
              ) : (
                <Button
                  type='primary'
                  size='large'
                  className='bg-blue-500 text-white mt-8 w-full'
                  htmlType='submit'
                >
                  Register
                </Button>
              )}
            </Form.Item>
          </Form>
          <div className='divider md:divider-horizontal hidden lg:flex '></div>
          <div className='w-fit  flex flex-col items-center justify-center'>
            <div className='w-80 lg:ml-10 lg:mr-10'>
              <Image src={drawerLogo} alt='Crewboard' priority={true} />
            </div>
            <center>
              <h1 className='text-2xl font-bold mb-6'> Registration</h1>
            </center>
          </div>
        </div>
      )}
    </>
  );
};

export default RegistrationForm;
