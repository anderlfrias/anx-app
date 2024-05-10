import ViewTitle from 'components/custom/ViewTitle'
import UsersAccessList from './AccessList'

export default function UsersAccess() {
  return (
    <div>
      <div className="flex justify-between mb-6">
        <ViewTitle title="Accesos de usuario" />
      </div>

      <UsersAccessList />
    </div>
  )
}
