'use client';
import SeamanDocumentsSeamansBook from './seaman-documents/SeamanDocumentsSeamansBook';
import SeamanDocumentsTravelPassport from './seaman-documents/SeamanDocumentsTravelPassport';
import SeamanDocumentsCoC from './seaman-documents/SeamanDocumentsCoC';
import SeamanDocumentsEducation from './seaman-documents/SeamanDocumentsEducation';
import SeamanDocumentsYellowFever from './seaman-documents/SeamanDocumentsYellowFever';
import SeamanDocumentsUsVisaC1D from './seaman-documents/SeamanDocumentsUsVisaC1D';
import SeamanDocumentsUsVisaB1ocs from './seaman-documents/SeamanDocumentsUsVisaB1ocs';
import SeamanDocumentsSchengenVisa from './seaman-documents/SeamanDocumentsSchengenVisa';

import { BsPassport } from 'react-icons/bs';
import moment from 'moment';

const SeamanDocuments = ({ documents, setSubmitForm }) => {
  return (
    <>
      {documents && (
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
          {documents.updated && (
            <div className='flex flex-row items-center text-sm gap-1 w-fit  border-sky-500 border px-2.5 py-1.5 rounded-lg shadow-sm bg-sky-100'>
              <p> Updated: </p>
              <p> {moment(documents.updated).format('DD.MM.YYYY')}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SeamanDocuments;
