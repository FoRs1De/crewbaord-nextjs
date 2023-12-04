import drawerLogo from '../../../public/images/FooterLogo.png';
import Link from 'next/link';
import Image from 'next/image';
const Footer = () => {
  return (
    <footer className='flex justify-center sm:px-0 pl-3 pr-3 pt-10 pb-10 bg-neutral text-neutral-content  sm:p-10'>
      <div className='container footer flex flex-wrap-reverse '>
        <aside className='w-full sm:w-fit flex flex-col items-center m-auto'>
          <div className='w-72'>
            <Link href='/'>
              <Image src={drawerLogo} alt='Crewboard' priority={true} />
            </Link>
          </div>

          <p className='pt-3'>
            From seaman for seamen and employers
            <br />
            Find your perfect job © Crewboard 2023
          </p>
        </aside>
        <div className='flex w-full sm:w-fit justify-center gap-10 md:gap-20 lg:gap-40 m-auto pr-3'>
          <nav className='flex flex-col gap-3'>
            <header className='footer-title'>Services</header>
            <a className='link link-hover'>Branding</a>
            <a className='link link-hover'>Design</a>
            <a className='link link-hover'>Marketing</a>
            <a className='link link-hover'>Advertisement</a>
          </nav>
          <nav className='flex flex-col gap-3'>
            <header className='footer-title'>Company</header>
            <a className='link link-hover'>About us</a>
            <a className='link link-hover'>Contact</a>
            <a className='link link-hover'>Jobs</a>
            <a className='link link-hover'>Press kit</a>
          </nav>
          <nav className='flex flex-col gap-3'>
            <header className='footer-title'>Legal</header>
            <a className='link link-hover'>Terms of use</a>
            <a className='link link-hover'>Privacy policy</a>
            <a className='link link-hover'>Cookie policy</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
