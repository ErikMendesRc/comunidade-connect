import React, { useState } from 'react';
import { signInWithGoogle, signInWithEmailAndPassword } from '../services/firebaseService';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import useStrings from '../hooks/useStrings';
import { useAuth } from '../context/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { registerForm } = useStrings();
  const { setIsSuperAdmin } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate('/edit-profile');
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(email, password);
      navigate('/edit-profile');
    } catch (error) {
      console.error('Error logging in with email and password:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative mb-6">
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-neutral-light px-3 py-3 leading-6 text-black outline-none transition-all duration-200 ease-linear focus:border-highlight focus:bg-white focus:placeholder-opacity-100 peer-focus:text-primary dark:bg-neutral-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:bg-neutral-dark dark:peer-focus:text-white"
          placeholder=" "
        />
        <label
          htmlFor="email"
          className="pointer-events-none absolute left-3 top-3 mb-0 max-w-[90%] truncate pt-1 leading-6 text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-highlight dark:text-neutral-400"
        >
          {registerForm.email}
        </label>
      </div>
      <div className="relative mb-6">
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-neutral-light px-3 py-3 leading-6 text-black outline-none transition-all duration-200 ease-linear focus:border-highlight focus:bg-white focus:placeholder-opacity-100 peer-focus:text-primary dark:bg-neutral-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:bg-neutral-dark dark:peer-focus:text-white"
          placeholder=" "
        />
        <label
          htmlFor="password"
          className="pointer-events-none absolute left-3 top-3 mb-0 max-w-[90%] truncate pt-1 leading-6 text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-highlight dark:text-neutral-400"
        >
          {registerForm.password}
        </label>
      </div>
      <button
        type="submit"
        className="inline-block w-full rounded bg-highlight px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-highlight-3 transition duration-150 ease-in-out hover:bg-highlight/75 focus:bg-highlight/75 focus:outline-none active:bg-highlight-dark"
      >
        {registerForm.login}
      </button>
      <div className="my-4 flex items-center before:flex-1 before:border-t before:border-neutral-300 after:flex-1 after:border-t after:border-neutral-300">
        <p className="mx-4 mb-0 text-center font-semibold text-white">{registerForm.or}</p>
      </div>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="mb-3 flex w-full items-center justify-center rounded bg-neutral-light px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-neutral-dark shadow-neutral-3 transition duration-150 ease-in-out hover:bg-neutral-light/75 focus:bg-neutral-light/75 focus:outline-none active:bg-neutral-dark"
      >
        <FcGoogle className="mr-2 h-6 w-6" />
        {registerForm.signInWithGoogle}
      </button>
    </form>
  );
};

export default LoginForm;