'use client';

import { LuFileEdit } from 'react-icons/lu';
import { TiInputChecked } from 'react-icons/ti';
import { useState } from 'react';
import axios from 'axios';
import { Modal, Form, Input, Button, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { RiDeleteBin6Line } from 'react-icons/ri';

const SeamanDocumentsUsVisaC1D = ({ documents, setSubmitForm }) => {
  const [showForm, setShowForm] = useState(false);

  const [form] = Form.useForm();

  const sessionStatus = useSelector((state) => state.authReducer);

  const submitForm = async (values) => {
    const userId = sessionStatus.id;
    const dataToSend = {
      userId,
      ...values,
    };

    await axios.put(
      '/api/profile/main/seaman/documents-data/us-visa-c1d',
      dataToSend
    );
    setShowForm(false);
    setSubmitForm((prev) => !prev);
  };

  const handleForm = () => {
    setShowForm(true);
    if (documents.c1d.number) {
      form.setFieldsValue({
        number: documents.c1d.number,
        expiryDate: dayjs(documents.c1d.expiryDate),
      });
    } else {
      form.resetFields();
    }
  };
  const deleteData = async () => {
    await axios.put(
      '/api/profile/main/seaman/documents-data/us-visa-c1d/delete',
      {
        userId: sessionStatus.id,
      }
    );
    setShowForm(false);
    setSubmitForm((prev) => !prev);
  };

  return (
    <>
      {documents && (
        <>
          <Modal
            centered
            footer={false}
            title={`US Visa C1/D`}
            open={showForm}
            n
            onCancel={() => {
              setShowForm(false);
            }}
          >
            <Form
              className='mt-5'
              onFinish={submitForm}
              name='US Visa C1/D'
              form={form}
              layout='vertical'
            >
              <div className='flex flex-col '>
                <Form.Item
                  className='w-full'
                  name='number'
                  label='Visa number'
                  rules={[
                    {
                      required: true,
                      message: `Please enter number!`,
                    },
                  ]}
                >
                  <Input className='w-full' />
                </Form.Item>
                <Form.Item
                  className='w-full'
                  name='expiryDate'
                  label='Expiry date'
                  rules={[
                    {
                      required: true,
                      message: `Please enter expiry date!`,
                    },
                  ]}
                >
                  <DatePicker
                    placeholder='DD.MM.YYYY'
                    format={'DD.MM.YYYY'}
                    className='w-full'
                  />
                </Form.Item>
              </div>

              {documents.c1d.number ? (
                <div className='flex w-full justify-between items-center '>
                  <div>
                    <Button onClick={deleteData} danger>
                      <RiDeleteBin6Line className='text-lg' />
                    </Button>
                  </div>
                  <div className='flex items-center gap-5 h-10'>
                    <div>
                      <Button onClick={() => setShowForm(false)}>Cancel</Button>
                    </div>
                    <div>
                      <Form.Item className='flex items-center mt-6'>
                        <Button type='primary' htmlType='submit'>
                          Save Data
                        </Button>
                      </Form.Item>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='flex w-full justify-end items-center gap-5 h-10'>
                  <div>
                    <Button onClick={() => setShowForm(false)}>Cancel</Button>
                  </div>
                  <div>
                    <Form.Item className='flex items-center mt-6'>
                      <Button type='primary' htmlType='submit'>
                        Save Data
                      </Button>
                    </Form.Item>
                  </div>
                </div>
              )}
            </Form>
          </Modal>

          <div
            onClick={handleForm}
            className='flex items-center gap-1 hover:cursor-pointer select-none'
          >
            {documents.c1d.number ? (
              <TiInputChecked className='text-2xl text-green-600' />
            ) : (
              <LuFileEdit className='text-gray-400 text-md ml-1 mr-1 ' />
            )}
            <p
              className={
                !documents.c1d.number
                  ? 'text-gray-400  w-40 hover:text-blue-600'
                  : ' w-40 hover:text-blue-600'
              }
            >
              US Visa C1/D
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default SeamanDocumentsUsVisaC1D;
