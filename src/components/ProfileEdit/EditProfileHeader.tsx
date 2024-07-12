import React, { useEffect, useState } from 'react';
import { updateProfile, getAuth, User } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { getUserData } from '../../services/firebaseService';
import { firestore, storage } from '../../firebaseConfig';
import { Alert, Snackbar, CircularProgress } from '@mui/material';

const EditProfileHeader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>('https://via.placeholder.com/150');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        getUserData(user.uid).then((data) => {
          if (data && data.profilePicture) {
            setProfilePictureUrl(data.profilePicture);
          }
        }).catch((error) => {
          console.error('Error fetching user data:', error);
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const handlePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentUser) {
      console.error('No user logged in');
      return;
    }

    if (e.currentTarget.files && e.currentTarget.files[0]) {
      const file = e.currentTarget.files[0];
      await handleUpload(file);
    }
  };

  const handleUpload = async (file: File) => {
    if (!currentUser) {
      console.error('No user logged in');
      return;
    }

    setIsLoading(true);

    try {
      const storageRef = ref(storage, `profile_pictures/${currentUser.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await updateProfile(currentUser, { photoURL: downloadURL });

      const userDocRef = doc(firestore, `users/${currentUser.uid}`);
      await setDoc(userDocRef, { profilePicture: downloadURL }, { merge: true });

      setProfilePictureUrl(downloadURL);
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000); // Oculta o alerta após 3 segundos
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert('Failed to update profile picture');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 mb-4">
      <Snackbar open={alertVisible} autoHideDuration={3000} onClose={() => setAlertVisible(false)}>
        <Alert onClose={() => setAlertVisible(false)} severity="success" sx={{ width: '100%' }}>
          Foto de Perfil alterada com sucesso!
        </Alert>
      </Snackbar>
      <div className="flex flex-col items-center">
        {isLoading ? (
          <CircularProgress color="inherit" />
        ) : (
          <>
            <img src={profilePictureUrl} alt="Profile" className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover mb-4" />
            <label className="bg-blue-600 text-white p-2 rounded cursor-pointer">
              Alterar Foto
              <input type="file" onChange={handlePictureChange} className="hidden" />
            </label>
          </>
        )}
      </div>
    </div>
  );
};

export default EditProfileHeader;