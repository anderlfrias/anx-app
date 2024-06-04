import Confirm from "components/custom/Confirm"
import { StickyFooter } from "components/shared"
import { Button, Card, FormContainer, Tabs } from "components/ui"
import { userConfig } from "configs/form.config"
import { Form, Formik } from "formik"
import { HiOutlineKey, HiOutlineShieldCheck, HiSave, HiTrash } from "react-icons/hi"
import BasicInfoFields from "./BasicInfoFields"
import ChangePasswordFields from "./ChangePasswordFields"
import { useLocation, useNavigate } from "react-router-dom"
import { FaRegUserCircle } from "react-icons/fa"
import { useEffect } from "react"
import PermissionsFields from "./PermissionsFields"

const { TabNav, TabList, TabContent } = Tabs
const { editValidationSchema: validationSchema } = userConfig

export default function EditUserForm({ initialValues, onSubmit, onCancel, onDelete }) {
  const location = useLocation();
  const navigate = useNavigate();

  const onChangeTab = (tab) => {
    navigate(`${location.pathname}${location.search}#${tab}`)
  }

  useEffect(() => {
    if (location.hash === '') navigate(`${location.pathname}${location.search}#basic-info`)
  }, [location, navigate])

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
        {({ touched, errors, values, isSubmitting, }) => {
          return (
            <Form>
              <FormContainer>
                <Card className='mb-6'>
                  <Tabs value={location.hash.replace('#', '')} onChange={onChangeTab}>
                    <TabList>
                      <TabNav value="basic-info" icon={<FaRegUserCircle />}>Información básica</TabNav>
                      <TabNav value="password" icon={<HiOutlineKey />} >Contraseña</TabNav>
                      <TabNav value="permission" icon={<HiOutlineShieldCheck />}>Permisos</TabNav>
                    </TabList>
                    <div className='mb-4'>
                      <TabContent value="basic-info">
                        <BasicInfoFields className='mt-4' touched={touched} errors={errors} values={values} />
                      </TabContent>

                      <TabContent value="password">
                        <ChangePasswordFields className='mt-4' touched={touched} errors={errors} />
                      </TabContent>

                      <TabContent value="permission">
                        <PermissionsFields className='mt-4' touched={touched} errors={errors} />
                      </TabContent>
                    </div>
                  </Tabs>
                </Card>

                <StickyFooter
                  className='-mx-8 px-8 flex items-center justify-between py-4'
                  stickyClass='border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                >
                  <Confirm type="danger" onConfirm={onDelete} >
                    <Button
                      type='button'
                      variant='twoTone'
                      color='red-500'
                      icon={<HiTrash />}
                    >
                      Eliminar
                    </Button>
                  </Confirm>
                  <div className="flex gap-2">
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
