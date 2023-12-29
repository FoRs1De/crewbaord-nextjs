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
import { BsInfoCircle } from 'react-icons/bs';

const SeamanDocumentsEducation = ({ documents, setSubmitForm }) => {
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
      '/api/profile/main/seaman/documents-data/education',
      dataToSend
    );
    setShowForm(false);
    setSubmitForm((prev) => !prev);
  };

  const handleForm = () => {
    setShowForm(true);
    if (documents.education.institutionName) {
      form.setFieldsValue({
        institutionType: documents.education.institutionType,
        institutionName: documents.education.institutionName,
        degree: documents.education.degree,
        graduationDate: dayjs(documents.education.graduationDate),
      });
    } else {
      form.resetFields();
    }
  };
  const deleteData = async () => {
    await axios.put(
      '/api/profile/main/seaman/documents-data/education/delete',
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
            title={`Education`}
            open={showForm}
            maskClosable
            onCancel={() => {
              setShowForm(false);
            }}
          >
            <Form
              className='mt-5'
              onFinish={submitForm}
              name='Education'
              form={form}
              layout='vertical'
            >
              <div className='flex gap-5'>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: 'Please select institution type!',
                    },
                  ]}
                  className='w-1/2'
                  name='institutionType'
                  label='Education institution type'
                >
                  <Select allowClear placeholder='Select' showSearch>
                    <Option value='Academy'>Academy</Option>
                    <Option value='High School'>High School</Option>
                    <Option value='Institute'>Institute</Option>
                    <Option value='College'>College</Option>
                    <Option value='University'>University</Option>
                    <Option value='Other'>Specialized School</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  className='w-1/2'
                  name='graduationDate'
                  label='Graduation date'
                  rules={[
                    {
                      required: true,
                      message: `Please enter graduation date!`,
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
              <div className='flex flex-col '>
                <Form.Item
                  className='w-full'
                  name='institutionName'
                  label='Name of institution'
                  rules={[
                    {
                      required: true,
                      message: `Please input name!`,
                    },
                  ]}
                >
                  <Input className='w-full' />
                </Form.Item>
                <Form.Item
                  className='w-full'
                  name='degree'
                  label='Degree'
                  rules={[
                    {
                      required: true,
                      message: `Please input degree!`,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>

              {documents.education.institutionName ? (
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
            {documents.education.institutionName ? (
              <TiInputChecked className='text-2xl text-green-600' />
            ) : (
              <LuFileEdit className='text-gray-400 text-md ml-1 mr-1 ' />
            )}
            <p
              className={
                !documents.education.institutionName
                  ? 'text-gray-400  w-40 hover:text-blue-600'
                  : ' w-40 hover:text-blue-600'
              }
            >
              Education
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default SeamanDocumentsEducation;
