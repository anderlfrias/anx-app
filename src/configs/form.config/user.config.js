import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(20, 'El nombre debe tener como máximo 20 caracteres')
    .required('El nombre es requerido'),
  email: Yup.string().email('El email no es válido').required('El email es requerido'),
  username: Yup.string()
    .min(5, 'El nombre de usuario debe tener al menos 5 caracteres')
    .max(20, 'El nombre de usuario debe tener como máximo 20 caracteres')
    .matches(/^[a-z]+[a-z0-9/.]*$/, 'El nombre de usuario no es válido')
    .required('El nombre de usuario es requerido'),
  employeeCode: Yup.string(),
  firstSurname: Yup.string()
    .min(3, 'El apellido debe tener al menos 3 caracteres')
    .max(20, 'El apellido debe tener como máximo 20 caracteres'),
  secondSurname: Yup.string()
    .min(3, 'El apellido debe tener al menos 3 caracteres')
    .max(20, 'El apellido debe tener como máximo 20 caracteres'),
  phoneNumber: Yup.string(),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden'),
  profilePicture: Yup.string()
});

const defaultValues = {
  name: '',
  email: '',
  username: '',
  employeeCode: '',
  firstSurname: '',
  secondSurname: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  profilePicture: ''
};

const userConfig = { validationSchema, defaultValues };

export default userConfig;
