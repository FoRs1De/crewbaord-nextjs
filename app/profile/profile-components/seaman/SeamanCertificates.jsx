'use client';
import { PiCertificate } from 'react-icons/pi';
import { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Select, DatePicker, Input } from 'antd';
import { MdOutlinePlaylistAdd } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import countryList from '@/app/assets/countries';
import moment from 'moment';
import { FiEdit3 } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { ExclamationCircleFilled } from '@ant-design/icons';
import dayjs from 'dayjs';

const SeamanCertificates = ({
  setSubmitForm,
  certificates,
  certificatesUpdated,
}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const { confirm } = Modal;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sessionStatus = useSelector((state) => state.authReducer);
  const [certificateId, setCertificateId] = useState(null);

  const submitForm = async (values) => {
    const userId = sessionStatus.id;
    try {
      if (certificateId) {
        const dataToSend = {
          userId,
          certificateId,
          ...values,
        };
        await axios.put(
          '/api/profile/main/seaman/edit-certificate',
          dataToSend
        );
      } else {
        const dataToSend = {
          userId,
          certificateId: uuid(),
          ...values,
        };
        await axios.post(
          '/api/profile/main/seaman/add-certificate',
          dataToSend
        );
      }
    } catch (err) {
      console.log(err.message);
    }
    setIsModalOpen(false);
    form.resetFields();
    setSubmitForm((prev) => !prev);
  };

  const expiresIn = (date) => {
    const expirationDate = moment(date);
    const currentDate = moment();
    const daysLeft = expirationDate.diff(currentDate, 'days');
    const monthsLeft = expirationDate.diff(currentDate, 'months');
    const yearsLeft = expirationDate.diff(currentDate, 'years');
    const months = expirationDate.diff(currentDate, 'months') % 12;
    if (yearsLeft > 0) {
      return (
        <div className='flex flex-col text-sm items-center text-green-500 font-semibold'>
          <p>Expire in</p>
          <div className='flex items-center flex-col sm:flex-row sm:gap-1'>
            <p className=''>
              {yearsLeft} {yearsLeft === 1 ? 'year,' : 'years,'}
            </p>
            <p>
              {months} {months === 1 ? 'month' : 'months'}
            </p>
          </div>
        </div>
      );
    } else if (monthsLeft > 0) {
      return (
        <div className='flex flex-col text-sm items-center text-orange-500 font-semibold'>
          <p>Expire in</p>
          <p className=''>{monthsLeft} months</p>
        </div>
      );
    } else if (daysLeft > 0) {
      return (
        <div className='flex flex-col text-sm items-center text-red-500 font-semibold'>
          <p>Expire in</p>
          <p className=''>{daysLeft} days</p>
        </div>
      );
    } else {
      return <p className='text-red-500 font-bold py-2'>Expired</p>;
    }
  };

  const editCertificate = async (id) => {
    const certificate = certificates.find(
      (certificate) => certificate.certificateId === id
    );
    console.log(certificate);
    form.setFieldsValue({
      name: certificate.name,
      country: certificate.country,
      number: certificate.number,
      issueDate: dayjs(certificate.issueDate),
      expiryDate: dayjs(certificate.expiryDate),
    });
    setCertificateId(id);
    setIsModalOpen(true);
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Delete confirmation',
      icon: <ExclamationCircleFilled />,
      content: `Are you sure you want to delete this Certificate? 
                 This action cannot be undone.`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'Cancel',
      centered: true,
      maskClosable: true,
      onOk() {
        const dataToSend = { userId: sessionStatus.id, certificateId: id };
        const deleteRecord = async () => {
          const res = await axios.post(
            '/api/profile/main/seaman/delete-certificate',
            dataToSend
          );
          setSubmitForm((prev) => !prev);
          console.log(res.data.message);
        };
        deleteRecord();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <>
      {certificates && (
        <>
          <div className='flex gap-5 flex-col   bg-white shadow-lg rounded-lg p-4 mt-4'>
            <div>
              <h4 className='flex items-center gap-2'>
                <PiCertificate />
                Certificates
              </h4>
            </div>
            <div>
              {certificates.map((certificate) => {
                return (
                  <div
                    key={certificate.certificateId}
                    className='collapse collapse-arrow border-2 border-gray-200 mb-2 '
                  >
                    <input type='checkbox' name='my-accordion-4' />
                    <div className='collapse-title flex justify-between items-center'>
                      <p className='text-lg font-semibold'>
                        {certificate.name}
                      </p>

                      <div className='whitespace-nowrap ml-2'>
                        {expiresIn(certificate.expiryDate)}
                      </div>
                    </div>
                    <div className='collapse-content'>
                      <div className='grid grid-cols-1 lg:grid-cols-2 xl:w-3/4'>
                        <div className='flex pb-2'>
                          <p className='w-36'>Number:</p>
                          <p> {certificate.number}</p>
                        </div>
                        <div className='flex pb-2'>
                          <p className='w-36'>Country of issue:</p>
                          <p> {certificate.country}</p>
                        </div>
                        <div className='flex pb-2'>
                          <p className='w-36'> Date of issue: </p>
                          <p>
                            {moment(certificate.issueDate).format('DD.MM.YYYY')}
                          </p>
                        </div>
                        <div className='flex pb-2'>
                          <p className='w-36'>Date of expiry:</p>
                          <p>
                            {moment(certificate.expiryDate).format(
                              'DD.MM.YYYY'
                            )}
                          </p>
                        </div>
                      </div>
                      <div className='flex justify-end gap-5 mt-5'>
                        <Button
                          onClick={() =>
                            editCertificate(certificate.certificateId)
                          }
                          className='flex gap-2 items-center'
                        >
                          <FiEdit3 className='text-lg' />
                          Edit
                        </Button>
                        <Button
                          onClick={() =>
                            showDeleteConfirm(certificate.certificateId)
                          }
                          className='flex gap-2 items-center'
                          danger
                        >
                          <RiDeleteBinLine className='text-lg' />
                          Delete
                        </Button>
                      </div>{' '}
                    </div>
                  </div>
                );
              })}
            </div>
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
      )}
    </>
  );
};

export default SeamanCertificates;
