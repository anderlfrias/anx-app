import ViewTitle from "components/custom/ViewTitle";
import { useNavigate } from "react-router-dom";
import useRequest from "utils/hooks/useRequest";
import { apiCreateUser } from "services/UserService";
import openNotification from "utils/openNotification";
import CreateUserForm from "./CreateUserForm";

export default function Create() {
  const navigate = useNavigate()
  const apiRequest = useRequest()

  const onSubmit = async (values) => {
    console.log(values)

    if (values.password !== values.confirmPassword) {
      openNotification('error', 'Error!', 'Las contraseñas no coinciden')
      return
    }

    const response = await apiRequest(() => apiCreateUser(values))

    if (response.ok) {
      openNotification('success', 'Completado!', 'Usuario creado exitosamente')
      navigate('/users')
    } else {
      console.log(response)
      openNotification('error', 'Error!', response.message)
    }
  }

  const onCancel = () => {
    navigate('/users')
  }
  return (
    <>
      <div className="flex justify-between mb-6">
        <ViewTitle title="Crear usuarios" showBackPage backPath='/users' />
      </div>

      <CreateUserForm
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </>
  )
}
