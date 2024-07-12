import React, { useState, useEffect } from 'react';
import { useFormik, FormikValues } from 'formik';
import { useValidationSchema } from '../validations/validations';
import { updateUserProfile, isUserLoggedIn } from '../services/firebaseService';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';

interface FormValues extends FormikValues {
  bio: string;
  company: string;
  contact: string;
  linkedin: string;
  location: string;
  country: string;
  city: string;
  name: string;
  lastName: string;
  role: string;
  years: string;
  birthday: string;
  department: string;
  zip: string;
  email: string;
}

const EditProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const validationSchema = useValidationSchema();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDoc = await getDoc(doc(firestore, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as FormValues;
          formik.setValues({
            bio: userData.bio || '',
            company: userData.company || '',
            contact: userData.contact || '',
            linkedin: userData.linkedin || '',
            location: userData.location || '',
            country: userData.country || '',
            city: userData.city || '',
            name: userData.name || '',
            lastName: userData.lastName || '',
            role: userData.role || '',
            years: userData.years || '',
            birthday: userData.birthday || '',
            department: userData.department || '',
            zip: userData.zip || '',
            email: userData.email || '',
          });
        }
      }
    });
  }, [auth]);

  const formik = useFormik<FormValues>({
    initialValues: {
      bio: '',
      company: '',
      contact: '',
      linkedin: '',
      location: '',
      country: '',
      city: '',
      name: '',
      lastName: '',
      role: '',
      years: '',
      birthday: '',
      department: '',
      zip: '',
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      if (user) {
        await updateUserProfile({ uid: user.uid, ...values });
        alert('Perfil atualizado com sucesso!');
      }
    }
  });

  return (
    <div className="min-h-screen bg-neutral-dark flex justify-center items-center">
      <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">General Information</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">First Name</label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
              />
              {formik.errors.name && <div className="text-red-500 text-sm">{formik.errors.name}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
              />
              {formik.errors.lastName && <div className="text-red-500 text-sm">{formik.errors.lastName}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">Country</label>
              <input
                type="text"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
              />
              {formik.errors.country && <div className="text-red-500 text-sm">{formik.errors.country}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">City</label>
              <input
                type="text"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
              />
              {formik.errors.city && <div className="text-red-500 text-sm">{formik.errors.city}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">Address</label>
              <input
                type="text"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
              />
              {formik.errors.location && <div className="text-red-500 text-sm">{formik.errors.location}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">Email</label>
              <input
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
              />
              {typeof formik.errors.email === 'string' && <div className="text-red-500 text-sm">{formik.errors.email}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">Phone Number</label>
              <input
                type="text"
                name="contact"
                value={formik.values.contact}
                onChange={formik.handleChange}
                className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
              />
              {typeof formik.errors.contact === 'string' && <div className="text-red-500 text-sm">{formik.errors.contact}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">Birthday</label>
              <input
                type="text"
                name="birthday"
                value={formik.values.birthday}
                onChange={formik.handleChange}
                className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
              />
              {typeof formik.errors.birthday === 'string' && <div className="text-red-500 text-sm">{formik.errors.birthday}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">Organization</label>
              <input
                type="text"
                name="company"
                value={formik.values.company}
                onChange={formik.handleChange}
                className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
              />
              {typeof formik.errors.company === 'string' && <div className="text-red-500 text-sm">{formik.errors.company}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">Role</label>
              <input
                type="text"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
              />
              {typeof formik.errors.role === 'string' && <div className="text-red-500 text-sm">{formik.errors.role}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">Department</label>
              <input
                type="text"
                name="department"
                value={formik.values.department}
                onChange={formik.handleChange}
                className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
              />
              {typeof formik.errors.department === 'string' && <div className="text-red-500 text-sm">{formik.errors.department}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">Zip/Postal Code</label>
              <input
                type="text"
                name="zip"
                value={formik.values.zip}
                onChange={formik.handleChange}
                className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
              />
              {typeof formik.errors.zip === 'string' && <div className="text-red-500 text-sm">{formik.errors.zip}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">Bio</label>
              <textarea
                name="bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
                className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
              />
              {typeof formik.errors.bio === 'string' && <div className="text-red-500 text-sm">{formik.errors.bio}</div>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400">LinkedIn</label>
              <input
                type="text"
                name="linkedin"
                value={formik.values.linkedin}
                onChange={formik.handleChange}
                className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
              />
              {typeof formik.errors.linkedin === 'string' && <div className="text-red-500 text-sm">{formik.errors.linkedin}</div>}
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-2 mt-4 bg-blue-600 rounded hover:bg-blue-500 transition duration-200"
          >
            Save all
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;