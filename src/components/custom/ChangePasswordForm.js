import { PasswordInput } from "components/shared"
import { Button, FormContainer, FormItem } from "components/ui"
import { Field, Form, Formik } from "formik"
import { HiSave } from "react-icons/hi"
import { apiChangePassword } from "services/UserService"
import useRequest from "utils/hooks/useRequest"
import openNotification from "utils/openNotification"
import * as Yup from "yup"

const initialValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
}

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Este campo es requerido'),
  newPassword: Yup.string().required('Este campo es requerido'),
  confirmPassword: Yup.string().required('Este campo es requerido').oneOf([Yup.ref('newPassword'), null], 'Las contraseñas no coinciden')
})

export default function ChangePasswordForm({ userId }) {
  const apiRequest = useRequest()
  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    console.log('values', values)
    setSubmitting(true)
    const resp = await apiRequest(() => apiChangePassword(userId, values))
    console.log('resp', resp)

    if (resp.ok) {
      resetForm()
      openNotification('success', 'Contraseña actualizada', 'Tu contraseña ha sido actualizada correctamente')
    }

    if (!resp.ok) {
      openNotification('error', 'Error', resp.message)
    }

    setSubmitting(false)
  }

  console.log('userId', userId)

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          await onSubmit(values, { resetForm, setSubmitting })
        }}
      >
        {({ touched, errors, values, isSubmitting, }) => {
          return (
            <Form>
              <FormContainer>
                <FormItem
                  className='min-w-max'
                  label="Contraseña actual"
                  invalid={errors.oldPassword && touched.oldPassword}
                  errorMessage={errors.oldPassword}
                >
                  <Field
                    name="oldPassword"
                    type="password"
                    placeholder="Contraseña actual"
                    component={PasswordInput}
                    autoFocus
                  />
                </FormItem>

                <FormItem
                  label="Nueva contraseña"
                  invalid={errors.newPassword && touched.newPassword}
                  errorMessage={errors.newPassword}
                >
                  <Field
                    name="newPassword"
                    type="password"
                    placeholder="Nueva contraseña"
                    component={PasswordInput}
                  />
                </FormItem>

                <FormItem
                  label="Confirmar nueva contraseña"
                  invalid={errors.confirmPassword && touched.confirmPassword}
                  errorMessage={errors.confirmPassword}
                >
                  <Field
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirmar nueva contraseña"
                    component={PasswordInput}
                  />
                </FormItem>

                <FormItem>
                  <Button
                    className='w-full sm:w-auto'
                    variant='solid'
                    type='submit'
                    loading={isSubmitting}
                    icon={<HiSave />}
                  >
                    {isSubmitting ? 'Guardando...' : 'Guardar'}
                  </Button>
                </FormItem>
              </FormContainer>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
