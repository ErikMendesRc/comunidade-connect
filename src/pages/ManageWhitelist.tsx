import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, getDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import useStrings from '../hooks/useStrings';
import { getAuth } from 'firebase/auth';

const ManageWhitelist: React.FC = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const firestore = getFirestore();
  const { registerForm } = useStrings();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const checkSuperAdmin = async () => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(firestore, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.superadmin) {
              setIsSuperAdmin(true);
            } else {
              setIsSuperAdmin(false);
            }
          }
        } catch (error) {
          console.error('Error fetching user document:', error);
        }
      }
    };

    checkSuperAdmin();
  }, [currentUser, firestore]);

  const handleAddEmail = async () => {
    if (!isSuperAdmin) {
      setErrorMessage('Apenas superadmins podem adicionar emails à whitelist.');
      return;
    }

    if (email) {
      try {
        await addDoc(collection(firestore, 'whitelist'), {
          email: email,
        });
        setEmail('');
        setSuccessMessage('Email adicionado à whitelist com sucesso!');
        setErrorMessage('');
      } catch (e) {
        console.error('Error adding document: ', e);
        setErrorMessage('Erro ao adicionar email à whitelist');
        setSuccessMessage('');
      }
    } else {
      setErrorMessage('Por favor, insira um email válido.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-dark p-4">
      <div className="bg-neutral-light bg-opacity-20 backdrop-blur-lg p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-center text-white">Adicionar Email</h1>
        {successMessage && <div className="mb-4 text-green-600">{successMessage}</div>}
        {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}
        <div className="relative mb-6">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer block w-full rounded border border-gray-300 bg-neutral-light bg-opacity-70 px-3 py-2 leading-6 text-black outline-none transition-all duration-200 ease-linear focus:border-highlight focus:bg-white focus:placeholder-opacity-100 peer-focus:text-primary dark:bg-neutral-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:bg-neutral-dark dark:peer-focus:text-white"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="pointer-events-none absolute left-3 top-1 transition-all duration-200 ease-out transform -translate-y-3 scale-75 origin-top-left text-neutral-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-highlight dark:text-neutral-400"
          >
            Digite o email
          </label>
        </div>
        <button
          onClick={handleAddEmail}
          className="bg-highlight text-white py-2 px-4 rounded w-full transition duration-200 hover:bg-highlight-dark focus:outline-none focus:ring-2 focus:ring-highlight focus:ring-opacity-50"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
};

export default ManageWhitelist;