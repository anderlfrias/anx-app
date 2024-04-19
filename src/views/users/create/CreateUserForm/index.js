import Confirm from "components/custom/Confirm"
import { StickyFooter } from "components/shared"
import { Button, FormContainer } from "components/ui"
import { userConfig } from "configs/form.config"
import { Form, Formik } from "formik"
import { HiSave } from "react-icons/hi"
import BasicInfoFields from "./BasicInfoFields"
import ChangePasswordFields from "./ChangePasswordFields"

const { validationSchema, defaultValues } = userConfig

export default function CreateUserForm({ onSubmit, onCancel }) {

  return (
    <div>
      <Formik
        initialValues={defaultValues}
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
                <div className=''>
                  <BasicInfoFields className='mb-6' touched={touched} errors={errors} values={values} />
                  <ChangePasswordFields className='mb-6' touched={touched} errors={errors} />
                </div>

                <StickyFooter
                  className='-mx-8 px-8 flex items-center justify-between py-4'
                  stickyClass='border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                >
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
