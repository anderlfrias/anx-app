import { Skeleton } from "components/ui";
import { useEffect, useState } from "react"
import { apiGetAppsOfUser } from "services/ProfileServices";
import useRequest from "utils/hooks/useRequest"
import AppsOfUser from "views/users/profile/UserDetails/AppsOfUser";

const AppSkeleton = () => (
  <div className="flex flex-col gap-4">
    <Skeleton height={120} />
  </div>
)

export default function ProfileApps() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiRequest = useRequest()

  useEffect(() => {
    async function getApps() {
      setLoading(true)
      const resp = await apiRequest(apiGetAppsOfUser)

      if (resp.ok) {
        setApps(resp.data)
      }
      setLoading(false)

    }

    getApps()
  }, [apiRequest])

  return (
    <>
      {loading && (
        <div className="grid grid-cols-3 gap-4">
          <AppSkeleton />
          <AppSkeleton />
          <AppSkeleton />
        </div>
      )}
      {apps.length === 0 && !loading && <p className='text-gray-500 dark:text-gray-400 italic w-full text-center'>
        Este usuario no tiene aplicaciones asignadas
      </p>}
      <AppsOfUser apps={apps} />
    </>
  )
}
