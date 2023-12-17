'use client';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, DatePicker, InputNumber } from 'antd';
import { Select } from 'antd';
import { setUpdateTrigger } from '../redux/actions/updateTrigger';
import moment from 'moment';
import dayjs from 'dayjs';
import ranksSelect from '../assets/ranksSelect';
import { BsInfoCircle } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const SemanContent = () => {
  const { Option } = Select;
  const [showUpdateStatus, setShowUpdateStatus] = useState(false);
  const [amountValue, setAmountValue] = useState(null);
  const sessionStatus = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const updateTrigger = useSelector((state) => state.updateTriggerReducer);

  useEffect(() => {
    if (sessionStatus) {
      setAmountValue(sessionStatus.desiredWage.amount);
      console.log(sessionStatus.desiredWage.amount);
    }
  }, [sessionStatus]);

  const handleStatusChange = async (value) => {
    if (sessionStatus) {
      const dataToSend = { userId: sessionStatus.id, employmentStatus: value };
      await axios.post(
        '/api/profile/main/seaman-employment-status',
        dataToSend
      );
      dispatch(setUpdateTrigger(!updateTrigger));
    }
  };

  const handleUntil = async (date) => {
    console.log(date);
    const dataToSend = {
      employmentStatusUntil: date,
      userId: sessionStatus.id,
    };
    console.log(dataToSend);
    await axios.post('/api/profile/main/until', dataToSend);
    dispatch(setUpdateTrigger(!updateTrigger));
  };

  const handleRankChange = async (value) => {
    const dataToSend = { userId: sessionStatus.id, rank: value };
    await axios.post('/api/profile/main/rank', dataToSend);
    dispatch(setUpdateTrigger(!updateTrigger));
  };

  //debounced input
  const handleAmountChange = (value) => debounced(value);
  const debounced = useDebouncedCallback(async (value) => {
    setAmountValue(value);
    const dataToSend = { userId: sessionStatus.id, desiredWageAmount: value };
    await axios.post('/api/profile/main/desired-wage/amount', dataToSend);

    setShowUpdateStatus(true);
    setTimeout(() => {
      setShowUpdateStatus(false);
    }, 1000);
  }, 1000);
  //---------------------------------------------

  const handleCurrencyChange = async (value) => {
    const dataToSend = { userId: sessionStatus.id, desiredWageCurrency: value };
    await axios.post('/api/profile/main/desired-wage/currency', dataToSend);
    dispatch(setUpdateTrigger(!updateTrigger));
  };

  const handlePeriodChange = async (value) => {
    const dataToSend = { userId: sessionStatus.id, desiredWagePeriod: value };
    await axios.post('/api/profile/main/desired-wage/period', dataToSend);
    dispatch(setUpdateTrigger(!updateTrigger));
  };

  const disabledDate = (current) => {
    return current && current <= moment();
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

  return (
    <>
      {sessionStatus && (
        <div className='  w-full md:w-fit md:flex-grow flex flex-col '>
          <div className='flex gap-5 flex-col lg:flex-row flex-wrap  bg-white shadow-lg rounded-lg p-4'>
            <div className='flex gap-5 flex-row'>
              <div className='flex flex-grow flex-col gap-3'>
                <h4>Status</h4>
                <Select
                  className='w-full lg:w-48'
                  onChange={handleStatusChange}
                  defaultValue={sessionStatus.employmentStatus}
                  options={[
                    {
                      value: 'empty',
                      label: (
                        <div className='flex items-center gap-2'>
                          <input type='radio' checked={false} readOnly />
                          <p>Empty status</p>
                        </div>
                      ),
                    },
                    {
                      value: 'Looking for a job',
                      label: <Badge color='green' text='Looking for a job' />,
                    },
                    {
                      value: 'On board',
                      label: <Badge color='#38BDF9' text='On board' />,
                    },
                    {
                      value: 'On vacation',
                      label: <Badge color='orange' text='On vacation' />,
                    },
                    {
                      value: 'No longer working',
                      label: (
                        <Badge color='lightGray' text='No longer working' />
                      ),
                    },
                  ]}
                />
              </div>
              {sessionStatus.employmentStatus === 'On board' ||
              sessionStatus.employmentStatus === 'On vacation' ? (
                <div className='flex flex-col gap-3 '>
                  <h4>Until</h4>
                  <DatePicker
                    className='w-26 lg:w-48'
                    placeholder='dd.mm.yyyy'
                    onChange={handleUntil}
                    defaultValue={
                      sessionStatus.employmentStatusUntil
                        ? dayjs(sessionStatus.employmentStatusUntil)
                        : undefined
                    }
                    disabledDate={disabledDate}
                    format='DD.MM.YYYY'
                  />
                </div>
              ) : null}
            </div>
            <div className='flex flex-col gap-5 lg:flex-row flex-wrap'>
              <div className='flex flex-col gap-3'>
                <h4 className='flex gap-1'>
                  Position{' '}
                  <div
                    className='tooltip'
                    data-tip='Your current or desired position'
                  >
                    <BsInfoCircle className='text-lg' />
                  </div>
                </h4>
                <Select
                  placeholder='Select rank'
                  className='w-full lg:w-52'
                  options={transformedRanksArray}
                  defaultValue={sessionStatus.rank}
                  onChange={handleRankChange}
                  showSearch
                ></Select>
              </div>
              <div className='flex flex-col gap-3'>
                <h4 className='flex gap-1'>
                  Desired Wage
                  <div
                    className='tooltip'
                    data-tip='Expected wage for your next job'
                  >
                    <BsInfoCircle className='text-lg' />
                  </div>
                </h4>
                <div className='flex items-center'>
                  <InputNumber
                    onChange={handleAmountChange}
                    className='rounded-r-none w-full lg:w-24'
                    value={amountValue}
                    suffix={
                      showUpdateStatus && (
                        <Badge className='update-status' color='green' />
                      )
                    }
                    controls={false}
                  />
                  <Select
                    onChange={handleCurrencyChange}
                    className='currency-select '
                    defaultValue={sessionStatus.desiredWage.currency}
                  >
                    <Option value='$'>$</Option>
                    <Option value='€'>€</Option>
                  </Select>
                  <Select
                    onChange={handlePeriodChange}
                    className='period-select w-24'
                    defaultValue={sessionStatus.desiredWage.period}
                  >
                    <Option value='month'>month</Option>
                    <Option value='day'>day</Option>
                    <Option value='year'>year</Option>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SemanContent;
