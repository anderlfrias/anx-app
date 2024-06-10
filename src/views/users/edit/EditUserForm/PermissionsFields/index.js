import { useContext, useEffect, useState } from "react"
import { apiGetApps } from "services/AppService"
import useRequest from "utils/hooks/useRequest"
import openNotification from "utils/openNotification"
import AppsOptions from "./AppsOptions"
import { apiDeleteAppOfUser, apiPostAppToUser } from "services/UserPermissionServices"
import { useParams } from "react-router-dom"
import UserContext from "../../UserContext"
import { Skeleton } from "components/ui"

const AppsSkeleton = () => (
  <>
    <Skeleton height={150} />
    <Skeleton height={150} />
    <Skeleton height={150} />
    <Skeleton height={150} />
    <Skeleton height={150} />
    <Skeleton height={150} />
    <Skeleton height={150} />
    <Skeleton height={150} />
  </>
)

export default function PermissionsFields({ className }) {
  const { id: userId } = useParams()
  const apiRequest = useRequest()
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(null)
  const [loadingApps, setLoadingApps] = useState(false)
  const { user, setUser } = useContext(UserContext)
  const [appsOfUser, setAppsOfUser] = useState(user.apps.map(userApp => userApp.app))

  const onChangeApp = async (checked, app) => {
    setLoading({
      ...loading,
      [app]: true
    })

    if (!checked) {
      await postUserPermission({ appId: app })
    }

    if (checked) {
      await deleteUserPermission(app)
    }

    setLoading({
      ...loading,
      [app]: false
    })
  }

  const deleteUserPermission = async (appId) => {
    const resp = await apiRequest(() => apiDeleteAppOfUser(userId, appId))
    if (resp.ok) {
      setUser((prev) => ({ ...prev, apps: prev.apps.filter(app => app.app !== appId) }))
    }

    if (!resp.ok) {
      openNotification('error', 'Error', resp.message)
    }
  }

  const postUserPermission = async (data) => {
    const resp = await apiRequest(() => apiPostAppToUser(userId, data))
    if (resp.ok) {
      setUser((prev) => ({ ...prev, apps: [...prev.apps, resp.data] }))
    }

    if (!resp.ok) {
      console.error(resp)
      openNotification('error', 'Error', resp.message)
    }
  }

  useEffect(() => {
    const fetchPermissions = async () => {
      setLoadingApps(true)
      const resp = await apiRequest(() => apiGetApps())
      if (resp.ok) {
        setApps(resp.data.apps)
      }

      if (!resp.ok) {
        console.error(resp)
        openNotification('error', 'Error', resp.message)
      }
      setLoadingApps(false)
    }

    fetchPermissions()
  }, [apiRequest])

  useEffect(() => setAppsOfUser(user.apps.map(userApp => userApp.app)), [user.apps])

  return (
    <div className={className}>
      <div className='mb-6'>
        <h5>Permisos</h5>
        <p>
          Asigna los permisos necesarios para determinar las aplicaciones a las que el usuario tiene acceso.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {loadingApps && <AppsSkeleton />}
        {apps.length > 0 && apps.map(app => (
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
