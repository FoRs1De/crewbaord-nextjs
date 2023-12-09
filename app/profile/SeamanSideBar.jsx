'use client';
import { message, Badge, Avatar, Upload, Progress, Modal } from 'antd';
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
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

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
      <Modal
        centered
        className='relative'
        title={null}
        open={open}
        footer={null}
        onCancel={handleCancel}
      >
        <Image
          className='p-5 '
          width={5000}
          height={5000}
          src={
            sessionStatus && sessionStatus.avatar.url
              ? sessionStatus.avatar.url
              : headerLogo
          }
          alt='avatar'
        />
      </Modal>
      <Badge.Ribbon text='Status' color='volcano'>
        <div className='my-5 relative '>
          <Avatar
            shape='square'
            size={100}
            icon={
              <div className='flex justify-center items-center w-full h-full relative overflow-hidden'>
                {uploadProgress > 0 ? (
                  <Progress
                    type='circle'
                    size={50}
                    percent={uploadProgress}
                    status={uploadProgress === 100 ? 'success' : 'active'}
                  />
                ) : (
                  <div className='relative h-full w-full'>
                    <Image
                      fill
                      sizes='(min-width: 808px) 50vw, 100vw'
                      style={{
                        objectFit: 'cover', // cover, contain, none
                      }}
                      className='cursor-pointer'
                      onClick={() => setOpen(true)}
                      src={
                        sessionStatus && sessionStatus.avatar.url
                          ? sessionStatus.avatar.url
                          : headerLogo
                      }
                      alt='avatar'
                    />
                  </div>
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
