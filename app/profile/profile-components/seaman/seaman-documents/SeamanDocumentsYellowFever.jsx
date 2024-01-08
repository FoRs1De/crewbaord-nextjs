'use client';

import { LuFileEdit } from 'react-icons/lu';
import { TiInputChecked } from 'react-icons/ti';
import { useState } from 'react';
import axios from 'axios';
import { Modal, Form, Select, Button, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import countryList from '@/app/assets/countries';

const SeamanDocumentsYellowFever = ({ documents, setSubmitForm }) => {
  const [showForm, setShowForm] = useState(false);
  const { Option } = Select;
  const [form] = Form.useForm();

  const sessionStatus = useSelector((state) => state.authReducer);

  const submitForm = async (values) => {
    const userId = sessionStatus.id;
    const dataToSend = {
      userId,
      ...values,
    };

    await axios.put(
      '/api/profile/main/seaman/documents-data/yellow-fever',
      dataToSend
    );
    setShowForm(false);
    setTimeout(() => {
      setSubmitForm((prev) => !prev);
    }, 500);
  };

  const handleForm = () => {
    setShowForm(true);
    if (documents.yellowFever.place) {
      form.setFieldsValue({
        place: documents.yellowFever.place,
        issueDate: dayjs(documents.yellowFever.issueDate),
      });
    } else {
      form.resetFields();
    }
  };
  const deleteData = async () => {
    await axios.put(
      '/api/profile/main/seaman/documents-data/yellow-fever/delete',
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
            title={`Yellow Fever vaccination`}
            open={showForm}
            n
            onCancel={() => {
              setShowForm(false);
            }}
          >
            <Form
              className='mt-5'
              onFinish={submitForm}
              name='yellowFever'
              form={form}
              layout='vertical'
            >
              <div className='flex flex-col '>
                <Form.Item
                  className='w-full'
                  name='place'
                  label='Country of vaccination'
                  rules={[
                    {
                      required: true,
                      message: `Please input country!`,
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
                <Form.Item
                  className='w-full'
                  name='issueDate'
                  label='Issue date'
                  rules={[
                    {
                      required: true,
                      message: `Please enter issue date!`,
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

              {documents.yellowFever.place ? (
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
            {documents.yellowFever.place ? (
              <TiInputChecked className='text-2xl text-green-600' />
            ) : (
              <LuFileEdit className='text-gray-400 text-md ml-1 mr-1 ' />
            )}
            <p
              className={
                !documents.yellowFever.place
                  ? 'text-gray-400  w-40 hover:text-blue-600'
                  : ' w-40 hover:text-blue-600'
              }
            >
              Yellow Fever
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default SeamanDocumentsYellowFever;
