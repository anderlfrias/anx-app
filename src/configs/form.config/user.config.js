import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es requerido'),
  email: Yup.string().email('El email no es válido').required('El email es requerido'),
  username: Yup.string().required('El nombre de usuario es requerido'),
  employeeCode: Yup.string().required('El código de empleado es requerido'),
  firstSurname: Yup.string(),
  secondSurname: Yup.string(),
  phoneNumber: Yup.string()
});

const defaultValues = {
  name: '',
  email: '',
  username: '',
  employeeCode: '',
  firstSurname: '',
  secondSurname: '',
  phoneNumber: ''
};

const userConfig = { validationSchema, defaultValues };

export default userConfig;
