import Confirm from "components/custom/Confirm"
import { StickyFooter } from "components/shared"
import { Button, Card, FormContainer, FormItem, Input } from "components/ui"
import { Field, Form, Formik } from "formik"
import { HiSave, HiTrash } from "react-icons/hi"
import { restrictionConfig } from "configs/form.config"
import AppsAsyncSelect from "components/custom/AppsAsyncSelect"
import RolesAsyncSelect from "components/custom/RolesAsyncSelect"

const { validationSchema, defaultValues } = restrictionConfig

export default function RestrictionForm({ initialValues: propsValues, onSubmit, onDelete, onCancel }) {
  const initialValues = propsValues || defaultValues

  const onChangeName = (name, form) => {
    if (!propsValues) {
      let normalizedName = name.replace(/\s/g, '').toLowerCase()
      if (normalizedName.length > 20) normalizedName = normalizedName.slice(0, 20)
      form.setFieldValue('normalizedName', normalizedName)
    }
    form.setFieldValue('name', name)
  }

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
          {({ touched, errors, values, isSubmitting, }) => {
            return (
              <Form>
                <FormContainer>
                  <Card className='mb-6'>
                    <div className='mb-4'>
                      <h5>Formulario de restricciones</h5>
                    </div>
                    <FormItem
                      label='Nombre'
                      invalid={errors.name && touched.name}
                      errorMessage={errors.name}
                    >
                      <Field name='name'>
                      {({ field, form }) => (
                        <Input
                          field={field}
                          form={form}
                          type="text"
                          placeholder='Nombre'
                          value={values.name}
                          onChange={(e) => onChangeName(e.target.value, form)}
                          autoFocus
                        />
                      )}
                      </Field>
                    </FormItem>

                    <FormItem
                      label='Nombre normalizado'
                      invalid={errors.normalizedName && touched.normalizedName}
                      errorMessage={errors.normalizedName}
                    >
                      <Field
                        name='normalizedName'
                        type='text'
                        placeholder='Nombre normalizado'
                        disabled={!!propsValues}
                        component={Input}
                      />
                    </FormItem>

                    <FormItem
                      label='Apliación'
                      invalid={errors.app && touched.app}
                      errorMessage={errors.app}
                    >
                      <Field name='app'>
                      {({ field, form }) => (
                        <AppsAsyncSelect
                          field={field}
                          form={form}
                          value={values.app}
                          onChange={(app) => form.setFieldValue('app', app?.value || null)}
                          placeholder={'Seleccione una aplicación'}
                        />
                      )}
                      </Field>
                    </FormItem>

                    <FormItem
                      label='Rol'
                      invalid={errors.role && touched.role}
                      errorMessage={errors.role}
                    >
                      <Field name='role'>
                      {({ field, form }) => (
                        <RolesAsyncSelect
                          field={field}
                          form={form}
                          value={values.role}
                          onChange={(role) => form.setFieldValue('role', role?.value || null)}
                          placeholder={'Seleccione un rol'}
                        />
                      )}
                      </Field>
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
