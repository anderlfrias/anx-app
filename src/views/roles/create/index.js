import ViewTitle from "components/custom/ViewTitle";
import RoleForm from "../Form";
import useRequest from "utils/hooks/useRequest";
import { apiCreateRole } from "services/RoleService";
import openNotification from "utils/openNotification";
import { useNavigate } from "react-router-dom";

export default function CreateRole() {
  const apiRequest = useRequest()
  const navigate = useNavigate()

  const onSubmit = async (values) => {

    const response = await apiRequest(() => apiCreateRole(values))
    if (response.ok) {
      openNotification('success', 'Rol creado', 'El rol ha sido creado correctamente')
      navigate(-1)
    } else {
      openNotification('danger', 'Error', 'Error al crear el rol')
      console.error('Error:', response.error)
    }
  }

  const onCancel = () => {
    navigate(-1)
  }

  return (
    <>
      <div className="flex justify-between mb-6">
        <ViewTitle title="Crear Roles" showBackPage />
      </div>

      <RoleForm
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </>
  )
}
