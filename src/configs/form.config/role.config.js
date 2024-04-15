import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .required('El nombre es requerido'),
  normalizedName: Yup.string()
    .matches(/^[a-z]+[a-z0-9\-.]*$/, 'El nombre normalizado solo puede contener letras minúsculas y números')
    .min(3, 'El nombre normalizado debe tener al menos 3 caracteres')
    .required('El nombre normalizado es requerido'),
  app: Yup.string()
    .required('La aplicación es requerida')
    .nullable()
});

const defaultValues = {
  name: '',
  normalizedName: '',
  app: ''
};

const roleConfig = { validationSchema, defaultValues };

export default roleConfig;