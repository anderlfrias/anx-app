import ViewTitle from "components/custom/ViewTitle"
import { useNavigate, useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import useRequest from "utils/hooks/useRequest"
import { apiGetUserById, apiUpdateUser } from "services/UserService"
import openNotification from "utils/openNotification"
import { Loading } from "components/shared"
import EditUserForm from "./EditUserForm"
import { UserContextProvider } from "./UserContext"

export default function EditUser() {
  const { id } = useParams()
  const navigate = useNavigate()
  const apiRequest = useRequest()
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  const onSubmit = async (values) => {
    console.log(values)

    const resp = await apiRequest(() => apiUpdateUser(id, values))
    console.log(resp)
    if (resp.ok) {
      openNotification('success', 'Usuario actualizado', 'El usuario ha sido actualizado correctamente')
      navigate('/users')
    }

    if (!resp.ok) {
      openNotification('error', 'Error', resp.message)
    }
  }

  const onCancel = () => {
    navigate('/users')
  }

  useEffect(() => {
    async function fetchUser() {
      setLoading(true)
      const response = await apiRequest(() => apiGetUserById(id))
      console.log(response)
      setLoading(false)
      if (response.ok) {
        setUser({
          ...response.data.user,
          password: '',
          passwordConfirmation: ''
        })
      }

      if (!response.ok) {
        openNotification('error', 'Error', response.message)
        navigate('/users')
      }
    }

    fetchUser()
  }, [apiRequest, id, navigate])

  return (
    <UserContextProvider value={{ user }}>
      <div className="flex justify-between mb-6">
        <ViewTitle title="Editar usuario" backPath={'/users'} showBackPage />
      </div>

      <Loading loading={loading}>
        <EditUserForm
          initialValues={user}
          onSubmit={onSubmit}
          onDelete={() => console.log('deleted')}
          onCancel={onCancel}
        />
      </Loading>
    </UserContextProvider>
  )
}
