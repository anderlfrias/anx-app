import ViewTitle from "components/custom/ViewTitle"
import { PREVIOUS_URL_KEY } from "constants/app.constant"
import { useSelector } from "react-redux"
import useQuery from "utils/hooks/useQuery"
import UserDetails from "views/users/profile/UserDetails"

export default function Profile() {
  const { id } = useSelector((state) => state.auth.user)
  const query = useQuery()
  return (
    <div>
      <div className="flex justify-between mb-6">
        <ViewTitle title="Mi Perfil" showBackPage backPath={decodeURIComponent(query.get(PREVIOUS_URL_KEY)) || '/home'} />
      </div>

      <UserDetails id={id} options={{ hideActionsButtons: true }} />
    </div>
  )
}
