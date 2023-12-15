'use client';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Badge } from 'antd';
import { Select } from 'antd';

const SemanContent = () => {
  const sessionStatus = useSelector((state) => state.authReducer);
  const handleStatusChange = async (value) => {
    if (sessionStatus) {
      const dataToSend = { userId: sessionStatus.id, employmentStatus: value };
      await axios.post(
        '/api/profile/main/seaman-employment-status',
        dataToSend
      );
    }
  };

  return (
    <>
      {sessionStatus && (
        <div className='  w-full md:w-fit md:flex-grow flex flex-col '>
          <div className='bg-white shadow-lg rounded-lg p-4'>
            <Select
              className='w-48'
              defaultValue={sessionStatus.employmentStatus}
              onChange={handleStatusChange}
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
                  label: <Badge color='lightGray' text='No longer working' />,
                },
              ]}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SemanContent;
