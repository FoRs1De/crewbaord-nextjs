'use client';
import SeamanDocumentsSeamansBook from './SeamanDocumentsSeamansBook';
import SeamanDocumentsTravelPassport from './SeamanDocumentsTravelPassport';
import SeamanDocumentsCoC from './SeamanDocumentsCoC';
import SeamanDocumentsEducation from './SeamanDocumentsEducation';
import SeamanDocumentsYellowFever from './SeamanDocumentsYellowFever';
import SeamanDocumentsUsVisaC1D from './SeamanDocumentsUsVisaC1D';
import SeamanDocumentsUsVisaB1ocs from './SeamanDocumentsUsVisaB1ocs';
import SeamanDocumentsSchengenVisa from './SeamanDocumentsSchengenVisa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BsPassport } from 'react-icons/bs';
import moment from 'moment';

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
        <div className='flex flex-col gap-2 sm:justify-center sm:flex-row flex-wrap'>
          <div className='flex flex-col gap-2 md:flex-row'>
            <div className='flex flex-col gap-2'>
              <SeamanDocumentsSeamansBook
                documents={documents}
                setSubmitForm={setSubmitForm}
              />
              <SeamanDocumentsTravelPassport
                documents={documents}
                setSubmitForm={setSubmitForm}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <SeamanDocumentsCoC
                documents={documents}
                setSubmitForm={setSubmitForm}
              />
              <SeamanDocumentsEducation
                documents={documents}
                setSubmitForm={setSubmitForm}
              />
            </div>
          </div>
          <div className='flex flex-col gap-2 md:flex-row'>
            <div className='flex flex-col gap-2'>
              <SeamanDocumentsYellowFever
                documents={documents}
                setSubmitForm={setSubmitForm}
              />
              <SeamanDocumentsUsVisaC1D
                documents={documents}
                setSubmitForm={setSubmitForm}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <SeamanDocumentsUsVisaB1ocs
                documents={documents}
                setSubmitForm={setSubmitForm}
              />
              <SeamanDocumentsSchengenVisa
                documents={documents}
                setSubmitForm={setSubmitForm}
              />
            </div>
          </div>
        </div>
        {documents && documents.updated && (
          <div className='flex flex-row items-center text-sm gap-1 w-fit  border-sky-500 border px-2.5 py-1.5 rounded-lg shadow-sm bg-sky-100'>
            <p> Updated: </p>
            <p> {moment(documents.updated).format('DD.MM.YYYY')}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SeamanDocuments;
