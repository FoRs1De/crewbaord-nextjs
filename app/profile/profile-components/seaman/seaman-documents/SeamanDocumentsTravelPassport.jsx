'use client';
import countryList from '../../../../assets/countries';
import { LuFileEdit } from 'react-icons/lu';
import { TiInputChecked } from 'react-icons/ti';
import { useState } from 'react';
import axios from 'axios';
import { Modal, Form, Select, Input, Button, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { RiDeleteBin6Line } from 'react-icons/ri';

const SeamanDocumentsTravelPassport = ({ documents, setSubmitForm }) => {
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
      '/api/profile/main/seaman/documents-data/travel-passport',
      dataToSend
    );
    setShowForm(false);
    setTimeout(() => {
      setSubmitForm((prev) => !prev);
    }, 500);
  };

  const handleForm = () => {
    setShowForm(true);
    if (documents.travelPassport.number) {
      form.setFieldsValue({
        number: documents.travelPassport.number,
        country: documents.travelPassport.country,
        issueDate: dayjs(documents.travelPassport.issueDate),
        expiryDate: dayjs(documents.travelPassport.expiryDate),
      });
    } else {
      form.resetFields();
    }
  };
  const deleteData = async () => {
    await axios.put(
      '/api/profile/main/seaman/documents-data/travel-passport/delete',
      { userId: sessionStatus.id }
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
            title={`Travel Passport`}
            open={showForm}
            maskClosable
            onCancel={() => {
              setShowForm(false);
            }}
          >
            <Form
              className='mt-5'
              onFinish={submitForm}
              name='travelPassport'
              form={form}
              layout='vertical'
            >
              <div className='flex gap-5'>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Please select country!',
                    },
                  ]}
                  className='w-1/2'
                  name='country'
                  label='Issue country'
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
                  <Input className='w-full' />
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
                <Form.Item
                  className='w-1/2'
                  name='expiryDate'
                  label='Date of expiry'
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

              {documents.travelPassport.number ? (
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
            {documents.travelPassport.number ? (
              <TiInputChecked className='text-2xl text-green-600' />
            ) : (
              <LuFileEdit className='text-gray-400 text-md ml-1 mr-1 ' />
            )}
            <p
              className={
                !documents.travelPassport.number
                  ? 'text-gray-400  w-40 hover:text-blue-600'
                  : ' w-40 hover:text-blue-600'
              }
            >
              {`Travel Passport`}
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default SeamanDocumentsTravelPassport;
