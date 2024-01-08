'use client';
import SeamanHeader from '../profile-components/seaman/SeamanHeader';
import MainData from './MainData';
import Experience from './Experience';
import Documents from './Documents';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CV = () => {
  const [mainData, setMainData] = useState(null);
  const [seaService, setSeaService] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [certificates, setCertificates] = useState(null);
  const [education, setEducation] = useState(null);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  console.log(mainData);

  useEffect(() => {
    const getUserData = async () => {
      const res = await axios.get('/api/profile/my-cv/get-cv-data');
      setMainData(res.data.mainData);
      setSeaService(res.data.seaService);
      setDocuments(res.data.documents);
      setCertificates(res.data.certificates);
      setEducation(res.data.education);
      setPersonalInfo(res.data.personalInfo);
      setDataLoaded(true);
    };
    getUserData();
  }, []);
  return (
    <>
      <SeamanHeader />
      <main className='flex flex-col mx-auto container flex-1 px-2 pt-5 gap-4 pb-10 '>
        {dataLoaded && (
          <>
            <MainData mainData={mainData} />
            <Experience seaService={seaService} />
            <Documents documents={documents} />
          </>
        )}
      </main>
    </>
  );
};

export default CV;
