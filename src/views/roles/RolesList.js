import { useEffect } from "react"
import { apiGetRoles } from "services/RoleService"
import useRequest from "utils/hooks/useRequest"

export default function RolesList() {
  const apiRequest = useRequest()

  useEffect(() => {
    const fetchRoles = async () => {
      const resp = await apiRequest(() => apiGetRoles())
      console.log('resp:', resp)
    }

    fetchRoles()
  }, [apiRequest])
  return (
    <div>
      Role List
    </div>
  )
}