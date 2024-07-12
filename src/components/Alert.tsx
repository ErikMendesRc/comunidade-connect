import React from 'react';

interface AlertProps {
  type: 'success' | 'error';
  message: string;
}

const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const alertStyles = {
    success: 'bg-teal-50 border-t-2 border-teal-500 rounded-lg p-4 dark:bg-teal-800/30',
    error: 'bg-red-50 border-t-2 border-red-500 rounded-lg p-4 dark:bg-red-800/30',
  };

  const iconStyles = {
    success: 'inline-flex justify-center items-center w-8 h-8 rounded-full border-4 border-teal-100 bg-teal-200 text-teal-800 dark:border-teal-900 dark:bg-teal-800 dark:text-teal-400',
    error: 'inline-flex justify-center items-center w-8 h-8 rounded-full border-4 border-red-100 bg-red-200 text-red-800 dark:border-red-900 dark:bg-red-800 dark:text-red-400',
  };

  const icons = {
    success: (
      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
      </svg>
    ),
    error: (
      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
      </svg>
    ),
  };

  return (
    <div className={alertStyles[type]} role="alert">
      <div className="flex">
        <div className="flex-shrink-0">
          <span className={iconStyles[type]}>
            {icons[type]}
          </span>
        </div>
        <div className="ml-3">
          <h3 className="text-gray-800 font-semibold dark:text-white">
            {type === 'success' ? 'Sucesso!' : 'Erro!'}
          </h3>
          <p className="text-sm text-gray-700 dark:text-neutral-400">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Alert;