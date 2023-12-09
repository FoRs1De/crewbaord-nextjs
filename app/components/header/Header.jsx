'use client';
import './header.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiShip2Line } from 'react-icons/ri';
import { MdOutlineHomeWork } from 'react-icons/md';
import { FaPeopleGroup } from 'react-icons/fa6';
import { BsPersonFillAdd } from 'react-icons/bs';
import { TbLogin2 } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import headerlogo from '../../../public/images/HeaderLogo.png';
import Image from 'next/image';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../redux/actions/auth';
import { Avatar, Badge, Dropdown } from 'antd';
import { TbLogout } from 'react-icons/tb';
import { VscAccount } from 'react-icons/vsc';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { RxGear } from 'react-icons/rx';
import moment from 'moment';
import { GoInfo } from 'react-icons/go';
import headerLogo from '../../../public/images/HeaderLogo.png';

const Header = () => {
  const pathname = usePathname();
  const [drawerChecked, setDrawerChecked] = useState(false);
  const dispatch = useDispatch();
  const sessionStatus = useSelector((state) => state.authReducer);
  const updateTrigger = useSelector((state) => state.updateTriggerReducer);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  let hiddenTill = null;
  if (sessionStatus && sessionStatus.hiddenTill) {
    hiddenTill =
      sessionStatus && moment(sessionStatus.hiddenTill).format('DD.MM.YYYY');
  }
  useEffect(() => {
    const authenticate = async () => {
      try {
        const res = await axios.get('/api/authenticate');
        console.log(res.data);
        if (res.data.message === 'Authenticated') {
          dispatch(setAuth(res.data));
          setLoading(false);
        }
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    authenticate();
  }, [dispatch, updateTrigger]);

  const logout = () => {
    axios.get('/api/logout');
    dispatch(setAuth(false));
    setDrawerChecked(false);
  };
  const closeDrawer = () => {
    setDrawerChecked(false);
    setDropdownVisible(false);
  };

  const handleInfo = () => {};

  const profileLink = '/profile';
  const cvLink = '/profile/cv';
  const settingsLink = '/profile/settings';
  const items = [
    {
      label: (
        <Link
          href={profileLink}
          className='flex items-center gap-2 '
          onClick={closeDrawer}
        >
          <VscAccount />
          <p className=' text-base '>Profile</p>
        </Link>
      ),
      key: '0',
    },
    {
      label: (
        <Link
          href={cvLink}
          className='flex items-center gap-2'
          onClick={closeDrawer}
        >
          <IoDocumentTextOutline />
          <p className=' text-base'>My CV</p>
        </Link>
      ),
      key: '1',
    },
    {
      label: (
        <Link
          href={settingsLink}
          className='flex items-center gap-2'
          onClick={closeDrawer}
        >
          <RxGear />
          <p className='text-base'>Settings</p>
        </Link>
      ),
      key: '3',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <Link
          href='/'
          onClick={logout}
          className='flex items-center gap-2 pl-0.5'
        >
          <TbLogout />
          Logout
        </Link>
      ),
      key: '4',
    },
  ];

  return (
    <>
      <header className='flex-col sticky  top-0 z-50 '>
        <div className='drawer '>
          <input
            id='my-drawer-3'
            type='checkbox'
            className='drawer-toggle'
            checked={drawerChecked}
            onChange={() => setDrawerChecked(!drawerChecked)}
          />
          <div className='drawer-content flex flex-col '>
            {/* Navbar */}
            <div className='w-full  bg-sky-500 flex justify-center '>
              <div className='container flex justify-between items-center'>
                <div className='flex-1  pl-1'>
                  <Link className=' flex items-center' href='/'>
                    <div className='  w-14 my-2 border-r-2 pr-2 '>
                      <Image src={headerlogo} alt='Crewboard' priority={true} />
                    </div>
                    <p className='ml-3 text-white text-2xl font-semibold'>
                      Crewboard
                    </p>
                  </Link>
                </div>
                <div className='flex-none lg:hidden pr-2'>
                  <label
                    htmlFor='my-drawer-3'
                    aria-label='open sidebar'
                    className='btn btn-square btn-ghost border-1 border-white '
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      className='inline-block w-6 h-6 stroke-current text-white'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M4 6h16M4 12h16M4 18h16'
                      ></path>
                    </svg>
                  </label>
                </div>
                <div className='flex-none hidden lg:block pr-2'>
                  <ul className='text-white px-2 sm:px-0 flex gap-5 items-center text-lg'>
                    <li
                      className={
                        pathname == '/vacancies'
                          ? 'active  border-b-2 border-white font-semibold '
                          : 'text-white  font-semibold'
                      }
                    >
                      <Link
                        href='/vacancies'
                        className='flex items-center gap-2'
                      >
                        <RiShip2Line /> Vacancies
                      </Link>
                    </li>
                    <li
                      className={
                        pathname == '/seafarers'
                          ? 'active border-b-2 border-white font-semibold'
                          : 'text-white  font-semibold'
                      }
                    >
                      <Link
                        href='/seafarers'
                        className='flex items-center gap-2'
                      >
                        <FaPeopleGroup />
                        Seafarers
                      </Link>
                    </li>
                    <li
                      className={
                        pathname == '/employers'
                          ? 'active border-b-2 border-white font-semibold'
                          : 'text-white font-semibold'
                      }
                    >
                      <Link
                        href='/employers'
                        className='flex items-center gap-2'
                      >
                        <MdOutlineHomeWork />
                        Employers
                      </Link>
                    </li>
                    {!loading && (
                      <>
                        {sessionStatus ? (
                          <ul className='flex items-center gap-5 border-l-2 pl-4'>
                            {hiddenTill && (
                              <Dropdown
                                placement='bottom'
                                dropdownRender={() => (
                                  <div className='bg-white w-64  flex flex-col rounded-lg mt-1.5 shadow-lg'>
                                    <div className='bg-sky-400 p-2 rounded-t-lg'>
                                      <p className='text-white font-semibold flex items-center'>
                                        <GoInfo className='text-xl mr-2' />{' '}
                                        Visibility info
                                      </p>
                                    </div>
                                    <p className='p-2'>{`Your Account is set to 'hidden' until the ${moment(
                                      sessionStatus.hiddenTill
                                    ).format('DD.MM.YYYY')}.
                                   To make your profile visible again, remove this option on your account settings page.`}</p>
                                    <div className='bg-gray-600 p-2 text-white flex justify-center rounded-b-lg font-semibold'>
                                      <Link
                                        className='hover:text-white'
                                        href='/profile/settings'
                                      >
                                        To account visibility settings
                                      </Link>
                                    </div>
                                  </div>
                                )}
                              >
                                <div
                                  onClick={handleInfo}
                                  className='select-none text-sm flex  flex-col items-center '
                                >
                                  <p>Visible from:</p>
                                  <p className='bg-orange-400 rounded-md px-2'>
                                    {hiddenTill}
                                  </p>
                                </div>
                              </Dropdown>
                            )}

                            <li className='flex items-center'>
                              <Dropdown menu={{ items }} trigger={['click']}>
                                <div className='flex items-center gap-3 cursor-pointer select-none'>
                                  <p
                                    className={
                                      pathname == '/account'
                                        ? 'active text-xl border-b-2 border-white font-semibold'
                                        : 'text-white text-lg font-semibold'
                                    }
                                  >
                                    {sessionStatus.name}
                                  </p>

                                  <Badge count={1}>
                                    <Avatar
                                      className='flex justify-center items-center'
                                      shape='square'
                                      size='large'
                                      icon={
                                        <div className='relative w-full h-full flex justify-center items-center'>
                                          <Image
                                            fill
                                            sizes='(min-width: 808px) 50vw, 100vw'
                                            style={{
                                              objectFit: 'cover', // cover, contain, none
                                            }}
                                            src={
                                              sessionStatus &&
                                              sessionStatus.avatar.url
                                                ? sessionStatus.avatar.url
                                                : headerLogo
                                            }
                                            alt='avatar'
                                          />
                                        </div>
                                      }
                                    />
                                  </Badge>
                                </div>
                              </Dropdown>
                            </li>

                            <li className='text-white text-xl font-semibold '></li>
                          </ul>
                        ) : (
                          <div className='flex items-center gap-5 border-l-2 pl-4 h-10'>
                            <li
                              className={
                                pathname == '/registration'
                                  ? 'active text-xl border-b-2 border-white font-semibold'
                                  : 'text-white text-xl font-semibold'
                              }
                            >
                              <Link
                                href='/registration'
                                className='flex items-center gap-2'
                              >
                                <BsPersonFillAdd />
                                Registration
                              </Link>
                            </li>
                            <li
                              className={
                                pathname == '/login'
                                  ? 'active text-xl border-b-2 border-white font-semibold'
                                  : 'text-white text-xl font-semibold'
                              }
                            >
                              <Link
                                href='/login'
                                className='flex items-center gap-2'
                              >
                                <TbLogin2 />
                                Login
                              </Link>
                            </li>
                          </div>
                        )}
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className='drawer-side'>
            <label
              htmlFor='my-drawer-3'
              aria-label='close sidebar'
              className='drawer-overlay'
            ></label>

            <div className='w-80 min-h-full bg-white text-lg font-semibold '>
              {/* Sidebar content here */}

              <div className=' flex justify-center bg-sky-400 p-4 '>
                <Link onClick={closeDrawer} href='/'>
                  <p className='text-2xl text-white'>Crewboard</p>
                </Link>
              </div>

              {sessionStatus && (
                <>
                  <div className='flex  justify-between items-center gap-3 p-4'>
                    <div className='flex items-center gap-3'>
                      <Badge count={1}>
                        <Avatar
                          className='flex justify-center items-center'
                          shape='square'
                          size='large'
                          icon={
                            <div className='relative w-full h-full flex justify-center items-center'>
                              <Image
                                fill
                                sizes='(min-width: 808px) 50vw, 100vw'
                                style={{
                                  objectFit: 'cover', // cover, contain, none
                                }}
                                src={
                                  sessionStatus && sessionStatus.avatar.url
                                    ? sessionStatus.avatar.url
                                    : headerLogo
                                }
                                alt='avatar'
                              />
                            </div>
                          }
                        />
                      </Badge>

                      <p className='text-black text-base'>
                        {sessionStatus.name}
                      </p>
                    </div>
                    {hiddenTill && (
                      <Dropdown
                        onOpenChange={(visible) => setDropdownVisible(visible)}
                        open={dropdownVisible}
                        placement='bottom'
                        dropdownRender={() => (
                          <div className='bg-white w-64  flex flex-col rounded-lg mt-1.5 shadow-lg'>
                            <div className='bg-sky-400 p-2 rounded-t-lg'>
                              <p className='text-white font-semibold flex items-center'>
                                <GoInfo className='text-xl mr-2' /> Visibility
                                info
                              </p>
                            </div>
                            <p className='p-2'>{`Your Account is set to 'hidden' until the ${moment(
                              sessionStatus.hiddenTill
                            ).format('DD.MM.YYYY')}.
                                   To make your profile visible again, remove this option on your account settings page.`}</p>
                            <div className='bg-gray-600 p-2 text-white flex justify-center rounded-b-lg font-semibold'>
                              <Link
                                onClick={closeDrawer}
                                className='hover:text-white'
                                href='/profile/settings'
                              >
                                To account visibility settings
                              </Link>
                            </div>
                          </div>
                        )}
                      >
                        <div
                          onClick={handleInfo}
                          className='select-none text-sm flex  flex-col items-center '
                        >
                          <p>Visible from:</p>
                          <p className='bg-orange-400 rounded-md px-2'>
                            {hiddenTill}
                          </p>
                        </div>
                      </Dropdown>
                    )}
                  </div>
                </>
              )}

              {sessionStatus ? (
                <div className='flex flex-col items-start'>
                  <div className='bg-sky-100 w-full border-t border-b border-gray-300'>
                    <p className='pl-4 pt-2 pb-2  text-gray-400 text-base'>
                      PROFILE
                    </p>
                  </div>
                  <div className='w-full p-4 flex flex-col gap-4'>
                    <div>
                      <Link
                        href={profileLink}
                        className='flex items-center gap-2'
                        onClick={closeDrawer}
                      >
                        <VscAccount />
                        <p className='ml-2 text-base'>Profile</p>
                      </Link>
                    </div>
                    <div>
                      <Link
                        href={cvLink}
                        className='flex items-center gap-2'
                        onClick={closeDrawer}
                      >
                        <IoDocumentTextOutline />
                        <p className='ml-2 text-base'>My CV</p>
                      </Link>
                    </div>
                    <div>
                      <Link
                        href={settingsLink}
                        className='flex items-center gap-2'
                        onClick={closeDrawer}
                      >
                        <RxGear />
                        <p className='ml-2 text-base'>Settings</p>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='flex justify-between p-4'>
                  <div>
                    <Link
                      href='/registration'
                      className='flex items-center gap-2 text-base'
                      onClick={closeDrawer}
                    >
                      <BsPersonFillAdd />
                      Registration
                    </Link>
                  </div>
                  <div>
                    <Link
                      href='/login'
                      className='flex items-center gap-2 text-base'
                      onClick={closeDrawer}
                    >
                      <TbLogin2 />
                      Login
                    </Link>
                  </div>
                </div>
              )}

              <div className='flex-col'>
                <div className='bg-sky-100 w-full border-t border-b border-gray-300'>
                  <p className='pl-4 pt-2 pb-2  text-gray-400 flex text-base '>
                    MENU
                  </p>
                </div>
                <div className='flex-col p-4'>
                  <div className='mb-5'>
                    <Link
                      href='/vacancies'
                      className='flex items-center gap-2 text-base'
                      onClick={closeDrawer}
                    >
                      <RiShip2Line /> Vacancies
                    </Link>
                  </div>
                  <div className='mb-5'>
                    <Link
                      href='/seafarers'
                      className='flex items-center gap-2 text-base'
                      onClick={closeDrawer}
                    >
                      <FaPeopleGroup />
                      Seafarers
                    </Link>
                  </div>
                  <div className='mb-5'>
                    <Link
                      href='/employers'
                      className='flex items-center gap-2 text-base'
                      onClick={closeDrawer}
                    >
                      <MdOutlineHomeWork />
                      Employers
                    </Link>
                  </div>
                  <hr className='mt-5 mb-5' />
                  {sessionStatus && (
                    <div>
                      <Link
                        href='/'
                        className='flex items-center gap-2 text-base'
                        onClick={logout}
                      >
                        <TbLogout />
                        Logout
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
