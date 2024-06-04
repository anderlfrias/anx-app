import ViewTitle from 'components/custom/ViewTitle'
import UserDetails from './UserDetails'
import { useParams } from 'react-router-dom'
import useQuery from 'utils/hooks/useQuery'
import { REDIRECT_URL_KEY } from 'constants/app.constant'

export default function Profile() {
  const { id } = useParams()
  const query = useQuery()
  return (
    <div>
      <div className="flex justify-between mb-6">
        <ViewTitle title="Perfil de usuario" showBackPage backPath={query.get(REDIRECT_URL_KEY) || '/users'} />
      </div>

      <UserDetails id={id} />
    </div>
  )
}
