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
import { useState } from 'react';
import ranksSelect from '../assets/ranksSelect';
import shipTypes from '../assets/shipTypes';
import flagStates from '../assets/flagStates';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdateTrigger } from '../redux/actions/updateTrigger';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiEdit3 } from 'react-icons/fi';

const SeamanSeaService = () => {
  const [form] = Form.useForm();
  const { confirm } = Modal;
  const { Option } = Select;
  const [showForm, setShowForm] = useState(false);
  const sessionStatus = useSelector((state) => state.authReducer);
  const updateTrigger = useSelector((state) => state.updateTriggerReducer);
  const dispatch = useDispatch();

  const openForm = () => {
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
  };
  const submitData = async (value) => {
    console.log(value);
    const dataToSend = { ...value, userId: sessionStatus.id, recordId: uuid() };
    try {
      await axios.post('/api/profile/main/seaman/add-sea-service', dataToSend);
      dispatch(setUpdateTrigger(!updateTrigger));
      form.resetFields();
      setShowForm(false);
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
          dispatch(setUpdateTrigger(!updateTrigger));
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
      {sessionStatus && (
        <div className='flex gap-5 flex-col   bg-white shadow-lg rounded-lg p-4 mt-4'>
          <div className='flex justify-between w-full items-center'>
            <div className='flex items-center gap-2 '>
              <LuShip className='text-xl' />
              <h4>Sea Service</h4>
            </div>
            {sessionStatus.seaServiceUpdated && (
              <div className='flex flex-col items-center text-sm bg-sky-400 px-2.5 py-0.5 rounded-lg text-white'>
                <p>Last update</p>
                <p>
                  {moment(sessionStatus.seaServiceUpdated).format('DD.MM.YYYY')}
                </p>
              </div>
            )}
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
              initialValues={
                {
                  //   position: serviceRecordData.position,
                  //   vesselName: serviceRecordData.vesselName,
                  //   vesselType: serviceRecordData.vesselType,
                  //   vesselFlag: serviceRecordData.vesselFlag,
                  //   vesselDWT: serviceRecordData.vesselDWT,
                  //   vesselYearBuilt: serviceRecordData.vesselYearBuilt,
                  //   mainEngineType: serviceRecordData.mainEngineType,
                  //   mainEngineKw: serviceRecordData.mainEngineKw,
                  //   shipOwner: serviceRecordData.shipOwner,
                  //   crewing: serviceRecordData.crewing,
                  //   signOnDate: jsDateSignOn,
                  //   signOffDate: jsDateSignOff,
                }
              }
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
            {sessionStatus.seaService.length > 0 ? (
              <div>
                {sessionStatus.seaService.map((serviceRecord) => {
                  return (
                    <div
                      key={serviceRecord.recordId}
                      className='collapse collapse-arrow border-2 border-gray-200 mb-2 '
                    >
                      <input type='checkbox' name='my-accordion-4' />
                      <div className='collapse-title flex justify-between items-center'>
                        <div>
                          <h4>{serviceRecord.position}</h4>
                          <div className='flex items-end gap-1'>
                            <p>
                              <strong>{serviceRecord.vesselName}</strong> from{' '}
                              <strong>
                                {moment(serviceRecord.signOnDate).format(
                                  'DD.MM.YYYY'
                                )}
                              </strong>{' '}
                              to{' '}
                              <strong>
                                {moment(serviceRecord.signOffDate).format(
                                  'DD.MM.YYYY'
                                )}
                              </strong>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='collapse-content'>
                        <hr />
                        <div className='mt-4'>
                          <div className='flex flex-wrap '>
                            <div className='flex flex-col w-64  lg:w-72 xl:w-96'>
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
                              <div className='flex pb-2'>
                                <p className='w-36'>Ship owner:</p>
                                <p>{serviceRecord.shipOwner}</p>
                              </div>
                            </div>
                            <div className='flex flex-col md:w-72 lg:w-72 xl:w-96'>
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
                                <p className='w-36'>Crewing agency:</p>
                                <p>{serviceRecord.crewing}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='flex justify-end gap-5 mt-5'>
                          <Button className='flex gap-2 items-center'>
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
            <Button
              onClick={openForm}
              type='primary flex items-center gap-2 w-fit'
            >
              <CgPlayListAdd className='text-2xl mt-1' /> Add record
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default SeamanSeaService;
