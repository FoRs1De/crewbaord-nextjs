'use client';
import SeamanDocumentsSeamansBook from './SeamanDocumentsSeamansBook';
import SeamanDocumentsTravelPassport from './SeamanDocumentsTravelPassport';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BsPassport } from 'react-icons/bs';

const SeamanDocuments = () => {
  const [documents, setDocuments] = useState(null);
  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      const res = await axios.get('/api/profile/main/seaman/get-documents');
      setDocuments(res.data);
    };
    getUserData();
  }, [submitForm]);

  return (
    <>
      <div className='flex gap-5 flex-col   bg-white shadow-lg rounded-lg p-4 mt-4'>
        <h4 className='flex items-center gap-2'>
          <BsPassport />
          Documents
        </h4>

        <SeamanDocumentsSeamansBook
          documents={documents}
          setSubmitForm={setSubmitForm}
        />
        <SeamanDocumentsTravelPassport
          documents={documents}
          setSubmitForm={setSubmitForm}
        />
      </div>
    </>
  );
};

export default SeamanDocuments;
