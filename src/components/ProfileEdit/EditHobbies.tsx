import React, { useState, useEffect } from 'react';
import { getAuth, User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Alert, Snackbar, Chip, IconButton } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { firestore } from '../../firebaseConfig';
import { getUserData } from '../../services/firebaseService';
import useStrings from '../../hooks/useStrings';

const EditHobbies: React.FC = () => {
  const strings = useStrings().editHobbies;
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [currentHobby, setCurrentHobby] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        getUserData(user.uid).then((data) => {
          if (data && data.hobbies) {
            setHobbies(data.hobbies);
          }
          setIsLoading(false);
        }).catch((error) => {
          console.error('Error fetching user data:', error);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddHobby = () => {
    if (currentHobby.trim() !== '') {
      setHobbies([...hobbies, currentHobby.trim()]);
      setCurrentHobby('');
    }
  };

  const handleDeleteHobby = (hobbyToDelete: string) => {
    setHobbies(hobbies.filter(hobby => hobby !== hobbyToDelete));
  };

  const handleSaveHobbies = async () => {
    if (currentUser) {
      const userDocRef = doc(firestore, `users/${currentUser.uid}`);
      await setDoc(userDocRef, { hobbies: hobbies }, { merge: true });
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 mb-4">
      <Snackbar open={alertVisible} autoHideDuration={3000} onClose={() => setAlertVisible(false)}>
        <Alert onClose={() => setAlertVisible(false)} severity="success" sx={{ width: '100%' }}>
          {strings.successMessage}
        </Alert>
      </Snackbar>
      <h2 className="text-2xl font-semibold mb-4">{strings.title}</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {hobbies.map((hobby, index) => (
          <Chip
            key={index}
            label={hobby}
            onDelete={() => handleDeleteHobby(hobby)}
            color="primary"
            sx={{ backgroundColor: '#4CAF50', color: '#fff' }}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={currentHobby}
          onChange={(e) => setCurrentHobby(e.target.value)}
          className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
          placeholder={strings.placeholder}
        />
        <IconButton color="primary" onClick={handleAddHobby}>
          <AddCircle sx={{ color: '#2196F3' }} /> {/* Ícone azul para combinar com os botões */}
        </IconButton>
      </div>
      <button
        onClick={handleSaveHobbies}
        className="w-full p-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-200"
      >
        {strings.save}
      </button>
    </div>
  );
};

export default EditHobbies;