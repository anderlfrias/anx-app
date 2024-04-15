import ViewTitle from "components/custom/ViewTitle";
import RolesList from "./RolesList";
import { Link } from "react-router-dom";
import { Button, Input } from "components/ui";
import { HiPlusCircle } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";

export default function Roles() {
  return (
    <>
      <div className="flex justify-between mb-6">
        <ViewTitle title="Roles" />

        <div className="flex justify-end gap-2 w-full">
          <Input
            className="w-56"
            size="sm"
            placeholder="Buscar..."
            prefix={<FaSearch />}
          />
          <Link to="/roles/create">
            <Button size="sm" variant='solid' icon={<HiPlusCircle />} >Crear Rol</Button>
          </Link>
        </div>
      </div>

      <RolesList />
    </>
  )
}