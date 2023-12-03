import drawerLogo from '../../../public/images/FooterLogo.png';
import Link from 'next/link';
import Image from 'next/image';
const Footer = () => {
  return (
    <footer className='flex justify-center sm:px-0 p-3 pt-5 bg-neutral text-neutral-content  sm:p-10'>
      <div className='container footer  '>
        <aside>
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
        <nav>
          <header className='footer-title'>Services</header>
          <a className='link link-hover'>Branding</a>
          <a className='link link-hover'>Design</a>
          <a className='link link-hover'>Marketing</a>
          <a className='link link-hover'>Advertisement</a>
        </nav>
        <nav>
          <header className='footer-title'>Company</header>
          <a className='link link-hover'>About us</a>
          <a className='link link-hover'>Contact</a>
          <a className='link link-hover'>Jobs</a>
          <a className='link link-hover'>Press kit</a>
        </nav>
        <nav>
          <header className='footer-title'>Legal</header>
          <a className='link link-hover'>Terms of use</a>
          <a className='link link-hover'>Privacy policy</a>
          <a className='link link-hover'>Cookie policy</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
