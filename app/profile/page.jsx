'use client';
import SeamanPersonalDetails from './profile-components/seaman/SeamanPersonalDetails';
import SeamanHeader from './profile-components/seaman/SeamanHeader';
import SeamanSeaService from './profile-components/seaman/SeamanSeaService';
import SeamanSideBar from './profile-components/seaman/SeamanSideBar';
import SeamanTopContent from './profile-components/seaman/SeamanTopContent';
import SeamanDocuments from './profile-components/seaman/SeamanDocuments';
import SeamanCertificates from './profile-components/seaman/SeamanCertificates';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [documents, setDocuments] = useState(null);
  const [seaService, setSeaService] = useState(null);
  const [seaServiceUpdated, setSeaServiceUpdated] = useState(false);
  const [personalDetails, setPersonalDetails] = useState(null);
  const [certificates, setCertificates] = useState(null);
  const [certificatesUpdated, setCertificatesUpdated] = useState(false);
  const [submitForm, setSubmitForm] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      const res = await axios.get('/api/profile/main/seaman/get-profile-data');
      setDocuments(res.data.documents);
      setSeaService(res.data.seaService);
      setSeaServiceUpdated(res.data.seaServiceUpdated);
      setPersonalDetails(res.data.personalDetails);
      setCertificates(res.data.certificates);
      setCertificatesUpdated(res.data.certificatesUpdated);
      setDataLoaded(true);
    };
    getUserData();
  }, [submitForm]);
  return (
    <>
      <SeamanHeader />

      <main className='flex flex-col md:flex-row mx-auto container flex-1 px-2 pt-5 gap-4 pb-10 '>
        {dataLoaded && (
          <>
            <SeamanSideBar />
            <div className='  w-full md:w-fit md:flex-grow flex flex-col '>
              <SeamanTopContent />

              <SeamanPersonalDetails
                setSubmitForm={setSubmitForm}
                personalDetails={personalDetails}
              />
              <SeamanDocuments
                setSubmitForm={setSubmitForm}
                documents={documents}
              />
              <SeamanCertificates
                certificates={certificates}
                certificatesUpdated={certificatesUpdated}
                setSubmitForm={setSubmitForm}
              />
              <SeamanSeaService
                setSubmitForm={setSubmitForm}
                seaServiceUpdated={seaServiceUpdated}
                seaService={seaService}
              />
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Profile;
