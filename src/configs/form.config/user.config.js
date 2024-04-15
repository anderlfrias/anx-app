import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  email: Yup.string().email('El email no es válido').required('El email es requerido'),
  username: Yup.string().required('El nombre de usuario es requerido'),
  employeeCode: Yup.string().required('El código de empleado es requerido'),
  firstSurname: Yup.string(),
  secondSurname: Yup.string(),
  phoneNumber: Yup.string(),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
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
  confirmPassword: ''
};

const userConfig = { validationSchema, defaultValues };

export default userConfig;
