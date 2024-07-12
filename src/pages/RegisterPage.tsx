import React from 'react';
import MultiStepForm from '../components/MultiStepForm';
import useStrings from '../hooks/useStrings';

const RegisterPage: React.FC = () => {
  const { header } = useStrings();

  return (
    <section className="bg-neutral-light dark:bg-neutral-dark min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 w-full sm:max-w-2xl">
        <div className="flex flex-col items-center justify-center text-white p-6 space-y-6 mb-6">
          <img src="/connect.svg" className="h-12 w-auto" alt={header.logoAlt} />
        </div>
        <div className="w-full bg-neutral-light dark:bg-neutral-dark rounded-lg shadow dark:border dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <MultiStepForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;