import ViewTitle from "components/custom/ViewTitle";
import RoleForm from "../Form";
import useRequest from "utils/hooks/useRequest";
import { apiGetRoleById, apiUpdateRole } from "services/RoleService";
import openNotification from "utils/openNotification";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loading } from "components/shared";

export default function EditRole() {
  const apiRequest = useRequest()
  const navigate = useNavigate()
  const { id } = useParams()
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  const onSubmit = async (values) => {
    console.log(values)
    const response = await apiRequest(() => apiUpdateRole(values))

    if (response.ok) {
      openNotification('success', 'Rol editado', 'El rol ha sido editado correctamente')
      navigate(-1)
    } else {
      openNotification('danger', 'Error', 'Error al crear el rol')
      console.error('Error:', response.error)
    }
  }

  const onCancel = () => {
    navigate(-1)
  }

  useEffect(() => {
    const fetchRole = async () => {
      setLoading(true)
      const resp = await apiRequest(() => apiGetRoleById(id))
      console.log(resp)
      if (resp.ok) {
        setRole(resp.data)
      }

      if (!resp.ok) {
        openNotification('danger', 'Error', 'Error al obtener el rol')
        console.error('Error:', resp.error)
      }

      setLoading(false)

    }

    fetchRole()
  }, [apiRequest, id])

  return (
    <>
      <div className="flex justify-between mb-6">
        <ViewTitle title="Editar Roles" showBackPage />
      </div>

      <Loading loading={loading} type="cover" >
        {role && <RoleForm initialValues={role} onSubmit={onSubmit} onCancel={onCancel} />}
      </Loading>
    </>
  )
}
