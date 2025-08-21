import React from 'react';

// Contact Info Icons
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.03 11.03 0 004.438 4.438l.759-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

const FaxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

// Social Icons
const FacebookIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.19,4.73C14.03,4.73 15.6,5.33 16.85,6.45L19.05,4.23C17.2,2.77 15,2 12.19,2C6.92,2 2.71,6.62 2.71,12C2.71,17.38 6.92,22 12.19,22C17.6,22 21.54,18.33 21.54,12.29C21.54,11.88 21.49,11.49 21.35,11.1Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.2,5.2 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.2,5.2 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
  </svg>
);

function Footer() {
  return (
    <footer className="bg-slate-800 text-white font-sans">
      <div className="container mx-auto px-6 pt-10 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">

          {/* About Section */}
          <div className="px-4">
            <h6 className="uppercase font-bold mb-4">About</h6>
            <p className="text-slate-300">
              The Terminal Management System of Maasin City enhances public transportation through booking, scheduling, validation, and monitoring.
            </p>
          </div>

          {/* System Features with Animated Inline Icons */}
          <div className="px-4">
            <h6 className="uppercase font-bold mb-4">System Features</h6>
            <ul>
              <li className="mb-4 flex items-center space-x-3">
                <svg className="w-6 h-6 transition-transform duration-500 hover:rotate-180" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4a2 2 0 00-2 2v14l4-4h14a2 2 0 002-2V6a2 2 0 00-2-2z" />
                </svg>
                <span className="text-slate-300 hover:text-white transition-colors duration-200">Booking</span>
              </li>
              <li className="mb-4 flex items-center space-x-3">
                <svg className="w-6 h-6 transition-transform duration-500 hover:rotate-180" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13h2l1 2h13a1 1 0 001-1v-1H6.42l-1-2H3v2zm1 5h2v2a1 1 0 002 0v-2h6v2a1 1 0 002 0v-2h2a1 1 0 001-1v-3H4v3a1 1 0 001 1z" />
                </svg>
                <span className="text-slate-300 hover:text-white transition-colors duration-200">Dispatching</span>
              </li>
              <li className="mb-4 flex items-center space-x-3">
                <svg className="w-6 h-6 transition-transform duration-500 hover:rotate-180" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4h16v16H4V4zm8 2a6 6 0 100 12 6 6 0 000-12z" />
                </svg>
                <span className="text-slate-300 hover:text-white transition-colors duration-200">QR Validation</span>
              </li>
              <li className="mb-4 flex items-center space-x-3">
                <svg className="w-6 h-6 transition-transform duration-500 hover:rotate-180" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM7 12l5 5 5-5H7z" />
                </svg>
                <span className="text-slate-300 hover:text-white transition-colors duration-200">Trip Monitoring</span>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="px-4">
            <h6 className="uppercase font-bold mb-4">Useful Links</h6>
            <ul>
              <li className="mb-2"><a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">Your Account</a></li>
              <li className="mb-2"><a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">Help</a></li>
              <li className="mb-2"><a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              <li className="mb-2"><a href="#" className="text-slate-300 hover:text-white transition-colors duration-200">Terms of Use</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="px-4">
            <h6 className="uppercase font-bold mb-4">Contact</h6>
            <ul className="text-slate-300">
              <li className="flex items-center justify-center sm:justify-start mb-2"><HomeIcon /><p>Maasin City Terminal</p></li>
              <li className="flex items-center justify-center sm:justify-start mb-2"><MailIcon /><p>support@ticketnow.ph</p></li>
              <li className="flex items-center justify-center sm:justify-start mb-2"><PhoneIcon /><p>+63 912 345 6789</p></li>
              <li className="flex items-center justify-center sm:justify-start"><FaxIcon /><p>+63 322 111 222</p></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700">
        <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-slate-400 text-center sm:text-left mb-4 sm:mb-0">
            © 2025 <a href="#" className="font-bold text-slate-300 hover:text-white">TicketNow Maasin</a>
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-slate-400 hover:text-white p-2 border border-slate-500 rounded-full"><FacebookIcon /></a>
            <a href="#" className="text-slate-400 hover:text-white p-2 border border-slate-500 rounded-full"><TwitterIcon /></a>
            <a href="#" className="text-slate-400 hover:text-white p-2 border border-slate-500 rounded-full"><GoogleIcon /></a>
            <a href="#" className="text-slate-400 hover:text-white p-2 border border-slate-500 rounded-full"><InstagramIcon /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
