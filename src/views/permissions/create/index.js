import ViewTitle from "components/custom/ViewTitle";
import useRequest from "utils/hooks/useRequest";
import openNotification from "utils/openNotification";
import { useNavigate } from "react-router-dom";
import { apiCreatePermission } from "services/PermissionService";
import PermissionsForm from "../Form";

export default function CreatePermission() {
  const apiRequest = useRequest()
  const navigate = useNavigate()

  const onSubmit = async (values) => {

    const response = await apiRequest(() => apiCreatePermission(values))
    if (response.ok) {
      openNotification('success', 'Permiso creado', 'El premiso ha sido creado correctamente')
      navigate(-1)
    } else {
      openNotification('danger', 'Error', response.message)
      console.error('Error:', response.error)
    }
  }

  const onCancel = () => {
    navigate(-1)
  }

  return (
    <>
      <div className="flex justify-between mb-6">
        <ViewTitle title="Crear Permiso" showBackPage />
      </div>

      <PermissionsForm
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </>
  )
}
