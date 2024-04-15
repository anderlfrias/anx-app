import ViewTitle from "components/custom/ViewTitle"
import { useNavigate, useParams } from "react-router-dom"
import UserForm from "../Form"
import { useEffect } from "react"
import useRequest from "utils/hooks/useRequest"
import { apiGetUserById } from "services/UserService"

export default function EditUser() {
  const { id } = useParams()
  const navigate = useNavigate()
  const apiRequest = useRequest()
  console.log(id)

  const onSubmit = (values) => {
    console.log(values)
  }

  const onCancel = () => {
    navigate(-1)
  }

  useEffect(() => {
    console.log('fetch user')
    async function fetchUser() {
      const response = await apiRequest(() => apiGetUserById(id))
      console.log(response)
    }

    fetchUser()
  }, [apiRequest, id])
  return (
    <>
      <div className="flex justify-between mb-6">
        <ViewTitle title="Editar usuario" showBackPage />
      </div>

      <UserForm
        onSubmit={onSubmit}
        onDelete={() => console.log('deleted')}
        onCancel={onCancel}
      />
    </>
  )
}
