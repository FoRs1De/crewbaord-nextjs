'use client';
import { Button, Form, Checkbox, DatePicker } from 'antd';
import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { Alert } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from '@/app/redux/actions/auth';

const HideAccount = () => {
  const [disabled, setDisabled] = useState(true);
  const [form] = Form.useForm();
  const [checked, setChecked] = useState(false);
  const sessionStatus = useSelector((state) => state.authReducer);
  const [responseMessage, setResponseMessage] = useState(null);
  const [infoStatus, setInfoStatus] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        if (sessionStatus) {
          if (sessionStatus.hiddenTill) {
            setChecked(true);
            setDisabled(false);
            form.setFieldsValue({ hideTill: moment(sessionStatus.hiddenTill) });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchStatus();
  }, [sessionStatus, form]);

  const onFinish = async (values) => {
    const hiddenTill = values.hideTill;
    const userId = sessionStatus.id;
    const userRole = sessionStatus.userRole;
    const dataToSend = { userId, userRole, hiddenTill };

    try {
      const res = await axios.put(
        `/api/profile/settings/hide-account`,
        dataToSend
      );

      if (res.data.message === 'Status updated' && res.data.hiddenTill) {
        setInfoStatus(true);
        setResponseMessage(
          'Account is hidden till: ' + hiddenTill.format('DD.MM.YYYY')
        );

        dispatch(
          setAuth({ ...sessionStatus, hiddenTill: res.data.hiddenTill })
        );
      }

      if (!res.data.hiddenTill && res.data.message === 'Status updated') {
        setInfoStatus(true);
        setResponseMessage('Account is visible');
        dispatch(setAuth({ ...sessionStatus, hiddenTill: null }));
      }
    } catch (error) {
      setInfoStatus(false);

      setResponseMessage('Internal server error please contact support');
    }
  };
  const handleChecked = () => {
    setDisabled((prev) => !prev);
    setChecked((prev) => !prev);
    if (checked) {
      form.setFieldsValue({ hideTill: null });
    }
  };
  const disabledDate = (current) => {
    return current && current <= moment();
  };
  return (
    <>
      <div className='flex rounded-lg justify-center items-center w-full sm:w-min lg:w-fit bg-white  pt-5  pb-8 sm:py-7 sm:px-10 lg:py-8 lg:px-14  mt-4 sm:mt-10  mb-2 sm:mb-5 shadow-xl flex-wrap-reverse'>
        <Form
          form={form}
          name='account-hide'
          onFinish={onFinish}
          layout='vertical'
        >
          <div className='flex flex-wrap flex-col lg:flex-row lg:justify-between'>
            <h1 className='m-auto w-fit mb-5 lg:m-0 '>Visibility</h1>
            {responseMessage && (
              <Alert
                className='mb-5 lg:m-0'
                message={responseMessage}
                type={infoStatus ? 'info' : 'error'}
                showIcon
              />
            )}
          </div>
          <div className='flex font-semibold  flex-wrap justify-center  lg:gap-6 w-64 sm:w-full '>
            <div className='flex items-center mb-5 lg:mb-0' name='hidden'>
              <Checkbox onChange={handleChecked} checked={checked}>
                Hide my account until:
              </Checkbox>
            </div>

            <div className='flex  lg:gap-5 flex-col lg:flex-row items-center'>
              <Form.Item
                name='hideTill'
                className='flex lg:w-32 lg:m-0 items-center'
                rules={[
                  {
                    required: checked ? true : false,
                    message: 'Please input date!',
                  },
                ]}
              >
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
            </div>
            <div className='flex items-center'>
              <p className='w-80 lg:w-64'>
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
