import React, { useEffect, useState } from 'react';
import { getAuth, User } from 'firebase/auth';
import { getUserData, updateUserProfile } from '../../services/firebaseService';
import useStrings from '../../hooks/useStrings';
import { Alert, Snackbar, CircularProgress } from '@mui/material';

const EditGeneralInformation: React.FC = () => {
  const strings = useStrings().registerForm;
  const [formValues, setFormValues] = useState({
    bio: '',
    company: '',
    contact: '',
    linkedin: '',
    instagram: '',  // Novo campo para Instagram
    country: '',
    name: '',
    profilePicture: '',
    role: '',
    years: '',
    lastName: '',
    city: '',
    birthday: '',
    department: '',
    zipCode: '',
    email: '',
  });
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setFormValues((prevValues) => ({
          ...prevValues,
          email: user.email || '',
        }));

        getUserData(user.uid).then((data) => {
          if (data) {
            setFormValues((prevValues) => ({
              ...prevValues,
              bio: data.bio || '',
              company: data.company || '',
              contact: data.contact || '',
              linkedin: data.linkedin || '',
              instagram: data.instagram || '',  // Novo campo para Instagram
              country: data.country || '',
              name: data.name || '',
              profilePicture: data.profilePicture || '',
              role: data.role || '',
              years: data.years || '',
              lastName: data.lastName || '',
              city: data.city || '',
              birthday: data.birthday || '',
              department: data.department || '',
              zipCode: data.zipCode || '',
              email: user.email || '',
            }));
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting General Information:', formValues);
    await updateUserProfile(formValues);
    console.log('Profile updated');
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000); // Oculta o alerta após 3 segundos
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 mb-4">
      <Snackbar open={alertVisible} autoHideDuration={3000} onClose={() => setAlertVisible(false)}>
        <Alert onClose={() => setAlertVisible(false)} severity="success" sx={{ width: '100%' }}>
          Dados salvos com sucesso!
        </Alert>
      </Snackbar>
      <h2 className="text-2xl font-semibold mb-4">{strings.generalInformation}</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">{strings.name}</label>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">{strings.lastName}</label>
            <input
              type="text"
              name="lastName"
              value={formValues.lastName}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">{strings.country}</label>
            <input
              type="text"
              name="country"
              value={formValues.country}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">{strings.city}</label>
            <input
              type="text"
              name="city"
              value={formValues.city}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">{strings.email}</label>
            <input
              type="text"
              name="email"
              value={formValues.email}
              readOnly
              className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">{strings.phone}</label>
            <input
              type="text"
              name="contact"
              value={formValues.contact}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">{strings.birthday}</label>
            <input
              type="text"
              name="birthday"
              value={formValues.birthday}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">{strings.role}</label>
            <input
              type="text"
              name="role"
              value={formValues.role}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">{strings.department}</label>
            <input
              type="text"
              name="department"
              value={formValues.department}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">{strings.zip}</label>
            <input
              type="text"
              name="zipCode"
              value={formValues.zipCode}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">{strings.company}</label>
            <input
              type="text"
              name="company"
              value={formValues.company}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">{strings.linkedin}</label>
            <input
              type="text"
              name="linkedin"
              value={formValues.linkedin}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">Instagram</label>
            <input
              type="text"
              name="instagram"
              value={formValues.instagram}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">{strings.years}</label>
            <input
              type="text"
              name="years"
              value={formValues.years}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
            />
          </div>
          <div className="mb-4 md:col-span-2">
            <label className="block text-sm font-medium text-gray-400">{strings.bio}</label>
            <textarea
              name="bio"
              value={formValues.bio}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
              rows={4}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full p-2 mt-4 bg-blue-600 rounded hover:bg-blue-500 transition duration-200"
        >
          {strings.saveAll}
        </button>
      </form>
    </div>
  );
};

export default EditGeneralInformation;