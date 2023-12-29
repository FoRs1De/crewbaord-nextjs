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

const SeamanDocumentsSeamansBook = ({ documents, setSubmitForm }) => {
  const [showSeamansBookForm, setShowSeamansBookForm] = useState(false);
  const { Option } = Select;
  const [seamansBookForm] = Form.useForm();

  const sessionStatus = useSelector((state) => state.authReducer);

  const submitSeamansBookForm = async (values) => {
    const userId = sessionStatus.id;
    const dataToSend = {
      userId,
      ...values,
    };
    await axios.put(
      '/api/profile/main/seaman/documents-data/seamans-book',
      dataToSend
    );
    setShowSeamansBookForm(false);
    setSubmitForm((prev) => !prev);
  };

  const handleSeamansBookForm = () => {
    setShowSeamansBookForm(true);
    if (documents.seamansBook.number) {
      seamansBookForm.setFieldsValue({
        number: documents.seamansBook.number,
        country: documents.seamansBook.country,
        issueDate: dayjs(documents.seamansBook.issueDate),
        expiryDate: dayjs(documents.seamansBook.expiryDate),
      });
    } else {
      seamansBookForm.resetFields();
    }
  };
  const deleteSeamansBookData = async () => {
    await axios.put(
      '/api/profile/main/seaman/documents-data/seamans-book/delete',
      { userId: sessionStatus.id }
    );
    setShowSeamansBookForm(false);
    setSubmitForm((prev) => !prev);
  };

  return (
    <>
      {documents && (
        <>
          {/*Seamans Book modal*/}
          <Modal
            centered
            footer={false}
            title={`Seaman's Book`}
            open={showSeamansBookForm}
            maskClosable
            onCancel={() => {
              setShowSeamansBookForm(false);
            }}
          >
            <Form
              className='mt-5'
              onFinish={submitSeamansBookForm}
              name='semansBook'
              form={seamansBookForm}
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

              {documents.seamansBook.number ? (
                <div className='flex w-full justify-between items-center '>
                  <div>
                    <Button onClick={deleteSeamansBookData} danger>
                      <RiDeleteBin6Line className='text-lg' />
                    </Button>
                  </div>
                  <div className='flex items-center gap-5 h-10'>
                    <div>
                      <Button onClick={() => setShowSeamansBookForm(false)}>
                        Cancel
                      </Button>
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
                    <Button onClick={() => setShowSeamansBookForm(false)}>
                      Cancel
                    </Button>
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

          <div>
            <div
              onClick={handleSeamansBookForm}
              className='flex items-center gap-1 hover:cursor-pointer select-none'
            >
              {documents.seamansBook.number ? (
                <TiInputChecked className='text-2xl text-green-600' />
              ) : (
                <LuFileEdit className='text-gray-400 text-md ml-1 mr-1 ' />
              )}
              <p
                className={
                  !documents.seamansBook.number
                    ? 'text-gray-400  w-40 hover:text-blue-600'
                    : ' w-40 hover:text-blue-600'
                }
              >
                {`Seaman's Book`}{' '}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SeamanDocumentsSeamansBook;
