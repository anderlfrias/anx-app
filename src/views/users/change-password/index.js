import ChangePasswordForm from "components/custom/ChangePasswordForm";
import ViewTitle from "components/custom/ViewTitle";
import { Card } from "components/ui";
import { useNavigate, useParams } from "react-router-dom";
import { apiChangePassword } from "services/UserService";
import useRequest from "utils/hooks/useRequest";
import openNotification from "utils/openNotification";

export default function ChangePasswordAdmin() {
  const apiRequest = useRequest()
  const { id } = useParams()
  const navigate = useNavigate()

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    setSubmitting(true)
    if (values.oldPassword === values.newPassword) {
      openNotification('danger', 'Error', 'La nueva contraseña no puede ser igual a la antigua')
      return;
    }

    const resp = await apiRequest(() => apiChangePassword(id, values))
    if (resp.ok) {
      resetForm()
      openNotification('success', 'Contraseña actualizada', 'Tu contraseña ha sido actualizada correctamente')
      navigate(-1)
    }

    if (!resp.ok) {
      openNotification('error', 'Error', resp.message)
    }

    setSubmitting(false)
  }

  return (
    <>
      <div className='mb-6'>
        <ViewTitle title='Cambiar Contraseña' showBackPage />
      </div>
      
      <Card>
        <ChangePasswordForm onSubmit={onSubmit}/>
      </Card>
    </>
  )
}
