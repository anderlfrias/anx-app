import ViewTitle from "components/custom/ViewTitle"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import useRequest from "utils/hooks/useRequest"
import { apiGetUserById, apiUpdateUser } from "services/UserService"
import openNotification from "utils/openNotification"
import { Loading } from "components/shared"

export default function EditUser() {
  const { id } = useParams()
  const navigate = useNavigate()
  const apiRequest = useRequest()
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  const onSubmit = async(values) => {
    console.log(values)

    const resp = await apiRequest(() => apiUpdateUser(id, values))
    console.log(resp)
    if (resp.ok) {
      openNotification('success', 'Usuario actualizado', 'El usuario ha sido actualizado correctamente')
      navigate(-1)
    }

    if (!resp.ok) {
      openNotification('error', 'Error', resp.data.message)
    }
  }

  const onCancel = () => {
    navigate(-1)
  }

  useEffect(() => {
    async function fetchUser() {
      setLoading(true)
      const response = await apiRequest(() => apiGetUserById(id))
      console.log(response)
      if (response.ok) {
        setUser({
          ...response.data.user,
          password: '',
          passwordConfirmation: ''
        })
      }
      
      if (!response.ok) {
        openNotification('error', 'Error', response.data.message)
      }
      setLoading(false)
    }

    fetchUser()
  }, [apiRequest, id, navigate])

  console.log(user)
  return (
    <>
      <div className="flex justify-between mb-6">
        <ViewTitle title="Editar usuario" showBackPage />
      </div>

      <Loading loading={loading}>
        {/* <UserForm
          initialValues={user}
          onSubmit={onSubmit}
          onDelete={() => console.log('deleted')}
          onCancel={onCancel}
        /> */}
      </Loading>
    </>
  )
}
