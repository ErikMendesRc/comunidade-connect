import React from 'react';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import useStrings from '../hooks/useStrings';

const ContactUs: React.FC = () => {
  const { contact } = useStrings();

  return (
    <div className="bg-neutral-dark py-12 min-h-screen flex flex-col">
      <div className="container mx-auto px-4 flex flex-1 flex-col lg:flex-row items-start space-y-8 lg:space-y-0 lg:space-x-12">
        <div className="lg:w-1/3 text-white">
          <h1 className="text-white text-4xl font-bold mb-4">{contact.title}</h1>
          <p className="text-lg leading-relaxed mb-4">
            {contact.description}
          </p>
          <p className="text-lg leading-relaxed mb-2 flex items-center">
            <FaWhatsapp className="mr-2" />
            <a href={`https://wa.me/556281967528`} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {contact.phone}
            </a>
          </p>
          <p className="text-lg leading-relaxed mb-2 flex items-center">
            <FaEnvelope className="mr-2" />
            <a href={`mailto:${contact.email}`} className="hover:underline">
              {contact.email}
            </a>
          </p>
        </div>
        <div className="lg:w-2/3 flex justify-center items-center">
          <img src="/connect-login.svg" alt="Contact Us" className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;