import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .min(3, 'El código debe tener al menos 3 caracteres')
    .max(6, 'El código debe tener como máximo 6 caracteres')
    .required('El código es requerido'),
  name: Yup.string().required('El nombre es requerido'),
  description: Yup.string(),
  url: Yup.string().url('La URL no es válida'),
});

const defaultValues = {
  code: '',
  name: '',
  description: '',
  url: '',
};

const appConfig = { validationSchema, defaultValues };

export default appConfig;