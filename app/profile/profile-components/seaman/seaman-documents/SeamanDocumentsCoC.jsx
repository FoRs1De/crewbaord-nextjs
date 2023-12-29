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

const SeamanDocumentsCoC = ({ documents, setSubmitForm }) => {
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

    await axios.put('/api/profile/main/seaman/documents-data/coc', dataToSend);
    setShowForm(false);
    setTimeout(() => {
      setSubmitForm((prev) => !prev);
    }, 500);
  };

  const handleForm = () => {
    setShowForm(true);
    if (documents.coc.number) {
      form.setFieldsValue({
        number: documents.coc.number,
        country: documents.coc.country,
        qualification: documents.coc.qualification,
        issueDateCoC: dayjs(documents.coc.issueDateCoC),
      });

      if (documents.coc.expiryDateCoC) {
        form.setFieldsValue({
          expiryDateCoC: dayjs(documents.coc.expiryDateCoC),
        });
      }
      if (documents.coc.issueDateCoE) {
        form.setFieldsValue({
          issueDateCoE: dayjs(documents.coc.issueDateCoE),
        });
      }
      if (documents.coc.expiryDateCoE) {
        form.setFieldsValue({
          expiryDateCoE: dayjs(documents.coc.expiryDateCoE),
        });
      }
    } else {
      form.resetFields();
    }
  };
  const deleteData = async () => {
    await axios.put('/api/profile/main/seaman/documents-data/coc/delete', {
      userId: sessionStatus.id,
    });
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
            title={`National CoC and Endorsement`}
            open={showForm}
            maskClosable
            onCancel={() => {
              setShowForm(false);
            }}
          >
            <Form
              className='mt-5'
              onFinish={submitForm}
              name='CoC'
              form={form}
              layout='vertical'
            >
              <div className='flex gap-5'>
                <Form.Item
                  className='w-full'
                  name='qualification'
                  label='Qualification'
                  rules={[
                    {
                      required: true,
                      message: `Please input qualification!`,
                    },
                  ]}
                >
                  <Input className='w-full' />
                </Form.Item>
              </div>
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
              <div className='flex gap-2'>
                <h5 className='mb-3  w-fit'>Certificate of Competance </h5>
                <div
                  className='tooltip'
                  data-tip='If no expiry date, please leave it empty'
                >
                  <BsInfoCircle className='text-lg mb-1.5' />
                </div>
              </div>
              <div className='flex gap-5'>
                <Form.Item
                  className='w-1/2'
                  name='issueDateCoC'
                  label='Date of issue CoC'
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
                  name='expiryDateCoC'
                  label='Date of expiry CoC'
                >
                  <DatePicker
                    placeholder='DD.MM.YYYY'
                    format={'DD.MM.YYYY'}
                    className='w-full'
                  />
                </Form.Item>
              </div>
              <div className='flex gap-2'>
                <h5 className='mb-3  w-fit'>Endorsement</h5>
                <div
                  className='tooltip'
                  data-tip='If not applicable, please leave it empty'
                >
                  <BsInfoCircle className='text-lg mb-1.5' />
                </div>
              </div>
              <div className='flex gap-5'>
                <Form.Item
                  className='w-1/2'
                  name='issueDateCoE'
                  label='Date of issue CoE'
                >
                  <DatePicker
                    placeholder='DD.MM.YYYY'
                    format={'DD.MM.YYYY'}
                    className='w-full'
                  />
                </Form.Item>
                <Form.Item
                  className='w-1/2'
                  name='expiryDateCoE'
                  label='Date of expiry CoE'
                >
                  <DatePicker
                    placeholder='DD.MM.YYYY'
                    format={'DD.MM.YYYY'}
                    className='w-full'
                  />
                </Form.Item>
              </div>

              {documents.coc.number ? (
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
            {documents.coc.number ? (
              <TiInputChecked className='text-2xl text-green-600' />
            ) : (
              <LuFileEdit className='text-gray-400 text-md ml-1 mr-1 ' />
            )}
            <p
              className={
                !documents.coc.number
                  ? 'text-gray-400  w-40 hover:text-blue-600'
                  : ' w-40 hover:text-blue-600'
              }
            >
              CoC & Endorsement
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default SeamanDocumentsCoC;
