import React, { useState } from 'react';
import * as Yup from 'yup';
import PersonalDetails from '../components/PersonalDetails';
import ProfessionalDetails from '../components/ProfessionalDetails';
import Alert from '../components/Alert';
import { useFormik } from 'formik';
import { checkWhitelist, createUser, saveUserData, signInWithGoogle, signOut } from '../services/firebaseService';
import { useNavigate } from 'react-router-dom';

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email inválido')
      .required('Email é obrigatório'),
    password: Yup.string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .required('Senha é obrigatória'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'As senhas devem coincidir')
      .required('Confirmação de senha é obrigatória'),
    name: Yup.string().required('Nome é obrigatório'),
    contact: Yup.string().required('Contato é obrigatório'),
    bio: Yup.string(),
    location: Yup.string().required('Localização é obrigatória'),
    company: Yup.string().required('Empresa é obrigatória'),
    role: Yup.string().required('Cargo é obrigatório'),
    years: Yup.string().required('Anos de experiência são obrigatórios'),
    linkedin: Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      contact: '',
      bio: '',
      location: '',
      company: '',
      role: '',
      years: '',
      linkedin: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        const isWhitelisted = await checkWhitelist(values.email);
        if (!isWhitelisted) {
          setAlert({ type: 'error', message: 'Você não está autorizado a se cadastrar na plataforma.' });
          return;
        }

        const user = await createUser(values.email, values.password);

        await saveUserData(user, {
          name: values.name,
          email: values.email,
          contact: values.contact,
          bio: values.bio,
          location: values.location,
          company: values.company,
          role: values.role,
          years: values.years,
          linkedin: values.linkedin,
        });

        setAlert({ type: 'success', message: 'Usuário cadastrado com sucesso!' });
        navigate('/edit-profile');
      } catch (error) {
        setAlert({ type: 'error', message: 'Erro ao cadastrar usuário.' });
        console.error('Erro ao cadastrar usuário:', error);
      }
    },
  });

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();

      const isWhitelisted = await checkWhitelist(user.email!);
      if (!isWhitelisted) {
        setAlert({ type: 'error', message: 'Você não está autorizado a se cadastrar na plataforma.' });
        await signOut();
        return;
      }

      formik.setFieldValue('email', user.email);
      formik.setFieldValue('name', user.displayName);

      await saveUserData(user, {
        name: user.displayName,
        email: user.email,
      });

      setAlert({ type: 'success', message: 'Usuário cadastrado com sucesso usando Google!' });
      navigate('/edit-profile');
    } catch (error) {
      setAlert({ type: 'error', message: 'Erro ao fazer login com Google.' });
      console.error('Erro ao fazer login com Google:', error);
    }
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {alert && (
        <Alert type={alert.type} message={alert.message} />
      )}
      {currentStep === 1 && (
        <PersonalDetails formData={formik.values} formik={formik} handleChange={formik.handleChange} />
      )}
      {currentStep === 2 && (
        <ProfessionalDetails formData={formik.values} formik={formik} handleChange={formik.handleChange} />
      )}
      <div className="mt-6 flex justify-between">
        {currentStep > 1 && (
          <button type="button" onClick={prevStep} className="py-2 px-4 bg-neutral-dark text-white rounded-lg">
            Voltar
          </button>
        )}
        {currentStep < 2 ? (
          <button type="button" onClick={nextStep} className="py-2 px-4 bg-primary text-white rounded-lg">
            Próximo
          </button>
        ) : (
          <button type="submit" className="py-2 px-4 bg-accent text-white rounded-lg">
            Criar Conta
          </button>
        )}
      </div>
      <div className="mt-6 flex flex-col items-center space-y-4">
        <p className="text-gray-700 dark:text-white">Ou registre-se usando</p>
        <button onClick={handleGoogleLogin} type="button" className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.26 1.52 8.1 2.78l6-6C34.96 2.62 29.97 0 24 0 14.64 0 6.61 5.68 3.52 13.95l7.44 5.78C12.71 14.02 18.02 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.08 24.5c0-1.72-.14-3.3-.4-4.83H24v9.13h12.74c-.56 2.94-2.17 5.42-4.64 7.1l7.44 5.78C44.25 37.54 46.08 31.47 46.08 24.5z"/>
            <path fill="#FBBC05" d="M11.8 28.73c-.78-2.35-1.21-4.85-1.21-7.47s.43-5.12 1.21-7.47l-7.44-5.78C2.05 12.58 0 18.07 0 24s2.05 11.42 5.36 16.25l7.44-5.78z"/>
            <path fill="#34A853" d="M24 48c6.47 0 11.89-2.13 15.85-5.79l-7.44-5.78c-2.16 1.45-4.88 2.32-8.41 2.32-6.08 0-11.23-4.09-13.08-9.82l-7.44 5.78C6.61 42.32 14.64 48 24 48z"/>
          </svg>
          Continuar com Google
        </button>
      </div>
    </form>
  );
};

export default MultiStepForm;