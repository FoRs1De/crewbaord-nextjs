'use client';
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Progress,
} from 'antd';
import { BsPersonCheck } from 'react-icons/bs';
import { LuFileEdit } from 'react-icons/lu';
import { TiInputChecked } from 'react-icons/ti';
import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import countryList from '@/app/assets/countries';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdateTrigger } from '../../../redux/actions/updateTrigger';

const SeamanPersonalDetails = ({ personalDetails, setSubmitForm }) => {
  const { Option } = Select;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [personalDetailsArray, setPersonalDetailsArray] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [form] = Form.useForm();
  const sessionStatus = useSelector((state) => state.authReducer);
  const updateTrigger = useSelector((state) => state.updateTriggerReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserData = async () => {
      setPersonalDetailsArray(
        Object.values(personalDetails).filter(
          (value) => value !== null && value !== ''
        )
      );
    };
    getUserData();
  }, [personalDetails]);

  useEffect(() => {
    const calculatePercentage = () => {
      const maxArrayLength = 16;
      const arrayLength = personalDetailsArray.length - 1;
      const percentage = (arrayLength / maxArrayLength) * 100;
      setPercentage(percentage.toFixed(0));
    };
    calculatePercentage();
  }, [personalDetailsArray]);

  const showModal = () => {
    form.setFieldsValue({
      name: personalDetails.name,
      lastName: personalDetails.lastName,
      dateOfBirth: personalDetails.dateOfBirth
        ? dayjs(personalDetails.dateOfBirth)
        : undefined,
      cityzenship: personalDetails.cityzenship,
      residence: personalDetails.residence,
      city: personalDetails.city,
      address: personalDetails.address,
      phone: personalDetails.phone,
      airport: personalDetails.airport,
      englishLevel: personalDetails.englishLevel,
      height: personalDetails.height,
      weight: personalDetails.weight,
      sizeShoe: personalDetails.sizeShoe,
      sizeOverall: personalDetails.sizeOverall,
      colorHair: personalDetails.colorHair,
      colorEye: personalDetails.colorEye,
    });
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const data = form.getFieldsValue();
    const dataToSend = { userId: sessionStatus.id, ...data };

    await axios.put(
      '/api/profile/main/seaman/edit-personal-details',
      dataToSend
    );
    setSubmitForm((prev) => !prev);
    setIsModalOpen(false);
    dispatch(setUpdateTrigger(!updateTrigger));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const disabledDate = (current) => {
    const seventeenYearsAgo = moment().subtract(17, 'years');

    return (
      (current && current > moment().startOf('day')) ||
      current > seventeenYearsAgo
    );
  };

  return (
    <>
      {personalDetails && (
        <div className='flex gap-5 flex-col   bg-white shadow-lg rounded-lg p-4 mt-4'>
          <div className='flex justify-between items-center'>
            <h4 className='flex items-center gap-2'>
              <BsPersonCheck className='text-2xl' />
              Personal Details
            </h4>
            <Progress className='w-24 sm:w-40 pt-1' percent={percentage} />
          </div>
          <div className='flex flex-col gap-2 sm:justify-center sm:flex-row flex-wrap'>
            <div className='flex flex-col gap-2 md:flex-row'>
              {/* 1st column*/}
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-1 '>
                  {personalDetails.name ? (
                    <TiInputChecked className='text-2xl text-green-600' />
                  ) : (
                    <LuFileEdit className='text-gray-400 text-md ml-1 mr-1' />
                  )}
                  <p
                    className={
                      !personalDetails.name ? 'text-gray-400 w-40 ' : ' w-40'
                    }
                  >
                    First Name
                  </p>
                </div>
                <div className='flex items-center gap-1'>
                  {personalDetails.lastName ? (
                    <TiInputChecked className='text-2xl text-green-600' />
                  ) : (
                    <LuFileEdit className='text-gray-400 text-md ml-1 mr-1' />
                  )}
                  <p
                    className={
                      !personalDetails.lastName
                        ? 'text-gray-400  w-40 '
                        : ' w-40 '
                    }
                  >
                    Last Name
                  </p>
                </div>
                <div className='flex items-center gap-1'>
                  {personalDetails.dateOfBirth ? (
                    <TiInputChecked className='text-2xl text-green-600' />
                  ) : (
                    <LuFileEdit className='text-gray-400 text-md ml-1 mr-1' />
                  )}
                  <p
                    className={
                      !personalDetails.dateOfBirth
                        ? 'text-gray-400 w-40'
                        : 'w-40'
                    }
                  >
                    Date of Birth
                  </p>
                </div>
                <div className='flex items-center gap-1'>
                  {personalDetails.cityzenship ? (
                    <TiInputChecked className='text-2xl text-green-600' />
                  ) : (
                    <LuFileEdit className='text-gray-400 text-md ml-1 mr-1' />
                  )}
                  <p
                    className={
                      !personalDetails.cityzenship
                        ? 'text-gray-400 w-40'
                        : 'w-40'
                    }
                  >
                    Cityzenship
                  </p>
                </div>
              </div>
              {/* 2nd column*/}
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-1'>
                  {personalDetails.residence ? (
                    <TiInputChecked className='text-2xl text-green-600' />
                  ) : (
                    <LuFileEdit className='text-gray-400 text-md ml-1 mr-1' />
                  )}
                  <p
                    className={
                      !personalDetails.residence
                        ? 'text-gray-400  w-40'
                        : 'w-40'
                    }
                  >
                    Country of Residence
                  </p>
                </div>
                <div className='flex items-center gap-1'>
                  {personalDetails.city ? (
                    <TiInputChecked className='text-2xl text-green-600' />
                  ) : (
                    <LuFileEdit className='text-gray-400 text-md ml-1 mr-1' />
                  )}
                  <p
                    className={
                      !personalDetails.city ? 'text-gray-400 w-40' : 'w-40'
                    }
                  >
                    City
                  </p>
                </div>
                <div className='flex items-center gap-1'>
                  {personalDetails.address ? (
                    <TiInputChecked className='text-2xl text-green-600' />
                  ) : (
                    <LuFileEdit className='text-gray-400 text-md ml-1 mr-1' />
                  )}
                  <p
                    className={
                      !personalDetails.address
                        ? 'text-gray-400 '
                        : 'w-fit pr-2 '
                    }
                  >
                    Address
                  </p>
                </div>
                <div className='flex items-center gap-1'>
                  {personalDetails.phone ? (
                    <TiInputChecked className='text-2xl text-green-600' />
                  ) : (
                    <LuFileEdit className='text-gray-400 text-md ml-1 mr-1' />
                  )}
                  <p
                    className={
                      !personalDetails.phone ? 'text-gray-400 w-40' : 'w-40'
                    }
                  >
                    Phone Number
                  </p>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2 md:flex-row'>
              {/* 3rd column*/}
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-1'>
                  {personalDetails.airport ? (
                    <TiInputChecked className='text-2xl text-green-600' />
                  ) : (
                    <LuFileEdit className='text-gray-400 text-md ml-1 mr-1' />
                  )}
                  <p
                    className={
                      !personalDetails.airport ? 'text-gray-400 w-40' : 'w-40'
                    }
                  >
                    Closest Airport
                  </p>
                </div>
                <div className='flex items-center gap-1'>
                  {personalDetails.englishLevel ? (
                    <TiInputChecked className='text-2xl text-green-600' />
                  ) : (
                    <LuFileEdit className='text-gray-400 text-md ml-1 mr-1' />
                  )}
                  <p
                    className={
                      !personalDetails.englishLevel
                        ? 'text-gray-400 w-40'
                        : 'w-40'
                    }
                  >
                    Level of English
                  </p>
                </div>
                <div className='flex items-center gap-1'>
                  {personalDetails.height ? (
                    <TiInputChecked className='text-2xl text-green-600' />
                  ) : (
                    <LuFileEdit className='text-gray-400 text-md ml-1 mr-1' />
                  )}
                  <p
                    className={
                      !personalDetails.height ? 'text-gray-400 w-40' : 'w-40'
                    }
                  >
                    Height
                  </p>
                </div>
                <div className='flex items-center gap-1'>
                  {personalDetails.weight ? (
                    <TiInputChecked className='text-2xl text-green-600' />
                  ) : (
                    <LuFileEdit className='text-gray-400 text-md ml-1 mr-1' />
                  )}
                  <p
                    className={
                      !personalDetails.weight ? 'text-gray-400 w-40' : 'w-40'
                    }
                  >
                    Weight
                  </p>
                </div>
              </div>
              {/* 4th column*/}
              <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-1'>
                  {personalDetails.colorHair ? (
                    <TiInputChecked className='text-2xl text-green-600' />
                  ) : (
                    <LuFileEdit className='text-gray-400 text-md ml-1 mr-1' />
                  )}
                  <p
                    className={
                      !personalDetails.colorHair ? 'text-gray-400 w-40' : 'w-40'
                    }
                  >
                    Hair Color
                  </p>
                </div>
                <div className='flex items-center gap-1'>
                  {personalDetails.colorEye ? (
                    <TiInputChecked className='text-2xl text-green-600' />
                  ) : (
                    <LuFileEdit className='text-gray-400 text-md ml-1 mr-1' />
                  )}
                  <p
                    className={
                      !personalDetails.colorEye ? 'text-gray-400 w-40' : 'w-40'
                    }
                  >
                    Eye Color
                  </p>
                </div>
                <div className='flex items-center gap-1'>
                  {personalDetails.sizeShoe ? (
                    <TiInputChecked className='text-2xl text-green-600' />
                  ) : (
                    <LuFileEdit className='text-gray-400 text-md ml-1 mr-1' />
                  )}
                  <p
                    className={
                      !personalDetails.sizeShoe ? 'text-gray-400 w-40' : 'w-40'
                    }
                  >
                    Shoe Size
                  </p>
                </div>
                <div className='flex items-center gap-1'>
                  {personalDetails.sizeOverall ? (
                    <TiInputChecked className='text-2xl text-green-600' />
                  ) : (
                    <LuFileEdit className='text-gray-400 text-md ml-1 mr-1' />
                  )}
                  <p
                    className={
                      !personalDetails.sizeOverall
                        ? 'text-gray-400 w-40'
                        : 'w-40'
                    }
                  >
                    Overall Size
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              personalDetails.personalDetailsUpdated
                ? 'w-full flex justify-between items-center'
                : 'w-full flex justify-end items-center '
            }
          >
            {personalDetails.personalDetailsUpdated && (
              <div className='flex flex-row items-center text-sm gap-1  border-sky-500 border px-2.5 py-1.5 rounded-lg shadow-sm bg-sky-100'>
                <p> Updated: </p>
                <p>
                  {' '}
                  {moment(personalDetails.personalDetailsUpdated).format(
                    'DD.MM.YYYY'
                  )}
                </p>
              </div>
            )}
            <Button
              onClick={showModal}
              className='flex items-center gap-2 w-32'
              type='primary'
            >
              <LuFileEdit className='text-lg' /> Edit details
            </Button>
          </div>
          <Modal
            title='Personal Details'
            centered
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form className='mt-5' form={form} layout='vertical'>
              <div className='flex gap-5'>
                <Form.Item className='w-1/2' name='name' label='First Name'>
                  <Input />
                </Form.Item>
                <Form.Item className='w-1/2' name='lastName' label='Last Name'>
                  <Input />
                </Form.Item>
              </div>
              <div className='flex gap-5'>
                <Form.Item
                  className='w-1/2'
                  name='dateOfBirth'
                  label='Date Of Birth'
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
                  className='w-1/2'
                  name='cityzenship'
                  label='Cityzenship'
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
                  name='residence'
                  label='Country of residence'
                >
                  <Select allowClear placeholder='Select country' showSearch>
                    {countryList.map((country, index) => (
                      <Option key={index} value={country}>
                        {country}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item className='w-1/2' name='city' label='City'>
                  <Input placeholder='City of residence' />
                </Form.Item>
              </div>
              <div className='flex gap-5'>
                <Form.Item className='w-1/2' name='address' label='Address'>
                  <Input placeholder='Street ##,  zip-code' />
                </Form.Item>
                <Form.Item className='w-1/2' name='phone' label='Phone Number'>
                  <Input placeholder='+38' />
                </Form.Item>
              </div>
              <div className='flex gap-5'>
                <Form.Item
                  className='w-1/2'
                  name='airport'
                  label='Closest Airport'
                >
                  <Input placeholder='Name or City' />
                </Form.Item>
                <Form.Item
                  className='w-1/2'
                  name='englishLevel'
                  label='Level of English'
                >
                  <Select allowClear placeholder='Select level'>
                    <Option value='Beginner'>Beginner</Option>
                    <Option value='Elementary'>Elementary</Option>
                    <Option value='Intermediate'>Intermediate</Option>
                    <Option value='Upper Intermediate'>
                      Upper Intermediate
                    </Option>
                    <Option value='Advanced'>Advanced</Option>
                    <Option value='Proficient'>Proficient</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className='flex gap-5'>
                <Form.Item className='w-1/2' name='height' label='Height, cm'>
                  <InputNumber className='w-full' placeholder='0' />
                </Form.Item>
                <Form.Item className='w-1/2' name='weight' label='Weight, kg'>
                  <InputNumber className='w-full' placeholder='0' />
                </Form.Item>
              </div>
              <div className='flex gap-5'>
                <Form.Item className='w-1/2' name='sizeShoe' label='Shoe Size'>
                  <InputNumber className='w-full' placeholder='0' />
                </Form.Item>
                <Form.Item
                  className='w-1/2'
                  name='sizeOverall'
                  label='Overall Size'
                >
                  <InputNumber className='w-full' placeholder='0' />
                </Form.Item>
              </div>
              <div className='flex gap-5'>
                <Form.Item
                  className='w-1/2'
                  name='colorHair'
                  label='Hair Color'
                >
                  <Select allowClear placeholder='Select color'>
                    <Option value='Blond'>Blond</Option>
                    <Option value='Black'>Black</Option>
                    <Option value='Brown'>Brown</Option>
                    <Option value='Ginger'>Ginger</Option>
                    <Option value='Gray'>Gray</Option>
                    <Option value='Bald'>Bald</Option>
                  </Select>
                </Form.Item>
                <Form.Item className='w-1/2' name='colorEye' label='Eye Color'>
                  <Select allowClear placeholder='Select color'>
                    <Option value='Blue'>Blue</Option>
                    <Option value='Gray'>Gray</Option>
                    <Option value='Brown'>Brown</Option>
                    <Option value='Green'>Green</Option>
                  </Select>
                </Form.Item>
              </div>
            </Form>
          </Modal>
        </div>
      )}
    </>
  );
};

export default SeamanPersonalDetails;
