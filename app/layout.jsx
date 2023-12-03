import './globals.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import TopHeader from './components/header/TopHeader';
import { StoreProvider } from './redux/StoreProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';

export const metadata = {
  title: 'CREWBOARD',
  description: 'Crewboard - jobs portal for Seafarers and Employers',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <StoreProvider>
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
          <body className=''>
            <div className='flex flex-col min-h-screen'>
              <TopHeader />
              <Header />
              {children}
              <Footer />
            </div>
          </body>
        </GoogleOAuthProvider>
      </StoreProvider>
    </html>
  );
}
