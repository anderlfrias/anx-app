import ViewTitle from "components/custom/ViewTitle";
import { Link } from "react-router-dom";
import { Button } from "components/ui";
import { HiPlusCircle } from "react-icons/hi";
import Filter from "components/custom/Filter";
import PermissionsList from "./PermissionsList";

export default function Roles() {
  return (
    <>
      <div className="flex justify-between mb-6">
        <ViewTitle title="Permisos" />

        <div className="flex justify-end gap-2 w-full">
          <Filter />
          <Link to="/permissions/create">
            <Button size="sm" variant='solid' icon={<HiPlusCircle />} >Crear Permiso</Button>
          </Link>
        </div>
      </div>

      <PermissionsList />
    </>
  )
}