import Confirm from "components/custom/Confirm"
import { StickyFooter } from "components/shared"
import { Button, Card, FormContainer, FormItem, Input } from "components/ui"
import { userConfig } from "configs/form.config"
import { Field, Form, Formik } from "formik"
import { HiSave, HiTrash } from "react-icons/hi"

const { validationSchema, defaultValues } = userConfig

const Fields = [
  { type: 'text', label: 'Nombre', name: 'name', placeholder: 'Nombre' },
  { type: 'text', label: 'Primer apellido', name: 'firstSurname', placeholder: 'Primer apellido' },
  { type: 'text', label: 'Segundo apellido', name: 'secondSurname', placeholder: 'Segundo apellido' },
  { type: 'text', label: 'Nombre de usuario', name: 'username', placeholder: 'Nombre de usuario' },
  { type: 'email', label: 'Email', name: 'email', placeholder: 'Email' },
  { type: 'text', label: 'Código de empleado', name: 'employeeCode', placeholder: 'Código de empleado' },
  { type: 'text', label: 'Número de teléfono', name: 'phoneNumber', placeholder: 'Número de teléfono' }
]

export default function UserForm({ initialValues: propsValues, onSubmit, onDelete, onCancel}) {
  const initialValues = propsValues || defaultValues

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async(values, { resetForm, setSubmitting }) => {
          await onSubmit(values, { resetForm, setSubmitting })
          setSubmitting(false)
        }}
      >
        {({ touched, errors, values, isSubmitting }) => (
          <Form>
            <FormContainer>
              <Card>
                <div className="mb-4">
                  <h5>Información básica</h5>
                  <p>
                    Sesión para configurar la información básica del usuario.
                  </p>
                </div>
                {Fields.map((field, index) => (
                  <FormItem
                    key={index}
                    label={field.label}
                    invalid={!!touched[field.name] && !!errors[field.name]}
                    errorMessage={errors[field.name]}
                  >
                    <Field
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      component={field.component || Input}
                    />
                  </FormItem>
                ))}
              </Card>

              <StickyFooter
                className='-mx-8 px-8 flex items-center justify-between py-4'
                stickyClass='border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              >
                <div>
                  {
                    onDelete && (
                      <Button
                        size='md'
                        type='button'
                        variant='solid'
                        color='red-500'
                        onClick={onDelete}
                        icon={<HiTrash />}
                      >
                        Eliminar
                      </Button>
                    )
                  }
                </div>
                <div className='md:flex items-center'>
                  <Confirm type="warning" onConfirm={onCancel} subtitle={'Se perderán los cambios realizados'}>
                    <Button
                      type='button'
                      className='mr-4'
                    >
                      Cancelar
                    </Button>
                  </Confirm>
                  <Button
                    variant='solid'
                    type='submit'
                    loading={isSubmitting}
                    icon={<HiSave />}
                  >
                    {isSubmitting ? 'Guardando...' : 'Guardar'}
                  </Button>
                </div>
              </StickyFooter>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  )
}
