import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faMapMarkerAlt, faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from 'firebase/auth';
import { getUserData } from '../../services/firebaseService';

interface UserProfileProps {
  uid?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ uid }) => {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      let userId = uid;
      if (!userId) {
        const user = auth.currentUser;
        if (user) {
          userId = user.uid;
        } else {
          setIsLoading(false);
          return;
        }
      }

      if (userId) {
        const data = await getUserData(userId);
        setUserData(data);
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, [auth, uid]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data found</div>;
  }

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md overflow-hidden mb-6 p-6">
      <div className="flex justify-start mb-4">
        <img
          className="w-24 h-24 rounded-lg object-cover"
          src={userData.profilePicture || 'https://via.placeholder.com/150'}
          alt="Profile"
        />
      </div>
      <div>
        <h1 className="text-xl font-semibold">{userData.name} {userData.lastName}</h1>
        <p className="text-gray-400 mb-4">{userData.role}</p>
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-400">Company</h2>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
            <span>{userData.companyName}</span>
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-400">Location</h2>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
            <span>{userData.city}, {userData.country}</span>
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-400">Email Address</h2>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            <span>{userData.email}</span>
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gray-400">Phone Number</h2>
          <div className="flex items-center">
            <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />
            <span>{userData.contact}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;