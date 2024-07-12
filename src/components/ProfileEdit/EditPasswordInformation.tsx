import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import useStrings from '../../hooks/useStrings';
import { Snackbar, Alert, CircularProgress } from '@mui/material';

const EditPasswordInformation: React.FC = () => {
  const strings = useStrings().editPasswordInformation;
  const [alertVisible, setAlertVisible] = useState(false);

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
      currentPassword: Yup.string().required(strings.validation.currentPassword),
      newPassword: Yup.string().min(6, strings.validation.newPassword.minLength).required(strings.validation.newPassword.required),
      confirmPassword: Yup.string().oneOf([Yup.ref('newPassword')], strings.validation.confirmPassword.match).required(strings.validation.confirmPassword.required),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user && user.email) {
        const credential = EmailAuthProvider.credential(user.email, values.currentPassword);
        reauthenticateWithCredential(user, credential).then(() => {
          updatePassword(user, values.newPassword).then(() => {
            setAlertVisible(true);
            setTimeout(() => {
              setAlertVisible(false);
            }, 3000); // Oculta o alerta após 3 segundos
          }).catch((error) => {
            console.error('Error updating password:', error);
            setErrors({ newPassword: error.message });
          });
        }).catch((error) => {
          console.error('Error reauthenticating user:', error);
          setErrors({ currentPassword: error.message });
        }).finally(() => {
          setSubmitting(false);
        });
      }
    },
  });

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 mb-4">
      <Snackbar open={alertVisible} autoHideDuration={3000} onClose={() => setAlertVisible(false)}>
        <Alert onClose={() => setAlertVisible(false)} severity="success" sx={{ width: '100%' }}>
          {strings.successMessage}
        </Alert>
      </Snackbar>
      <h2 className="text-2xl font-semibold mb-4">{strings.title}</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">{strings.currentPassword}</label>
            <input
              type="password"
              name="currentPassword"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
              placeholder={strings.placeholder.currentPassword}
            />
            {formik.errors.currentPassword && <div className="text-red-500 text-sm">{formik.errors.currentPassword}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">{strings.newPassword}</label>
            <input
              type="password"
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
              placeholder={strings.placeholder.newPassword}
            />
            {formik.errors.newPassword && <div className="text-red-500 text-sm">{formik.errors.newPassword}</div>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">{strings.confirmPassword}</label>
            <input
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              className="w-full p-2 mt-1 bg-gray-700 rounded border border-gray-600"
              placeholder={strings.placeholder.confirmPassword}
            />
            {formik.errors.confirmPassword && <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>}
          </div>
        </div>
        <button
          type="submit"
          className="w-full p-2 mt-4 bg-blue-600 rounded hover:bg-blue-500 transition duration-200 flex justify-center items-center"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? <CircularProgress size={24} color="inherit" /> : strings.save}
        </button>
      </form>
    </div>
  );
};

export default EditPasswordInformation;