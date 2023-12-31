'use client';
import { LuShip } from 'react-icons/lu';
import {
  Button,
  Form,
  Select,
  Input,
  InputNumber,
  DatePicker,
  Modal,
  Empty,
} from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { CgPlayListAdd } from 'react-icons/cg';
import { useState, useEffect } from 'react';
import ranksSelect from '../../../assets/ranksSelect';
import shipTypes from '../../../assets/shipTypes';
import flagStates from '../../../assets/flagStates';
import moment from 'moment';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiEdit3 } from 'react-icons/fi';
import dayjs from 'dayjs';
import { BsInfoCircle } from 'react-icons/bs';

const SeamanSeaService = ({ setSubmitForm, seaServiceUpdated, seaService }) => {
  const [form] = Form.useForm();
  const { confirm } = Modal;
  const { Option } = Select;

  const [showForm, setShowForm] = useState(false);
  const [serviceRecordId, setServiceRecordId] = useState(null);
  const sessionStatus = useSelector((state) => state.authReducer);

  const openForm = () => {
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);

    form.resetFields();
  };
  const submitData = async (value) => {
    try {
      if (serviceRecordId) {
        const dataToSend = {
          ...value,
          userId: sessionStatus.id,
          recordId: serviceRecordId,
        };
        await axios.put(
          '/api/profile/main/seaman/edit-service-record',
          dataToSend
        );
      } else {
        const dataToSend = {
          ...value,
          userId: sessionStatus.id,
          recordId: uuid(),
        };
        await axios.post(
          '/api/profile/main/seaman/add-sea-service',
          dataToSend
        );
      }
      setSubmitForm((prev) => !prev);
      form.resetFields();
      setShowForm(false);
      setServiceRecordId(null);
    } catch (err) {
      console.log(err.message);
    }
  };

  const transformedRanksArray = ranksSelect.map((category) => {
    return {
      label: category.label,
      options: category.options.map((option) => ({
        label: option,
        value: option,
      })),
    };
  });

  const disabledDate = (current) => {
    return current && current > moment().startOf('day');
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Delete confirmation',
      icon: <ExclamationCircleFilled />,
      content:
        'Are you sure you want to delete this record? This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'Cancel',
      centered: true,
      maskClosable: true,
      onOk() {
        const dataToSend = { userId: sessionStatus.id, recordId: id };
        const deleteRecord = async () => {
          await axios.post(
            '/api/profile/main/seaman/delete-service-record',
            dataToSend
          );
          setSubmitForm((prev) => !prev);
        };
        deleteRecord();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const editRecord = async (id) => {
    const record = seaService.find((record) => record.recordId === id);

    form.setFieldsValue({
      position: record.position,
      vesselName: record.vesselName,
      vesselType: record.vesselType,
      vesselFlag: record.vesselFlag,
      vesselDWT: record.vesselDWT,
      vesselYearBuilt: record.vesselYearBuilt,
      mainEngineType: record.mainEngineType,
      mainEngineKw: record.mainEngineKw,
      shipOwner: record.shipOwner,
      crewing: record.crewing,
      signOnDate: dayjs(record.signOnDate),
      signOffDate: dayjs(record.signOffDate),
    });
    setServiceRecordId(id);
    setShowForm(true);
  };

  const contractLength = (signOn, signOff) => {
    const embarkation = moment(signOn);
    const disembarkation = moment(signOff);
    const daysOnBoard = disembarkation.diff(embarkation, 'days');
    const monthsOnBoard = disembarkation.diff(embarkation, 'months');
    const days = disembarkation.diff(embarkation, 'days') % 30;
    if (monthsOnBoard > 0) {
      return (
        <div className='flex flex-col text-sm items-center  whitespace-nowrap w-16'>
          <p className=''>
            {monthsOnBoard} {monthsOnBoard === 1 ? 'month,' : 'months,'}
          </p>
          <p className=''>
            {days} {daysOnBoard === 1 ? 'day' : 'days'}
          </p>
          <p>({daysOnBoard} days)</p>
        </div>
      );
    } else if (daysOnBoard > 0) {
      return (
        <div className='flex flex-col text-sm items-center whitespace-nowrap w-16'>
          <p className=''>{daysOnBoard} days</p>
        </div>
      );
    }
  };

  return (
    <>
      {seaService && (
        <div className='flex gap-5 flex-col   bg-white shadow-lg rounded-lg p-4 mt-4'>
          <div className='flex justify-between w-full items-center'>
            <div className='flex items-center gap-2 '>
              <LuShip className='text-xl' />
              <h4>
                Sea Service{' '}
                <div
                  className='tooltip'
                  data-tip='Enter sea service records for last 5 years'
                >
                  <BsInfoCircle className='text-lg mb-1.5' />
                </div>
              </h4>{' '}
            </div>
          </div>

          <Modal
            centered
            footer={false}
            title='Add service record'
            open={showForm}
            onCancel={closeForm}
          >
            <Form
              form={form}
              className='mt-5'
              scrollToFirstError
              layout='vertical'
              onFinish={submitData}
            >
              <div className='flex flex-col md:flex-row md:gap-5'>
                <Form.Item
                  className='w-full md:w-1/2'
                  name='position'
                  label='Your Position'
                  rules={[
                    {
                      required: true,
                      message: 'Please select!',
                    },
                  ]}
                >
                  <Select options={transformedRanksArray} showSearch></Select>
                </Form.Item>
                <Form.Item
                  className='w-full md:w-1/2'
                  name='vesselName'
                  label='Vessel Name'
                  rules={[
                    {
                      required: true,
                      message: 'Please fill in!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className='flex flex-col md:flex-row md:gap-5'>
                <Form.Item
                  className='w-full md:w-1/2'
                  name='vesselType'
                  label='Vessel Type'
                  rules={[
                    {
                      required: true,
                      message: 'Please select!',
                    },
                  ]}
                >
                  <Select showSearch>
                    {shipTypes.map((ship, index) => (
                      <Option key={index} value={ship}>
                        {ship}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  className='w-full md:w-1/2'
                  name='vesselFlag'
                  label='Vessel Flag'
                  rules={[
                    {
                      required: true,
                      message: 'Please select!',
                    },
                  ]}
                >
                  <Select showSearch>
                    {flagStates.map((state, index) => (
                      <Option key={index} value={state}>
                        {state}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className='flex flex-col md:flex-row md:gap-5'>
                <Form.Item
                  className='w-full md:w-1/2'
                  name='vesselDWT'
                  label='Vessel DWT'
                  rules={[
                    {
                      required: true,
                      message: 'Please fill in!',
                    },
                  ]}
                >
                  <InputNumber className='w-full' />
                </Form.Item>
                <Form.Item
                  className='w-full md:w-1/2'
                  name='vesselYearBuilt'
                  label='Year Built'
                  rules={[
                    {
                      required: true,
                      message: 'Please fill in!',
                    },
                  ]}
                >
                  <InputNumber className='w-full' />
                </Form.Item>
              </div>
              <div className='flex flex-col md:flex-row md:gap-5'>
                <Form.Item
                  className='w-full md:w-1/2'
                  name='mainEngineType'
                  label='ME type'
                  rules={[
                    {
                      required: true,
                      message: 'Please fill in!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  className='w-full md:w-1/2'
                  name='mainEngineKw'
                  label='Main Engine, kW'
                  rules={[
                    {
                      required: true,
                      message: 'Please fill in!',
                    },
                  ]}
                >
                  <InputNumber className='w-full' />
                </Form.Item>
              </div>
              <div className='flex flex-col md:flex-row md:gap-5'>
                <Form.Item
                  className='w-full md:w-1/2'
                  name='shipOwner'
                  label='Shipowner'
                  rules={[
                    {
                      required: true,
                      message: 'Please fill in!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  className='w-full md:w-1/2'
                  name='crewing'
                  label='Crewing Agency'
                >
                  <Input />
                </Form.Item>
              </div>
              <div className='flex flex-col md:flex-row md:gap-5'>
                <Form.Item
                  className='w-full md:w-1/2'
                  name='signOnDate'
                  label='Sign-on date'
                  rules={[
                    {
                      required: true,
                      message: 'Please fill in!',
                    },
                  ]}
                >
                  <DatePicker
                    className='w-full'
                    allowEmpty
                    disabledDate={disabledDate}
                    placeholder='DD.MM.YYYY'
                    format='DD.MM.YYYY'
                  />
                </Form.Item>
                <Form.Item
                  className='w-full md:w-1/2'
                  name='signOffDate'
                  label='Sign-off date'
                  rules={[
                    {
                      required: true,
                      message: 'Please fill in!',
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
                  <Button onClick={closeForm}>Cancel</Button>
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

          <div className='flex flex-col gap-5'>
            {seaService.length > 0 ? (
              <div>
                {seaService
                  .slice()
                  .sort((a, b) => {
                    const dateA = new Date(a.signOffDate);
                    const dateB = new Date(b.signOffDate);
                    return dateB - dateA;
                  })
                  .map((serviceRecord) => {
                    return (
                      <div
                        key={serviceRecord.recordId}
                        className='collapse collapse-arrow border-2 border-gray-200 mb-2 '
                      >
                        <input type='checkbox' name='my-accordion-4' />
                        <div className='collapse-title flex justify-between items-center gap-2'>
                          <div className='flex flex-col sm:flex-row sm:items-end w-full'>
                            <div className='sm:w-64 w-48'>
                              <h5>{serviceRecord.position}</h5>
                              <p>
                                <strong>{serviceRecord.vesselName}</strong>
                              </p>
                            </div>
                            <div className=''>
                              <div>
                                <p>
                                  <strong>
                                    {moment(serviceRecord.signOnDate).format(
                                      'DD.MM.YYYY'
                                    )}
                                  </strong>{' '}
                                  -{' '}
                                  <strong>
                                    {moment(serviceRecord.signOffDate).format(
                                      'DD.MM.YYYY'
                                    )}
                                  </strong>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div>
                            {contractLength(
                              serviceRecord.signOnDate,
                              serviceRecord.signOffDate
                            )}
                          </div>{' '}
                        </div>
                        <div className='collapse-content'>
                          <hr />
                          <div className='mt-4'>
                            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 '>
                              <div className='flex pb-2'>
                                <p className='w-36'> Vessel type:</p>{' '}
                                <p>{serviceRecord.vesselType}</p>
                              </div>
                              <div className='flex pb-2'>
                                <p className='w-36'>Year built:</p>
                                <p>{serviceRecord.vesselYearBuilt}</p>
                              </div>
                              <div className='flex pb-2'>
                                <p className='w-36'>ME type:</p>
                                <p>{serviceRecord.mainEngineType}</p>
                              </div>

                              <div className='flex  pb-2'>
                                <p className='w-36'>Vessel flag:</p>{' '}
                                <p>{serviceRecord.vesselFlag}</p>
                              </div>
                              <div className='flex  pb-2'>
                                <p className='w-36'>Vessel DWT:</p>{' '}
                                <p>{serviceRecord.vesselDWT}</p>
                              </div>
                              <div className='flex pb-2'>
                                <p className='w-36'>Main engine, kW:</p>
                                <p>{serviceRecord.mainEngineKw}</p>
                              </div>
                              <div className='flex pb-2'>
                                <p className='w-36'>Ship owner:</p>
                                <p>{serviceRecord.shipOwner}</p>
                              </div>
                              <div className='flex pb-2'>
                                <p className='w-36'>Crewing agency:</p>
                                <p>{serviceRecord.crewing}</p>
                              </div>
                            </div>
                          </div>
                          <div className='flex justify-end gap-5 mt-5'>
                            <Button
                              onClick={() => editRecord(serviceRecord.recordId)}
                              className='flex gap-2 items-center'
                            >
                              <FiEdit3 className='text-lg' />
                              Edit
                            </Button>
                            <Button
                              onClick={() =>
                                showDeleteConfirm(serviceRecord.recordId)
                              }
                              className='flex gap-2 items-center'
                              danger
                            >
                              <RiDeleteBinLine className='text-lg' />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className='flex w-full justify-center items-center'>
                <Empty
                  image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
                  description={<span>No service records yet...</span>}
                ></Empty>
              </div>
            )}
            <div
              className={
                seaServiceUpdated
                  ? 'flex w-full justify-between'
                  : 'flex w-full justify-end'
              }
            >
              {seaServiceUpdated && (
                <div className='flex flex-row items-center text-sm gap-1  px-2.5'>
                  <p>Updated:</p>
                  <p>{moment(seaServiceUpdated).format('DD.MM.YYYY')}</p>
                </div>
              )}
              <Button
                className='w-32'
                onClick={openForm}
                type='primary flex items-center gap-2 w-fit'
              >
                <CgPlayListAdd className='text-2xl mt-1' /> Add record
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SeamanSeaService;
