import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getAuth, User } from 'firebase/auth';
import { getUserData, updateUserProfile } from '../../services/firebaseService';
import useStrings from '../../hooks/useStrings';

const EditCompanyInformation: React.FC = () => {
  const strings = useStrings().editCompanyInformation;
  const [alertVisible, setAlertVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const formik = useFormik({
    initialValues: {
      companyName: '',
      industry: '',
      founded: '',
      headquarters: '',
      numberOfEmployees: '',
      website: '',
      annualTurnover: '',
    },
    validationSchema: Yup.object().shape({
      companyName: Yup.string().required(strings.validation.companyName),
      industry: Yup.string().required(strings.validation.industry),
      founded: Yup.string().required(strings.validation.founded),
      headquarters: Yup.string().required(strings.validation.headquarters),
      numberOfEmployees: Yup.string().required(strings.validation.numberOfEmployees),
      website: Yup.string().url(strings.validation.website.url).required(strings.validation.website.required),
      annualTurnover: Yup.string().required(strings.validation.annualTurnover),
    }),
    onSubmit: async (values) => {
      console.log('Submitting Company Information:', values);
      if (currentUser) {
        await updateUserProfile({ uid: currentUser.uid, ...values });
        console.log('Profile updated');
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 3000); // Oculta o alerta após 3 segundos
      }
    },
  });

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        getUserData(user.uid).then((data) => {
          if (data) {
            formik.setValues({
              companyName: data.companyName || '',
              industry: data.industry || '',
              founded: data.founded || '',
              headquarters: data.headquarters || '',
              numberOfEmployees: data.numberOfEmployees || '',
              website: data.website || '',
              annualTurnover: data.annualTurnover || '',
            });
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-2xl font-semibold mb-4">{strings.title}</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">{strings.companyName}</label>
            <input
              type="text"
              name="companyName"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
              placeholder={strings.placeholder.companyName}
            />
            {formik.errors.companyName && <div className="text-red-500 text-sm">{formik.errors.companyName}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">{strings.industry}</label>
            <input
              type="text"
              name="industry"
              value={formik.values.industry}
              onChange={formik.handleChange}
              className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
              placeholder={strings.placeholder.industry}
            />
            {formik.errors.industry && <div className="text-red-500 text-sm">{formik.errors.industry}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">{strings.founded}</label>
            <input
              type="text"
              name="founded"
              value={formik.values.founded}
              onChange={formik.handleChange}
              className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
              placeholder={strings.placeholder.founded}
            />
            {formik.errors.founded && <div className="text-red-500 text-sm">{formik.errors.founded}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">{strings.headquarters}</label>
            <input
              type="text"
              name="headquarters"
              value={formik.values.headquarters}
              onChange={formik.handleChange}
              className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
              placeholder={strings.placeholder.headquarters}
            />
            {formik.errors.headquarters && <div className="text-red-500 text-sm">{formik.errors.headquarters}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">{strings.numberOfEmployees}</label>
            <input
              type="text"
              name="numberOfEmployees"
              value={formik.values.numberOfEmployees}
              onChange={formik.handleChange}
              className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
              placeholder={strings.placeholder.numberOfEmployees}
            />
            {formik.errors.numberOfEmployees && <div className="text-red-500 text-sm">{formik.errors.numberOfEmployees}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">{strings.website}</label>
            <input
              type="text"
              name="website"
              value={formik.values.website}
              onChange={formik.handleChange}
              className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
              placeholder={strings.placeholder.website}
            />
            {formik.errors.website && <div className="text-red-500 text-sm">{formik.errors.website}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">{strings.annualTurnover}</label>
            <input
              type="text"
              name="annualTurnover"
              value={formik.values.annualTurnover}
              onChange={formik.handleChange}
              className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
              placeholder={strings.placeholder.annualTurnover}
            />
            {formik.errors.annualTurnover && <div className="text-red-500 text-sm">{formik.errors.annualTurnover}</div>}
          </div>
        </div>
        <button
          type="submit"
          className="w-full p-2 mt-4 bg-blue-600 rounded hover:bg-blue-500 transition duration-200"
        >
          {strings.save}
        </button>
      </form>
      {alertVisible && (
        <div className="mt-4 p-2 bg-green-600 text-white rounded">
          {strings.successMessage}
        </div>
      )}
    </div>
  );
};

export default EditCompanyInformation;