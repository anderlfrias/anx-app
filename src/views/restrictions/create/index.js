import ViewTitle from "components/custom/ViewTitle";
import useRequest from "utils/hooks/useRequest";
import openNotification from "utils/openNotification";
import { useNavigate } from "react-router-dom";
import { apiCreateRestriction } from "services/RestrictionService";
import RestrictionForm from "../Form";

export default function CreatePermission() {
  const apiRequest = useRequest()
  const navigate = useNavigate()

  const onSubmit = async (values) => {

    const response = await apiRequest(() => apiCreateRestriction(values))
    if (response.ok) {
      openNotification('success', 'Restricción creada', 'La restricción ha sido creado correctamente')
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
        <ViewTitle title="Crear Restricción" showBackPage />
      </div>

      <RestrictionForm
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </>
  )
}
