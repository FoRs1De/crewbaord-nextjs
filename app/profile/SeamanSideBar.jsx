'use client';
import { message, Badge, Avatar, Upload, Progress } from 'antd';
import headerLogo from '../../public/images/HeaderLogo.png';
import Image from 'next/image';
import { MdUpload } from 'react-icons/md';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdateTrigger } from '../redux/actions/updateTrigger';

const SeamanSideBar = () => {
  const dispatch = useDispatch();
  const sessionStatus = useSelector((state) => state.authReducer);
  const updateTrigger = useSelector((state) => state.updateTriggerReducer);
  const [uploadProgress, setUploadProgress] = useState(0);
  let userId;
  if (sessionStatus) {
    userId = sessionStatus.id;
  }
  const props = {
    name: 'file',
    action: '/api/upload/seaman-avatar',
    headers: {
      authorization: userId,
    },
    onChange(info) {
      if (info.file.status === 'uploading') {
        setUploadProgress(Math.floor(info.file.percent) || 0);
      } else {
        setUploadProgress(0);
      }
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        console.log(`${info.file.name} file uploaded successfully`);
        dispatch(setUpdateTrigger(!updateTrigger));
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Image must smaller than 5MB!');
    }
    return isJpgOrPng && isLt5M;
  };

  return (
    <div className='w-64 bg-white flex rounded-lg justify-center shadow-lg'>
      <Badge.Ribbon text='Status' color='volcano'>
        <div className='my-5 relative '>
          <Avatar
            shape='square'
            size={100}
            icon={
              <div className='flex justify-center items-center w-full h-full'>
                {uploadProgress > 0 ? (
                  <Progress
                    type='circle'
                    size={50}
                    percent={uploadProgress}
                    status={uploadProgress === 100 ? 'success' : 'active'}
                  />
                ) : (
                  <Image
                    width={100}
                    height={100}
                    src={
                      sessionStatus && sessionStatus.avatar.url
                        ? sessionStatus.avatar.url
                        : headerLogo
                    }
                    alt='avatar'
                  />
                )}
              </div>
            }
          />
          <Upload
            {...props}
            name='avatar'
            showUploadList={false}
            beforeUpload={beforeUpload}
          >
            <div className='bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center text-white text-xl absolute left-20 top-16 mt-3 ml-1'>
              <MdUpload />
            </div>
          </Upload>
        </div>
      </Badge.Ribbon>
    </div>
  );
};

export default SeamanSideBar;
