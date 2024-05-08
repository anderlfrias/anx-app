import ViewTitle from 'components/custom/ViewTitle'
import UserDetails from './UserDetails'
import { useParams } from 'react-router-dom'

export default function Profile() {
  const { id } = useParams()
  return (
    <div>
      <div className="flex justify-between mb-6">
        <ViewTitle title="Perfil de usuario" showBackPage />
      </div>

      <UserDetails id={id} />
    </div>
  )
}
