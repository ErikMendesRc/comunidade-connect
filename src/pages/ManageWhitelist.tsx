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
  const navigate = useNavigate();
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
        const docRef = await addDoc(collection(firestore, 'whitelist'), {
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
    <div className="flex justify-center items-center h-screen bg-neutral-dark">
      <div className="bg-neutral-light bg-opacity-20 backdrop-blur-lg p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-center text-white">Adicionar Email</h1>
        {successMessage && <div className="mb-4 text-green-600">{successMessage}</div>}
        {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}
        <div className="relative mb-6">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer block min-h-[auto] w-full rounded border border-gray-300 bg-neutral-light bg-opacity-70 px-3 py-[0.32rem] leading-[2.15] text-black outline-none transition-all duration-200 ease-linear focus:border-highlight focus:bg-white focus:placeholder-opacity-100 peer-focus:text-primary dark:bg-neutral-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:bg-neutral-dark dark:peer-focus:text-white"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-highlight dark:text-neutral-400"
          >
            Digite o email
          </label>
        </div>
        <button
          onClick={handleAddEmail}
          className="bg-highlight text-white p-3 rounded w-full"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
};

export default ManageWhitelist;