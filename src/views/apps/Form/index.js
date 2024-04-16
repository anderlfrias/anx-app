import Confirm from "components/custom/Confirm"
import { StickyFooter } from "components/shared"
import { Button, Card, FormContainer, FormItem, Input } from "components/ui"
import { appConfig } from "configs/form.config"
import { Field, Form, Formik } from "formik"
import { HiSave, HiTrash } from "react-icons/hi"

const { validationSchema, defaultValues } = appConfig

export default function AppForm({ initialValues: propsValues, onSubmit, onDelete, onCancel }) {
  const initialValues = propsValues || defaultValues
  return (
    <div>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            await onSubmit(values, { resetForm, setSubmitting })
            setSubmitting(false)
          }}
        >
          {({ touched, errors, isSubmitting, }) => {
            return (
              <Form>
                <FormContainer>
                  <Card className='mb-6'>
                    <div className='mb-4'>
                      <h5>Formulario de aplicaciones</h5>
                    </div>

                    <FormItem
                      label='Código'
                      invalid={errors.code && touched.code}
                      errorMessage={errors.code}
                    >
                      <Field
                        name='code'
                        type='text'
                        placeholder='Código'
                        component={Input}
                      />
                    </FormItem>

                    <FormItem
                      label='Nombre'
                      invalid={errors.name && touched.name}
                      errorMessage={errors.name}
                    >
                      <Field
                        name='name'
                        type='text'
                        placeholder='Nombre'
                        component={Input}
                      />
                    </FormItem>

                    <FormItem
                      label='Descripción'
                      invalid={errors.description && touched.description}
                      errorMessage={errors.description}
                    >
                      <Field
                        name='description'
                        type='text'
                        placeholder='Descripción'
                        component={Input}
                        textArea
                      />
                    </FormItem>

                    <FormItem
                      label='URL'
                      invalid={errors.url && touched.url}
                      errorMessage={errors.url}
                    >
                      <Field
                        name='url'
                        type='text'
                        placeholder='URL'
                        component={Input}
                      />
                    </FormItem>
                    
                  </Card>
                  <StickyFooter
                    className='-mx-8 px-8 flex items-center justify-between py-4'
                    stickyClass='border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                  >
                    <div>
                      {
                        onDelete && (
                          <Confirm type="danger" onConfirm={onDelete} >
                            <Button
                              size='md'
                              type='button'
                              variant='solid'
                              color='red-500'
                              icon={<HiTrash />}
                            >
                              Eliminar
                            </Button>
                          </Confirm>
                        )
                      }
                    </div>
                    <div className='flex items-center'>
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
            )
          }}
        </Formik>
      </div>
    </div>
  )
}
