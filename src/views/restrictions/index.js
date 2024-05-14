import ViewTitle from "components/custom/ViewTitle";
import { Link } from "react-router-dom";
import { Button } from "components/ui";
import { HiPlusCircle } from "react-icons/hi";
import RestrictionsList from "./RestrictionsList";
import InputSearch from "components/custom/InputSearch";

export default function Roles() {
  return (
    <>
      <div className="flex justify-between mb-6">
        <ViewTitle title="Restricciones" />

        <div className="flex justify-end gap-2 w-full">
          <InputSearch />
          <Link to="/restrictions/create">
            <Button size="sm" variant='solid' icon={<HiPlusCircle />} >Crear Restricción</Button>
          </Link>
        </div>
      </div>

      <RestrictionsList />
    </>
  )
}