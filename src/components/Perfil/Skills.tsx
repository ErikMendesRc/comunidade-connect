import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getUserData } from '../../services/firebaseService';

interface SkillsProps {
  uid?: string;
}

const Skills: React.FC<SkillsProps> = ({ uid }) => {
  const [skills, setSkills] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const fetchUserSkills = async () => {
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
          setSkills(data.skills || []);
        }
      }
      setIsLoading(false);
    };

    fetchUserSkills();
  }, [auth, uid]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (skills.length === 0) {
    return <div>No skills found</div>;
  }

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-white mb-4">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {skills.map(skill => (
          <span key={skill} className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Skills;