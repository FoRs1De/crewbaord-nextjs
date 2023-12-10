'use client';
import { message, Badge, Avatar, Upload, Progress, Modal } from 'antd';
import NextImage from 'next/image';
import { RiDeleteBinLine } from 'react-icons/ri';
import headerLogo from '../../public/images/HeaderLogo.png';
import { TbResize } from 'react-icons/tb';
import { MdUpload } from 'react-icons/md';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdateTrigger } from '../redux/actions/updateTrigger';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';

const SeamanSideBar = () => {
  const dispatch = useDispatch();
  const sessionStatus = useSelector((state) => state.authReducer);
  const updateTrigger = useSelector((state) => state.updateTriggerReducer);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageDimensions, setImageDimensions] = useState({});

  const [error, setError] = useState(null);

  const [open, setOpen] = useState(false);
  const [crop, setCrop] = useState({
    unit: 'px',
    x: 130,
    y: 50,
    width: 200,
    height: 200,
  });

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
        setTimeout(() => {
          setOpen(true);
        }, 500);
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

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    try {
      const croppedImage = await cropImage();

      const formData = new FormData();

      formData.append('croppedImage', croppedImage);
      formData.append('userId', sessionStatus.id);

      await axios.post('/api/upload/seaman-avatar/cropped-avatar', formData);
      dispatch(setUpdateTrigger(!updateTrigger));
      setOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  const cropImage = () => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = sessionStatus.avatar.url;

      img.onload = () => {
        setError(sessionStatus.avatar.url);
        const canvas = document.createElement('canvas');

        const ctx = canvas.getContext('2d');

        const scaleX = img.naturalWidth / imageDimensions.width;
        const scaleY = img.naturalHeight / imageDimensions.height;

        const cropWidth = crop.width * scaleX;
        const cropHeight = crop.height * scaleY;

        canvas.width = cropWidth;
        canvas.height = cropHeight;

        ctx.drawImage(
          img,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          cropWidth,
          cropHeight
        );

        // Convert the canvas content to a blob
        if (
          img.src.toLowerCase().endsWith('.jpg') ||
          img.src.toLowerCase().endsWith('.jpeg')
        ) {
          canvas.toBlob(
            (blob) =>
              resolve(
                new File([blob], 'croppedImage.jpg', { type: 'image/jpeg' })
              ),
            'image/jpeg'
          );
        } else {
          canvas.toBlob(
            (blob) =>
              resolve(
                new File([blob], 'croppedImage.png', { type: 'image/png' })
              ),
            'image/png'
          );
        }
      };

      img.onerror = () => {
        reject(new Error('Image failed to load.'));
      };
    });
  };

  const handleImageLoad = (e) => {
    setImageDimensions({
      width: e.target.width,
      height: e.target.height,
    });
  };
  return (
    <div className='w-64 bg-white flex rounded-lg justify-center shadow-lg'>
      <Modal
        centered
        title='Adjust Image Size'
        open={open}
        onCancel={handleCancel}
        onOk={handleOk}
        maskClosable={false}
      >
        <div className='m-0 p-0'>
          <ReactCrop
            className='relative '
            crop={crop}
            onChange={(c) => setCrop(c)}
            aspect={1 / 1}
          >
            <NextImage
              width={500}
              height={500}
              src={
                sessionStatus && sessionStatus.avatar.url
                  ? sessionStatus.avatar.url
                  : headerLogo
              }
              alt='avatar'
              onLoad={handleImageLoad}
            />
          </ReactCrop>
        </div>
      </Modal>
      <Badge.Ribbon text='Status' color='volcano'>
        <div className='my-5 relative '>
          <Avatar
            shape='square'
            size={150}
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
                    <NextImage
                      width={500}
                      height={500}
                      className='cursor-pointer'
                      src={
                        sessionStatus && sessionStatus.avatar.urlCropped
                          ? sessionStatus.avatar.urlCropped
                          : headerLogo
                      }
                      alt='avatar'
                    />
                  </div>
                )}
              </div>
            }
          />
          <div
            onClick={() => setOpen(true)}
            className=' cursor-pointer bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center text-white text-xl absolute right-32 bottom-32 mt-2 ml-2'
          >
            <RiDeleteBinLine />
          </div>
          <div
            onClick={() => setOpen(true)}
            className=' cursor-pointer bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center text-white text-xl absolute left-32 top-20 mt-2 ml-2'
          >
            <TbResize />
          </div>
          <Upload
            {...props}
            name='avatar'
            showUploadList={false}
            beforeUpload={beforeUpload}
          >
            <div className='bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center text-white text-xl absolute left-32 top-32 ml-2'>
              <MdUpload />
            </div>
          </Upload>
        </div>
      </Badge.Ribbon>
      {error}
    </div>
  );
};

export default SeamanSideBar;
