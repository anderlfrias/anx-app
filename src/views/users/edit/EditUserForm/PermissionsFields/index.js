import { useEffect, useState } from "react"
import { apiGetApps } from "services/AppService"
import useRequest from "utils/hooks/useRequest"
import openNotification from "utils/openNotification"
import AppsOptions from "./AppsOptions"

export default function PermissionsFields({ className }) {
  const apiRequest = useRequest()
  const [apps, setApps] = useState([])

  useEffect(() => {
    const fetchPermissions = async () => {
      const resp = await apiRequest(() => apiGetApps())

      if (resp.ok) {
        setApps(resp.data)
      }

      if (!resp.ok) {
        console.error(resp)
        openNotification('error', 'Error', resp.message)
      }
    }

    fetchPermissions()
  }, [apiRequest])

  console.log(apps)
  return (
    <div className={className}>
      <div className='mb-6'>
        <h5>Permisos</h5>
        <p>
          Asigna los permisos necesarios para determinar las aplicaciones a las que el usuario tiene acceso.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {apps.map(app => (
          <AppsOptions key={app.id} app={app} />
        ))}
      </div>
    </div>
  )
}
