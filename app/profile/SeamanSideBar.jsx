'use client';
import {
  message,
  Badge,
  Avatar,
  Upload,
  Progress,
  Modal,
  Image as AntImage,
} from 'antd';
import headerLogo from '../../public/images/HeaderLogo.png';
import NextImage from 'next/image';
import { MdUpload } from 'react-icons/md';
import { useState, useRef, useEffect } from 'react';
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
        setOpen(true);
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
    const croppedImage = await cropImage();
    const formData = new FormData();
    formData.append('croppedImage', croppedImage);
    formData.append('userId', sessionStatus.id);
    await axios.post('/api/upload/seaman-avatar/cropped-avatar', formData);
    dispatch(setUpdateTrigger(!updateTrigger));
    setOpen(false);
  };

  const cropImage = () => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = sessionStatus.avatar.url;

      console.log(img);
      img.onload = () => {
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
        if (img.src.toLowerCase().endsWith('.jpg')) {
          canvas.toBlob((blob) => {
            resolve(
              new File([blob], 'croppedImage.jpg', { type: 'image/jpeg' })
            );
          }, 'image/jpeg');
        } else {
          canvas.toBlob((blob) => {
            resolve(
              new File([blob], 'croppedImage.png', { type: 'image/png' })
            );
          }, 'image/png');
        }
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
        title='Center your avatar'
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
            <AntImage
              preview={false}
              src={sessionStatus && sessionStatus.avatar.url}
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
                    <AntImage
                      preview={false}
                      className='cursor-pointer'
                      onClick={() => {
                        setOpen(true);
                      }}
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
