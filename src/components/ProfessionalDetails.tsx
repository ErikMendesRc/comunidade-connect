import React from 'react';
import useStrings from '../hooks/useStrings';
import { FaMapMarkerAlt, FaBuilding, FaUserTie, FaCalendarAlt, FaLinkedin } from 'react-icons/fa';

const ProfessionalDetails: React.FC<{ formData: any, handleChange: any, formik: any }> = ({ formData, handleChange, formik }) => {
  const { registerForm } = useStrings();

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{registerForm.location}</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaMapMarkerAlt className="text-gray-400" />
            </span>
            <input
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              className={`bg-gray-50 border ${formik.touched.location && formik.errors.location ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5 dark:bg-neutral-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-highlight dark:focus:border-highlight`}
              placeholder={registerForm.enterLocation}
            />
            {formik.touched.location && formik.errors.location ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.location}</div>
            ) : null}
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{registerForm.company}</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaBuilding className="text-gray-400" />
            </span>
            <input
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              className={`bg-gray-50 border ${formik.touched.company && formik.errors.company ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5 dark:bg-neutral-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-highlight dark:focus:border-highlight`}
              placeholder={registerForm.enterCompany}
            />
            {formik.touched.company && formik.errors.company ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.company}</div>
            ) : null}
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{registerForm.role}</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUserTie className="text-gray-400" />
            </span>
            <input
              name="role"
              type="text"
              value={formData.role}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              className={`bg-gray-50 border ${formik.touched.role && formik.errors.role ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5 dark:bg-neutral-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-highlight dark:focus:border-highlight`}
              placeholder={registerForm.enterRole}
            />
            {formik.touched.role && formik.errors.role ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.role}</div>
            ) : null}
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{registerForm.years}</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaCalendarAlt className="text-gray-400" />
            </span>
            <input
              name="years"
              type="text"
              value={formData.years}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              className={`bg-gray-50 border ${formik.touched.years && formik.errors.years ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5 dark:bg-neutral-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-highlight dark:focus:border-highlight`}
              placeholder={registerForm.enterYears}
            />
            {formik.touched.years && formik.errors.years ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.years}</div>
            ) : null}
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{registerForm.linkedin}</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLinkedin className="text-gray-400" />
            </span>
            <input
              name="linkedin"
              type="text"
              value={formData.linkedin}
              onChange={handleChange}
              onBlur={formik.handleBlur}
              className={`bg-gray-50 border ${formik.touched.linkedin && formik.errors.linkedin ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5 dark:bg-neutral-dark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-highlight dark:focus:border-highlight`}
              placeholder={registerForm.enterLinkedin}
            />
            {formik.touched.linkedin && formik.errors.linkedin ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.linkedin}</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDetails;