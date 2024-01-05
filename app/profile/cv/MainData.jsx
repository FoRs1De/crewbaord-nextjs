'use client';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

const MainData = ({ mainData }) => {
  return (
    <div className="flex flex-col  gap-2   bg-white shadow-lg rounded-lg p-4 mt-4'">
      <div className='flex flex-col lg:flex-row gap-4'>
        <div as='image' className='w-full lg:w-fit  flex justify-center '>
          <div className='flex flex-col'>
            <div className='w-52'>
              <Image
                width={210}
                height={210}
                className='cursor-pointer'
                src={mainData.avatar}
                alt='avatar'
                priority
              />
            </div>
          </div>
        </div>
        <div className='flex-grow'>
          <div className='flex gap-2 '>
            <h3>{mainData.name}</h3>
            <h3> {mainData.lastName}</h3>
          </div>
          <hr className='my-5' />
          <div className='flex flex-col lg:flex-row gap-2 lg:gap-36 '>
            <div className=' flex flex-col gap-2'>
              <div className='flex'>
                <p className='w-36'>Rank:</p>{' '}
                <p className='whitespace-nowrap'>{mainData.rank}</p>
              </div>

              <div className='flex'>
                <p className='w-36'>Desired Wage:</p>{' '}
                <p>
                  {mainData.desiredWage.amount}
                  {mainData.desiredWage.currency}
                  {'  '}/ {mainData.desiredWage.period}
                </p>
              </div>
              <div className='flex'>
                <p className='w-36'>Eployment status:</p>{' '}
                <p>{mainData.employmentStatus}</p>
              </div>
              <div className='flex'>
                <p className='w-36'>Date of birth:</p>{' '}
                <p>
                  {mainData.dateOfBirth &&
                    moment(mainData.dateOfBirth).format('DD.MM.YYYY')}
                </p>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='flex'>
                <p className='w-36'>Cityzenship:</p>{' '}
                <p>{mainData.cityzenship}</p>
              </div>
              <div className='flex'>
                <p className='w-36'>Residence:</p> <p>{mainData.residence}</p>
              </div>
              <div className='flex'>
                <p className='w-36'>Email:</p>{' '}
                <Link
                  className='text-sky-500 hover:text-sky-600 font-semibold'
                  href={`mailto:${mainData.email}`}
                >
                  {mainData.email}
                </Link>
              </div>
              <div className='flex'>
                <p className='w-36'>Phone:</p>{' '}
                <Link
                  className='text-sky-500 hover:text-sky-600 font-semibold'
                  href={`tel:${mainData.phone}`}
                >
                  {mainData.phone}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-2 '>
        <p className='font-semibold'>Additional information:</p>
        <p className='text-gray-400'>{mainData.aboutMe}</p>{' '}
      </div>
    </div>
  );
};

export default MainData;
