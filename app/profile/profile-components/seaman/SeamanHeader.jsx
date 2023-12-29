'use client';
import { CgProfile } from 'react-icons/cg';
import { CgFileDocument } from 'react-icons/cg';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { RxGear } from 'react-icons/rx';

const SeamanHeader = () => {
  const pathname = usePathname();
  return (
    <header>
      <nav className='flex justify-center items-center bg-gray-200 h-14'>
        <ul className='flex gap-10  container px-2 h-10'>
          <li
            className={
              pathname == '/profile'
                ? 'flex items-center border-b-2 border-black '
                : 'flex items-center bg-gray-200'
            }
          >
            <Link href='/profile' className='flex gap-2 items-center'>
              <CgProfile className='text-xl' />
              <p>Profile</p>
            </Link>
          </li>
          <li
            className={
              pathname == '/profile/cv'
                ? 'flex items-center border-b-2 border-black'
                : 'flex items-center bg-gray-200'
            }
          >
            <Link href='/profile/cv' className='flex gap-2 items-center'>
              <CgFileDocument className='text-xl' />
              <p>My CV</p>
            </Link>
          </li>
          <li
            className={
              pathname == '/profile/settings'
                ? 'flex items-center border-b-2 border-black'
                : 'flex items-center bg-gray-200'
            }
          >
            <Link href='/profile/settings' className='flex gap-2 items-center'>
              <RxGear className='text-xl' />
              <p>Settings</p>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default SeamanHeader;
