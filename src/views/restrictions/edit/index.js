import ViewTitle from "components/custom/ViewTitle";
import useRequest from "utils/hooks/useRequest";
import openNotification from "utils/openNotification";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loading } from "components/shared";
import { apiDeleteRestriction, apiGetRestrictionById, apiUpdateRestriction } from "services/RestrictionService";
import RestrictionForm from "../Form";

export default function EditRestriction() {
  const apiRequest = useRequest()
  const navigate = useNavigate()
  const { id } = useParams()
  const [restriction, setRestriction] = useState(null)
  const [loading, setLoading] = useState(true)

  const onSubmit = async (values) => {
    const response = await apiRequest(() => apiUpdateRestriction(id, values))

    if (response.ok) {
      openNotification('success', 'Restricción editado', 'La restricción ha sido editado correctamente')
      navigate(-1)
    } else {
      openNotification('danger', 'Error', response.message)
      console.error('Error:', response.error)
    }
  }

  const onDelete = async () => {
    const response = await apiRequest(() => apiDeleteRestriction(id))

    if (response.ok) {
      openNotification('success', 'Restricción eliminado', 'La restricción ha sido eliminado correctamente')
      navigate(-1)
    } else {
      openNotification('danger', 'Error', response.message)
      console.error('Error:', response.error)
    }
  }

  const onCancel = () => {
    navigate(-1)
  }

  useEffect(() => {
    const fetchRestriction = async () => {
      setLoading(true)
      const resp = await apiRequest(() => apiGetRestrictionById(id))
      if (resp.ok) {
        setRestriction(resp.data)
      }

      if (!resp.ok) {
        openNotification('danger', 'Error', resp.message)
        console.error('Error:', resp.error)
      }
      setLoading(false)
    }

    fetchRestriction()
  }, [apiRequest, id])

  return (
    <>
      <div className="flex justify-between mb-6">
        <ViewTitle title="Editar Restricción" showBackPage />
      </div>

      <Loading loading={loading} type="cover" >
        {restriction && <RestrictionForm initialValues={restriction} onSubmit={onSubmit} onCancel={onCancel} onDelete={onDelete} />}
      </Loading>
    </>
  )
}
