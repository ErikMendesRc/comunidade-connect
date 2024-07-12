import React from 'react';
import useStrings from '../hooks/useStrings';
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';

const PersonalDetails: React.FC<{ formData: any, handleChange: any, formik: any }> = ({ formData, handleChange, formik }) => {
  const { registerForm } = useStrings();

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{registerForm.name}</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="text-gray-400" />
            </span>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleChange} // Adicionar onBlur para validação no blur
              className={`bg-gray-50 border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5 dark:bg-neutral-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-highlight dark:focus:border-highlight`}
              placeholder={registerForm.enterName}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
            ) : null}
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{registerForm.email}</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="text-gray-400" />
            </span>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleChange} // Adicionar onBlur para validação no blur
              className={`bg-gray-50 border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5 dark:bg-neutral-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-highlight dark:focus:border-highlight`}
              placeholder={registerForm.enterEmail}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            ) : null}
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{registerForm.phone}</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaPhone className="text-gray-400" />
            </span>
            <input
              name="contact"
              type="text"
              value={formData.contact}
              onChange={handleChange}
              onBlur={handleChange} // Adicionar onBlur para validação no blur
              className={`bg-gray-50 border ${formik.touched.contact && formik.errors.contact ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5 dark:bg-neutral-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-highlight dark:focus:border-highlight`}
              placeholder={registerForm.enterPhone}
            />
            {formik.touched.contact && formik.errors.contact ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.contact}</div>
            ) : null}
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{registerForm.password}</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-gray-400" />
            </span>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleChange} // Adicionar onBlur para validação no blur
              className={`bg-gray-50 border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5 dark:bg-neutral-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-highlight dark:focus:border-highlight`}
              placeholder={registerForm.enterPassword}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            ) : null}
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{registerForm.confirmPassword}</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-gray-400" />
            </span>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleChange} // Adicionar onBlur para validação no blur
              className={`bg-gray-50 border ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5 dark:bg-neutral-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-highlight dark:focus:border-highlight`}
              placeholder={registerForm.enterConfirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
            ) : null}
          </div>
        </div>
        <div className="col-span-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{registerForm.bio}</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5 dark:bg-neutral-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-highlight dark:focus:border-highlight"
            placeholder={registerForm.enterBio}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;