import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import UserProfile from '../components/Perfil/UserProfile';
import GeneralInformation from '../components/Perfil/GeneralInformation';
import CompanyInformation from '../components/Perfil/CompanyInformation';
import Skills from '../components/Perfil/Skills';
import Hobbies from '../components/Perfil/Hobbies';
import { getUserData } from '../services/firebaseService';
import { User } from '../models/User';
import { getAuth } from 'firebase/auth';

const UserPage: React.FC = () => {
  const { uid } = useParams<{ uid: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const fetchUser = async () => {
      let userId = uid;

      if (!userId) {
        const currentUser = auth.currentUser;
        if (currentUser) {
          userId = currentUser.uid;
        } else {
          setIsLoading(false);
          return;
        }
      }

      if (userId) {
        const userData = await getUserData(userId);
        setUser(userData as unknown as User);
      }

      setIsLoading(false);
    };

    fetchUser();
  }, [uid, auth]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex min-h-screen bg-neutral-dark">
      <Sidebar />
      <div className="flex-1 p-4 grid grid-cols-1 lg:grid-cols-3 gap-4 bg-primary ml-64">
        <div className="lg:col-span-1 space-y-4">
          <UserProfile uid={uid || auth.currentUser?.uid} />
          <Skills uid={uid || auth.currentUser?.uid} />
          <Hobbies uid={uid || auth.currentUser?.uid} />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <GeneralInformation uid={uid || auth.currentUser?.uid} />
          <CompanyInformation uid={uid || auth.currentUser?.uid} />
        </div>
      </div>
    </div>
  );
};

export default UserPage;