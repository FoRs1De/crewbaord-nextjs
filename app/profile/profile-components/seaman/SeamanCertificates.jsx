'use client';
import { PiCertificate } from 'react-icons/pi';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Select, DatePicker, Input } from 'antd';
import { MdOutlinePlaylistAdd } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import countryList from '@/app/assets/countries';

const SeamanCertificates = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sessionStatus = useSelector((state) => state.authReducer);

  const submitForm = async (values) => {
    const userId = sessionStatus.id;
    const dataToSend = {
      userId,
      certificateId: uuid(),
      ...values,
    };
    await axios.post('/api/profile/main/seaman/add-certificate', dataToSend);
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <div className='flex gap-5 flex-col   bg-white shadow-lg rounded-lg p-4 mt-4'>
        <div>
          <h4 className='flex items-center gap-2'>
            <PiCertificate />
            Certificates
          </h4>
        </div>
        <div>dasd</div>
        <div className='flex justify-end'>
          <Button
            onClick={() => setIsModalOpen(true)}
            type='primary'
            className='flex items-center gap-2 w-32 justify-center'
          >
            <MdOutlinePlaylistAdd className='text-2xl' />
            Certificate
          </Button>
        </div>
      </div>
      <Modal
        maskClosable
        title='Add Certificate'
        footer={false}
        centered
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <Form
          form={form}
          onFinish={submitForm}
          className='mt-5'
          layout='vertical'
        >
          <div className='flex'>
            <Form.Item
              className='w-full'
              name='name'
              label='Certificate name'
              rules={[
                {
                  required: true,
                  message: `Please enter certificate name!`,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className='flex gap-5'>
            <Form.Item
              className='w-1/2'
              name='number'
              label='Number'
              rules={[
                {
                  required: true,
                  message: `Please input number!`,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className='w-1/2'
              name='country'
              label='Country'
              rules={[
                {
                  required: true,
                  message: `Please select country!`,
                },
              ]}
            >
              <Select allowClear placeholder='Select country' showSearch>
                {countryList.map((country, index) => (
                  <Option key={index} value={country}>
                    {country}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className='flex gap-5'>
            <Form.Item
              className='w-1/2'
              name='issueDate'
              label='Date of issue'
              rules={[
                {
                  required: true,
                  message: `Please input issue date!`,
                },
              ]}
            >
              <DatePicker
                className='w-full'
                allowEmpty
                placeholder='DD.MM.YYYY'
                format='DD.MM.YYYY'
              />
            </Form.Item>
            <Form.Item
              className='w-1/2'
              name='expiryDate'
              label='Valid up'
              rules={[
                {
                  required: true,
                  message: `Please input expiry date!`,
                },
              ]}
            >
              <DatePicker
                className='w-full'
                allowEmpty
                placeholder='DD.MM.YYYY'
                format='DD.MM.YYYY'
              />
            </Form.Item>
          </div>

          <div className='flex w-full justify-end items-center gap-5 h-10'>
            <div>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            </div>
            <div>
              <Form.Item className='flex items-center mt-6'>
                <Button type='primary' htmlType='submit'>
                  Save Data
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default SeamanCertificates;
