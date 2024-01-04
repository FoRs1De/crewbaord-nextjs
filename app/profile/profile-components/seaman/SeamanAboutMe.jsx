'use client';
import { TbFileDescription } from 'react-icons/tb';
import { Input, Form, Button, Empty } from 'antd';
import { TbPlaylistAdd } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from 'react';
import { LuFileEdit } from 'react-icons/lu';
import moment from 'moment';

const SeamanAboutMe = ({ setSubmitForm, aboutMe, aboutMeUpdated }) => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const sessionStatus = useSelector((state) => state.authReducer);
  const [showForm, setShowForm] = useState(false);

  const submitForm = async (values) => {
    const dataToSend = {
      userId: sessionStatus.id,
      aboutMe: values.aboutMe,
    };
    await axios.post('/api/profile/main/seaman/about-me', dataToSend);
    form.resetFields();
    setSubmitForm((prev) => !prev);
    setShowForm(false);
  };

  const editAboutMe = () => {
    form.setFieldsValue({ aboutMe: aboutMe });
    setShowForm(true);
  };

  return (
    <div className='flex gap-5 flex-col   bg-white shadow-lg rounded-lg p-4 mt-4'>
      <div>
        <h4 className='flex items-center gap-2'>
          <TbFileDescription /> About Me
        </h4>
      </div>
      <div>
        {showForm ? (
          <Form form={form} onFinish={submitForm}>
            <div className='flex items-center gap-2'>
              <p className='text-gray-400 mb-2'>
                Fill in the data about your professional skills and important
                personal qualities that will help you to get your desired
                position. Describe the projects which you have participated in
                or provide information about your achievements.
              </p>
            </div>
            <Form.Item name='aboutMe'>
              <TextArea className='h-32' showCount maxLength={1000} />
            </Form.Item>

            <div className='flex justify-end '>
              {showForm && (
                <Button
                  onClick={() => setShowForm(false)}
                  className='flex w-32 items-center justify-center gap-2 mt-2 mr-5'
                >
                  Cancel
                </Button>
              )}
              <Button
                type='primary'
                htmlType='submit'
                className='flex w-32 items-center justify-center gap-2 mt-2'
              >
                <TbPlaylistAdd className='text-2xl' /> Save Info
              </Button>
            </div>
          </Form>
        ) : (
          <>
            <div>
              {aboutMe ? (
                <>
                  <p>{aboutMe}</p>
                  <div className='flex justify-between items-center mt-3'>
                    <div>
                      <p className='text-sm  mt-2'>
                        Updated: {moment(aboutMeUpdated).format('DD.MM.YYYY')}
                      </p>
                    </div>
                    <Button
                      onClick={editAboutMe}
                      type='primary'
                      htmlType='submit'
                      className='flex w-32 items-center justify-center gap-2 mt-2'
                    >
                      <LuFileEdit className='text-lg' /> About Me
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Empty
                      description={
                        <div className='flex w-full justify-center'>
                          <p className='text-gray-400 sm:w-3/4  '>
                            Fill in the data about your professional skills and
                            important personal qualities that will help you to
                            get your desired position. Describe the projects
                            which you have participated in or provide
                            information about your achievements.
                          </p>
                        </div>
                      }
                    />
                  </div>
                  <div className='flex justify-end mt-3'>
                    <Button
                      onClick={editAboutMe}
                      type='primary'
                      htmlType='submit'
                      className='flex w-32 items-center justify-center gap-2 mt-2'
                    >
                      <LuFileEdit className='text-lg' /> About Me
                    </Button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SeamanAboutMe;
