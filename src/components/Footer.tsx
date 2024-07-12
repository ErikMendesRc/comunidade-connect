// src/components/Footer.tsx

import React from 'react';
import useStrings from '../hooks/useStrings';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { footer } = useStrings();

  return (
    <footer className="bg-neutral-bg dark:bg-gray-900 w-full">
      <div className="max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src="/connect.svg" className="h-8" alt={footer.logoAlt} />
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link to="/about-us" className="hover:underline me-4 md:me-6">{footer.about}</Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:underline me-4 md:me-6">{footer.privacyPolicy}</Link>
            </li>
            <li>
              <Link to="/licensing" className="hover:underline me-4 md:me-6">{footer.licensing}</Link>
            </li>
            <li>
              <Link to="/contact-us" className="hover:underline">{footer.contact}</Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2021 <Link to="/" className="hover:underline">Comunidade Connect™</Link>. {footer.allRightsReserved}
        </span>
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400 mt-4">
          Site criado por: <a href="https://www.eebtecnologia.com.br/" className="hover:underline text-blue-500" target="_blank" rel="noopener noreferrer">E&B Tecnologia LTDA</a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;