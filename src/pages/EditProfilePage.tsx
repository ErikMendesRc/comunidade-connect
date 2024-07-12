import React from 'react';
import EditProfileHeader from '../components/ProfileEdit/EditProfileHeader';
import EditGeneralInformation from '../components/ProfileEdit/EditGeneralInformation';
import EditSkills from '../components/ProfileEdit/EditSkills';
import EditHobbies from '../components/ProfileEdit/EditHobbies';
import EditPasswordInformation from '../components/ProfileEdit/EditPasswordInformation';
import EditCompanyInformation from '../components/ProfileEdit/EditCompanyInformation';
import Sidebar from '../components/Sidebar';
import useStrings from '../hooks/useStrings';

const EditProfilePage: React.FC = () => {
  const strings = useStrings();

  return (
    <div className="min-h-screen bg-neutral-dark flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6">{strings.header.profileMenu.settings}</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <EditProfileHeader />
              <EditSkills />
              <EditHobbies />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <EditGeneralInformation />
              <EditCompanyInformation />
              <EditPasswordInformation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;