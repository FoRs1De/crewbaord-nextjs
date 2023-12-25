'use client';
import countryList from '../assets/countries';
import { BsPassport } from 'react-icons/bs';
import { LuFileEdit } from 'react-icons/lu';
import { TiInputChecked } from 'react-icons/ti';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Form, Select, Input } from 'antd';

const SeamanDocuments = () => {
  const { confirm } = Modal;
  const { Option } = Select;
  const [semansBookForm] = Form.useForm();
  const [submitForm, setSubmitForm] = useState(false);
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const res = await axios.get('/api/profile/main/seaman/get-documents');
      setDocuments(res.data);
    };
    getUserData();
  }, [submitForm]);

  const editSeamansBook = (id) => {
    confirm({
      title: `Edit Seaman's book data`,
      icon: <LuFileEdit className='text-lg mt-1 mr-2' />,
      content: (
        <Form name='semansBook' form={semansBookForm} layout='vertical'>
          <div className='flex gap-5'>
            <Form.Item className='w-1/2' name='Country' label='Issue country'>
              <Select allowClear placeholder='Select country' showSearch>
                {countryList.map((country, index) => (
                  <Option key={index} value={country}>
                    {country}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item required className='w-1/2' name='number' label='Number'>
              <Input className='w-full' />
            </Form.Item>
          </div>
        </Form>
      ),
      okText: 'Submit',
      okType: 'primary',
      cancelText: 'Cancel',
      centered: true,
      maskClosable: true,
      onOk() {
        const sendData = async () => {
          const formData = await semansBookForm.validateFields();
          console.log(formData);
        };

        sendData();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <>
      {documents && (
        <div className='flex gap-5 flex-col   bg-white shadow-lg rounded-lg p-4 mt-4'>
          <h4 className='flex items-center gap-2'>
            <BsPassport />
            Documents
          </h4>

          <div>
            <div
              onClick={editSeamansBook}
              className='flex items-center gap-1 hover:cursor-pointer select-none'
            >
              {documents.seamansBook.number ? (
                <TiInputChecked className='text-2xl text-green-600' />
              ) : (
                <LuFileEdit className='text-gray-400 text-md ml-1 mr-1 ' />
              )}
              <p
                className={
                  !documents.seamansBook.number
                    ? 'text-gray-400  w-40 hover:text-blue-600'
                    : ' w-40 hover:text-blue-600'
                }
              >
                {`Seaman's Book`}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SeamanDocuments;
