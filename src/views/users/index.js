import ViewTitle from "components/custom/ViewTitle";
import UsersList from "./UsersList";
import { Button } from "components/ui";
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import Filter from "components/custom/Filter";

export default function Users() {
  return (
    <>
      <div className="flex justify-between mb-6">
        <ViewTitle title="Usuarios" />

        <div className="flex justify-end gap-2 w-full">
          <Filter />
          <Link to="/users/create">
            <Button size="sm" variant='solid' icon={<FaUserPlus />} >Crear Usuario</Button>
          </Link>
        </div>
      </div>

      <UsersList />
    </>
  )
}
