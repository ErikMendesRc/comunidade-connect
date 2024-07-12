import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getUserData } from '../../services/firebaseService';

interface HobbiesProps {
  uid?: string;
}

const Hobbies: React.FC<HobbiesProps> = ({ uid }) => {
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const fetchUserHobbies = async () => {
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
        if (data) {
          setHobbies(data.hobbies || []);
        }
      }
      setIsLoading(false);
    };

    fetchUserHobbies();
  }, [auth, uid]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hobbies.length === 0) {
    return <div>No hobbies found</div>;
  }

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-white mb-4">Hobbies</h2>
      <div className="flex flex-wrap gap-2">
        {hobbies.map(hobby => (
          <span key={hobby} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
            {hobby}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Hobbies;