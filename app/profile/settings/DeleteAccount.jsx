'use client';
import { Button, Modal, Alert, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../redux/actions/auth';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const DeleteAccount = () => {
  const sessionStatus = useSelector((state) => state.authReducer);
  const router = useRouter();
  const dispatch = useDispatch();
  const { confirm } = Modal;
  const [responseDeleteUser, setResponseDeleteUser] = useState(null);
  const showConfirm = () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content:
        'Please confirm if you want to delete your account. Your account will be deleted with all your personal data and you can not restore anything',
      centered: true,
      async onOk() {
        try {
          const res = await axios.post(`/api/profile/settings/delete-account`, {
            userId: sessionStatus.id,
          });

          if (res.data.message === 'User deleted') {
            dispatch(setAuth(false));
            router.push('/');
          } else {
            setResponseDeleteUser(
              'Internal server error please contact support'
            );
          }
        } catch (error) {
          console.log(error.message);
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  return (
    <>
      <div className='w-full rounded-lg sm:w-fit lg:w-fit bg-white p-6 sm:p-8 mt-2 mb-2 sm:mt-8 sm:mb-8 shadow-xl'>
        <center>
          <h3 className='mb-3'>Delete Account</h3>
          <p>Push the button to Delete your Crewboard account forever.</p>
        </center>
        <Space
          direction='vertical'
          style={{
            width: '100%',
            marginBottom: 20,
          }}
        >
          {responseDeleteUser ? (
            <Alert
              className='mt-5'
              message={responseDeleteUser}
              type='error'
              showIcon
            />
          ) : null}
        </Space>
        <div className='mt-5'>
          <center>
            <Button danger htmlType='submit' onClick={showConfirm}>
              Delete Account
            </Button>
          </center>
        </div>
      </div>
    </>
  );
};

export default DeleteAccount;
