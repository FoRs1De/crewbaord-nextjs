'use client';
import { LuFileEdit } from 'react-icons/lu';
import { TiInputChecked } from 'react-icons/ti';
import { useState } from 'react';
import axios from 'axios';
import { Modal, Form, Input, Button, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { RiDeleteBin6Line } from 'react-icons/ri';

const SeamanDocumentsSchengenVisa = ({ documents, setSubmitForm }) => {
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
      '/api/profile/main/seaman/documents-data/schengen-visa',
      dataToSend
    );
    setShowForm(false);
    setTimeout(() => {
      setSubmitForm((prev) => !prev);
    }, 500);
  };

  const handleForm = () => {
    setShowForm(true);
    if (documents.schengen.number) {
      form.setFieldsValue({
        type: documents.schengen.type,
        number: documents.schengen.number,
        expiryDate: dayjs(documents.schengen.expiryDate),
      });
    } else {
      form.resetFields();
    }
  };
  const deleteData = async () => {
    await axios.put(
      '/api/profile/main/seaman/documents-data/schengen-visa/delete',
      {
        userId: sessionStatus.id,
      }
    );
    setShowForm(false);
    setTimeout(() => {
      setSubmitForm((prev) => !prev);
    }, 500);
  };

  return (
    <>
      {documents && (
        <>
          <Modal
            centered
            footer={false}
            title={`Schengen Visa`}
            open={showForm}
            n
            onCancel={() => {
              setShowForm(false);
            }}
          >
            <Form
              className='mt-5'
              onFinish={submitForm}
              name='Schengen Visa'
              form={form}
              layout='vertical'
            >
              <Form.Item
                className='w-full'
                name='type'
                label='Visa type'
                rules={[
                  {
                    required: true,
                    message: `Please enter type!`,
                  },
                ]}
              >
                <Input className='w-full' />
              </Form.Item>
              <div className='flex gap-5 '>
                <Form.Item
                  className='w-1/2'
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
                  className='w-1/2'
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

              {documents.schengen.number ? (
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
            {documents.schengen.number ? (
              <TiInputChecked className='text-2xl text-green-600' />
            ) : (
              <LuFileEdit className='text-gray-400 text-md ml-1 mr-1 ' />
            )}
            <p
              className={
                !documents.schengen.number
                  ? 'text-gray-400  w-40 hover:text-blue-600'
                  : ' w-40 hover:text-blue-600'
              }
            >
              Schengen Visa
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default SeamanDocumentsSchengenVisa;
