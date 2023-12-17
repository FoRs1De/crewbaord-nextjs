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
} from 'antd';
import { CgPlayListAdd } from 'react-icons/cg';
import { useState } from 'react';
import ranksSelect from '../assets/ranksSelect';
import shipTypes from '../assets/shipTypes';
import flagStates from '../assets/flagStates';
import moment from 'moment';

const SeamanSeaService = () => {
  const { Option } = Select;
  const [showForm, setShowForm] = useState(false);

  const openForm = () => {
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
  };
  const submitData = (value) => {
    console.log(value);
    setShowForm(false);
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
  return (
    <>
      <div className='flex gap-5 flex-col   bg-white shadow-lg rounded-lg p-4 mt-4'>
        <div className='flex justify-between w-full items-center'>
          <div className='flex items-center gap-2'>
            <LuShip className='text-xl' />
            <h4>Sea Service</h4>
          </div>
          <div>last update</div>
        </div>

        <Modal
          centered
          footer={false}
          title='Add service record'
          open={showForm}
          onCancel={closeForm}
        >
          <Form
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
          <div>Records</div>
          <Button
            onClick={openForm}
            type='primary flex items-center gap-2 w-fit'
          >
            <CgPlayListAdd className='text-2xl mt-1' /> Add record
          </Button>
        </div>
      </div>
    </>
  );
};

export default SeamanSeaService;
