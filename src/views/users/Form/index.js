import Confirm from "components/custom/Confirm"
import { StickyFooter } from "components/shared"
import { Button, FormContainer } from "components/ui"
import { userConfig } from "configs/form.config"
import { Form, Formik } from "formik"
import { HiSave, HiTrash } from "react-icons/hi"
import BasicInfoFields from "./BasicInfoFields"
import ChangePasswordFields from "./ChangePasswordFields"

const { validationSchema, defaultValues } = userConfig

export default function UserForm({ initialValues: propsValues, onSubmit, onDelete, onCancel }) {
  const initialValues = propsValues || defaultValues

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          await onSubmit(values, { resetForm, setSubmitting })
          setSubmitting(false)
        }}
      >
        {({ touched, errors, values, isSubmitting,  }) => {
          return (
            <Form>
              <FormContainer>
                <BasicInfoFields touched={touched} errors={errors} values={values} />
                <ChangePasswordFields touched={touched} errors={errors} propsValues={propsValues} />

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
  )
}
