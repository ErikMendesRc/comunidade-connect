import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getUserData } from '../../services/firebaseService';
import useStrings from '../../hooks/useStrings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faBirthdayCake, faBuilding, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'; // Importando do pacote correto

interface GeneralInformationProps {
  uid?: string;
}

const GeneralInformation: React.FC<GeneralInformationProps> = ({ uid }) => {
  const strings = useStrings().generalInformation;
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
    <div className="bg-gray-800 text-white rounded-lg shadow-md overflow-hidden p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">{strings.title}</h2>
        <h3 className="mt-4 text-xl font-medium text-gray-400">{strings.aboutMe}</h3>
        <p className="mt-2 text-gray-300">
          {userData.bio || strings.bio}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-medium text-gray-400">
            <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
            {strings.role}
          </h3>
          <p className="text-white">{userData.role}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-400">
            <FontAwesomeIcon icon={faBuilding} className="mr-2" />
            {strings.department}
          </h3>
          <p className="text-white">{userData.department}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-400">
            <FontAwesomeIcon icon={faBirthdayCake} className="mr-2" />
            {strings.birthday}
          </h3>
          <p className="text-white">{userData.birthday}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-400">
            <FontAwesomeIcon icon={faCalendar} className="mr-2" />
            {strings.years}
          </h3>
          <p className="text-white">{userData.years} {strings.yearsSuffix}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-400">
            <FontAwesomeIcon icon={faLinkedin} className="mr-2" />
            LinkedIn
          </h3>
          <p className="text-white">
            <a href={userData.linkedin} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
              {userData.linkedin}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeneralInformation;