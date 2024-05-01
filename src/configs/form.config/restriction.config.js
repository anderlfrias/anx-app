import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre debe tener como máximo 50 caracteres')
    .required('El nombre es requerido'),
  normalizedName: Yup.string()
    .matches(/^[a-z]+[a-z0-9\-.]*$/, 'El nombre normalizado solo puede contener letras minúsculas y números')
    .min(3, 'El nombre normalizado debe tener al menos 3 caracteres')
    .max(20, 'El nombre normalizado debe tener como máximo 20 caracteres')
    .required('El nombre normalizado es requerido'),
  description: Yup.string(),
  app: Yup.string().nullable(),
  role: Yup.string().nullable(),
});

const defaultValues = {
  name: '',
  normalizedName: '',
  description: '',
  app: null,
  role: null,
};

const restrictionConfig = { validationSchema, defaultValues };

export default restrictionConfig;