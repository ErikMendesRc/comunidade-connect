import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getUserData } from '../../services/firebaseService';
import useStrings from '../../hooks/useStrings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faIndustry, faCalendarAlt, faMapMarkerAlt, faUsers, faDollarSign, faGlobe } from '@fortawesome/free-solid-svg-icons';

interface CompanyInformationProps {
  uid?: string;
}

const CompanyInformation: React.FC<CompanyInformationProps> = ({ uid }) => {
  const strings = useStrings().companyInformation;
  const [companyData, setCompanyData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const fetchCompanyData = async () => {
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
        setCompanyData(data);
      }
      setIsLoading(false);
    };

    fetchCompanyData();
  }, [auth, uid]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!companyData) {
    return <div>No company data found</div>;
  }

  const formatBRL = (value: string) => {
    const number = parseFloat(value);
    return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md overflow-hidden p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">{strings.title}</h2>
        <h3 className="mt-4 text-xl font-medium text-gray-400">{strings.aboutCompany}</h3>
        <p className="mt-2 text-gray-300">
          {companyData.bio}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-medium text-gray-400">
            <FontAwesomeIcon icon={faBuilding} className="mr-2" />
            {strings.companyName}
          </h3>
          <p className="text-white">{companyData.companyName}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-400">
            <FontAwesomeIcon icon={faIndustry} className="mr-2" />
            {strings.industry}
          </h3>
          <p className="text-white">{companyData.industry}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-400">
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
            {strings.founded}
          </h3>
          <p className="text-white">Há {companyData.founded} anos</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-400">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
            {strings.headquarters}
          </h3>
          <p className="text-white">{companyData.headquarters}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-400">
            <FontAwesomeIcon icon={faUsers} className="mr-2" />
            {strings.numberOfEmployees}
          </h3>
          <p className="text-white">{companyData.numberOfEmployees} funcionários</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-400">
            <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
            {strings.annualTurnover}
          </h3>
          <p className="text-white">{formatBRL(companyData.annualTurnover)}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-400">
            <FontAwesomeIcon icon={faGlobe} className="mr-2" />
            {strings.website}
          </h3>
          <p className="text-white">
            <a href={companyData.website} className="text-blue-400 hover:underline">{companyData.website}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyInformation;