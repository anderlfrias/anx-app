import ViewTitle from "components/custom/ViewTitle";
import UserForm from "../Form";
import { useNavigate } from "react-router-dom";
import useRequest from "utils/hooks/useRequest";
import { apiCreateUser } from "services/UserService";
import openNotification from "utils/openNotification";

export default function Create() {
  const navigate = useNavigate()
  const apiRequest = useRequest()

  const onSubmit = async (values) => {
    console.log(values)

    if (values.password !== values.confirmPassword) {
      openNotification('error', 'Error!', 'Las contraseñas no coinciden')
      return
    }

    delete values.confirmPassword
    const response = await apiRequest(() => apiCreateUser(values))

    if (response.ok) {
      openNotification('success', 'Completado!', 'Usuario creado exitosamente')
      navigate(-1)
    } else {
      console.log(response)
      openNotification('error', 'Error!', 'Ocurrió un error al crear el usuario')
    }
  }

  const onCancel = () => {
    navigate(-1)
  }
  return (
    <>
      <div className="flex justify-between mb-6">
        <ViewTitle title="Crear usuarios" showBackPage />
      </div>

      <UserForm
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </>
  )
}
