import ViewTitle from "components/custom/ViewTitle"
import { PREVIOUS_URL_KEY } from "constants/app.constant"
import useQuery from "utils/hooks/useQuery"
import ProfileOverview from "./ProfileOverview"
import ProfileApps from "./ProfileApps"
import ProfileAccess from "./ProfileAcces"

export default function Profile() {
  const query = useQuery()

  return (
    <div>
      <div className="flex justify-between mb-6">
        <ViewTitle title="Mi Perfil" showBackPage backPath={decodeURIComponent(query.get(PREVIOUS_URL_KEY)) || '/home'} />
      </div>

      <div className='flex flex-col lg:flex-row gap-4'>
        <ProfileOverview className='col-span-2 lg:w-96 lg:col-span-1' />
        <div className='w-full'>
          <h4 className='mb-4'>Aplicaciones</h4>
          <ProfileApps />
          <h4 className='mt-6 mb-4'>Accesos</h4>
          <ProfileAccess />
        </div>
      </div>
    </div>
  )
}
