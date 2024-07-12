import * as Yup from 'yup';
import useStrings from '../hooks/useStrings';

export const useValidationSchema = () => {
  const { registerForm } = useStrings();

  return Yup.object().shape({
    email: Yup.string()
      .email(registerForm.validation.email.invalid)
      .required(registerForm.validation.email.required),
    password: Yup.string()
      .min(6, registerForm.validation.password.minLength)
      .required(registerForm.validation.password.required),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], registerForm.validation.confirmPassword.match)
      .required(registerForm.validation.confirmPassword.required),
    name: Yup.string().required(registerForm.validation.name.required),
    lastName: Yup.string().required(registerForm.validation.lastName.required),
    contact: Yup.string().required(registerForm.validation.contact.required),
    bio: Yup.string(),
    location: Yup.string().required(registerForm.validation.location.required),
    country: Yup.string().required(registerForm.validation.country.required),
    city: Yup.string().required(registerForm.validation.city.required),
    company: Yup.string().required(registerForm.validation.company.required),
    role: Yup.string().required(registerForm.validation.role.required),
    years: Yup.string().required(registerForm.validation.years.required),
    linkedin: Yup.string().required(registerForm.validation.linkedin.required),
    birthday: Yup.string().required(registerForm.validation.birthday.required),
    department: Yup.string().required(registerForm.validation.department.required),
    zip: Yup.string().required(registerForm.validation.zip.required),
  });
};