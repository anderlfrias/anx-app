import { useEffect, useState } from "react"
import { apiGetApps } from "services/AppService"
import useRequest from "utils/hooks/useRequest"
import openNotification from "utils/openNotification"
import AppsOptions from "./AppsOptions"
import { apiDeleteUserPermissionByUserAndApp, apiPostUserPermission } from "services/UserPermissionServices"
import { useParams } from "react-router-dom"

export default function PermissionsFields({ className, user }) {
  const { id } = useParams()
  const apiRequest = useRequest()
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(null)
  const [appsOfUser, setAppsOfUser] = useState(user.permissions.map(permission => permission.app))

  const onChangeApp = async(checked, app) => {
    setLoading({
      ...loading,
      [app]: true
    })

    if (checked) {
      await postUserPermission({ userId: id, appId: app })
    }

    if (!checked) {
      await deleteUserPermission(id, app)
    }

    setLoading({
      ...loading,
      [app]: false
    })
  }

  const deleteUserPermission = async (userId, appId) => {
    const resp = await apiRequest(() => apiDeleteUserPermissionByUserAndApp(userId, appId))

    if (resp.ok) {
      openNotification('success', 'Success', 'Aplicación eliminada correctamente')
    }

    if (!resp.ok) {
      console.error(resp)
      setAppsOfUser(appsOfUser.filter(app => app !== appId))
      openNotification('error', 'Error', resp.message)
    }
  }

  const postUserPermission = async (data) => {
    const resp = await apiRequest(() => apiPostUserPermission(data))

    if (resp.ok) {
      setAppsOfUser([...appsOfUser, resp.data.app])
      openNotification('success', 'Success', 'Aplicación asignada correctamente')
    }

    if (!resp.ok) {
      console.error(resp)
      openNotification('error', 'Error', resp.message)
    }
  }

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
            <AppsOptions
              key={app.id}
              app={app}
              onChange={onChangeApp}
              loading={loading?.[app.id]}
              active={appsOfUser.includes(app.id)}
            />
        ))}
      </div>
    </div>
  )
}
