import ViewTitle from "components/custom/ViewTitle";
import useRequest from "utils/hooks/useRequest";
import openNotification from "utils/openNotification";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loading } from "components/shared";
import PermissionsForm from "../Form";
import { apiDeletePermission, apiGetPermissionById, apiUpdatePermission } from "services/PermissionService";

export default function EditPermission() {
  const apiRequest = useRequest()
  const navigate = useNavigate()
  const { id } = useParams()
  const [permission, setPermission] = useState(null)
  const [loading, setLoading] = useState(true)

  const onSubmit = async (values) => {
    const response = await apiRequest(() => apiUpdatePermission(values))

    if (response.ok) {
      openNotification('success', 'Permiso editado', 'El permiso ha sido editado correctamente')
      navigate(-1)
    } else {
      openNotification('danger', 'Error', response.message)
      console.error('Error:', response.error)
    }
  }

  const onDelete = async () => {
    const response = await apiRequest(() => apiDeletePermission(id))

    if (response.ok) {
      openNotification('success', 'Permiso eliminado', 'El permiso ha sido eliminado correctamente')
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
    const fetchPermission = async () => {
      setLoading(true)
      const resp = await apiRequest(() => apiGetPermissionById(id))
      if (resp.ok) {
        setPermission(resp.data)
      }

      if (!resp.ok) {
        openNotification('danger', 'Error', resp.message)
        console.error('Error:', resp.error)
      }
      setLoading(false)
    }

    fetchPermission()
  }, [apiRequest, id])

  return (
    <>
      <div className="flex justify-between mb-6">
        <ViewTitle title="Editar Permiso" showBackPage />
      </div>

      <Loading loading={loading} type="cover" >
        {permission && <PermissionsForm initialValues={permission} onSubmit={onSubmit} onCancel={onCancel} onDelete={onDelete} />}
      </Loading>
    </>
  )
}
