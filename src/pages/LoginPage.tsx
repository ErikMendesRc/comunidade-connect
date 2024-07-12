// pages/LoginPage.tsx
import React from 'react';
import LoginForm from '../components/LoginForm';
import useStrings from '../hooks/useStrings';

const LoginPage: React.FC = () => {
  const { header } = useStrings();

  return (
    <section className="h-screen bg-neutral-dark flex items-center justify-center">
      <div className="container h-full flex items-center justify-center px-6 py-24">
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl">
          <img src="/connect-login.svg" className="mb-12 md:mb-0 md:mr-12 w-2/3 md:w-1/2" alt="Connect Logo" />
          <div className="w-full max-w-md">
            <h2 className="text-white text-center text-2xl mb-6">{header.login}</h2>
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;