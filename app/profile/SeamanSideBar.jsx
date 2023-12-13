'use client';
import { message, Badge, Avatar, Upload, Progress, Modal } from 'antd';
import NextImage from 'next/image';
import { IoCloseSharp } from 'react-icons/io5';

import { GrEdit } from 'react-icons/gr';
import { MdUpload } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdateTrigger } from '../redux/actions/updateTrigger';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';
import { TbPhotoEdit } from 'react-icons/tb';
import { RiDeleteBinLine } from 'react-icons/ri';

const SeamanSideBar = () => {
  const dispatch = useDispatch();
  const sessionStatus = useSelector((state) => state.authReducer);
  const updateTrigger = useSelector((state) => state.updateTriggerReducer);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageDimensions, setImageDimensions] = useState({});
  const [open, setOpen] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [openButtons, setOpenButtons] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [crop, setCrop] = useState(null);

  useEffect(() => {
    if (sessionStatus && sessionStatus.avatar.fileNameCropped) {
      setEditImage(true);
    }
  }, [sessionStatus]);

  let userId;
  if (sessionStatus) {
    userId = sessionStatus.id;
  }
  const props = {
    name: 'file',
    action: '/api/upload/avatar',
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
        setEditImage(true);
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

  const handleCancel = async () => {
    setOpen(false);

    setOpenButtons(false);

    await axios.post(`/api/upload/avatar/on-cancel`, {
      userId: sessionStatus.id,
    });
    dispatch(setUpdateTrigger(!updateTrigger));
    if (sessionStatus && !sessionStatus.avatar.fileName) {
      setEditImage(false);
    }
  };

  const handleOk = async () => {
    try {
      const currentUrl = window.location.href;
      const url = new URL(currentUrl);
      const originUrl = url.origin;

      const formData = new FormData();
      formData.append('cropData', JSON.stringify(crop));
      formData.append('userId', sessionStatus.id);
      if (sessionStatus && sessionStatus.avatar.fileNamePreload) {
        formData.append('fileName', sessionStatus.avatar.fileNamePreload);
      } else {
        formData.append('fileName', sessionStatus.avatar.fileName);
      }
      formData.append('imageData', JSON.stringify(imageDimensions));
      formData.append('url', originUrl);

      const res = await axios.post(
        '/api/upload/avatar/cropped-avatar',
        formData
      );
      if (res.data.message === 'No File') {
        setOpen(false);
        dispatch(setUpdateTrigger(!updateTrigger));
        return;
      }
      dispatch(setUpdateTrigger(!updateTrigger));
      setOpen(false);
      setOpenButtons(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleImageLoad = (e) => {
    const width = e.target.width;
    const height = e.target.height;
    console.log(width, height);
    setImageDimensions({
      width,
      height,
    });

    if (width < 100 || height < 100) {
      setCrop({
        unit: 'px',
        x: 0,
        y: 0,
        width: 50,
        height: 50,
      });
      return;
    }
    const middleWidth = width / 2;
    const middleHeight = height / 2;
    const x = middleWidth - 50;
    const y = middleHeight - 50;
    if (width > 100 && height > 100) {
      setCrop({
        unit: 'px',
        x: x,
        y: y,
        width: 100,
        height: 100,
      });
    }
    if (width > 400 && height > 400) {
      const x = middleWidth - 100;
      const y = middleHeight - 100;
      setCrop({
        unit: 'px',
        x: x,
        y: y,
        width: 200,
        height: 200,
      });
      return;
    }
  };

  const handleDeletion = async () => {
    const userId = sessionStatus.id;
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const originUrl = url.origin;
    await axios.post(`/api/upload/avatar/delete-avatar`, {
      userId,
      url: originUrl,
    });
    dispatch(setUpdateTrigger(!updateTrigger));
    setDeleteModal(false);
  };

  const handleCancelDeletion = async () => {
    setDeleteModal(false);
  };

  return (
    <div className='w-64 bg-white flex rounded-lg justify-center shadow-lg'>
      {/* Edit Modal */}
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
            className='relative'
            crop={crop}
            onChange={(c) => setCrop(c)}
            aspect={1 / 1}
          >
            {sessionStatus && sessionStatus.avatar && (
              <NextImage
                width={500}
                height={500}
                src={
                  sessionStatus.avatar.fileName
                    ? sessionStatus.avatar.url
                    : sessionStatus.avatar.urlPreload
                }
                alt='avatar'
                onLoad={handleImageLoad}
              />
            )}
          </ReactCrop>
        </div>
      </Modal>
      {/* Delete Modal */}
      <Modal
        centered
        title={
          <div>
            <p className='text-lg font-semibold'>Confirmation required</p>
          </div>
        }
        open={deleteModal}
        onOk={handleDeletion}
        onCancel={handleCancelDeletion}
      >
        <p>
          After removing your avatar, a standard placeholder image will replace
          it.
        </p>
      </Modal>
      <Badge.Ribbon className='select-none' text='Status' color='volcano'>
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
                    {sessionStatus && sessionStatus.avatar.urlCropped && (
                      <NextImage
                        width={1024}
                        height={1024}
                        className='cursor-pointer'
                        src={sessionStatus && sessionStatus.avatar.urlCropped}
                        alt='avatar'
                      />
                    )}
                  </div>
                )}
              </div>
            }
          />

          {sessionStatus && sessionStatus.avatar.fileName && editImage ? (
            <>
              <div
                className=' select-none absolute left-32 top-32 ml-2 cursor-pointer bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center text-white text-xl'
                onClick={() => setOpenButtons((prev) => !prev)}
              >
                {openButtons ? <IoCloseSharp /> : <GrEdit />}
              </div>
              {openButtons && (
                <>
                  <div
                    onClick={() => setDeleteModal(true)}
                    className=' cursor-pointer bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center text-white text-xl absolute left-24 top-32  '
                  >
                    <RiDeleteBinLine />
                  </div>
                  <div
                    onClick={() => setOpen(true)}
                    className=' cursor-pointer bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center text-white text-xl absolute left-32 top-20 mt-2 ml-2'
                  >
                    <TbPhotoEdit />
                  </div>
                  <Upload
                    {...props}
                    name='avatar'
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                  >
                    <div className='bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center text-white text-xl absolute left-32 top-12 ml-2'>
                      <MdUpload />
                    </div>
                  </Upload>
                </>
              )}
            </>
          ) : (
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
          )}
        </div>
      </Badge.Ribbon>
    </div>
  );
};

export default SeamanSideBar;
