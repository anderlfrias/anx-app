import ViewTitle from "components/custom/ViewTitle";
import { Button } from "components/ui";
import { HiPlusCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import AppsList from "./AppsList";
import Filter from "components/custom/Filter";

export default function Apps() {
  return (
    <div>
      <div className="flex justify-between mb-6">
        <ViewTitle title="Aplicaciones" />
        
        <div className="flex justify-end gap-2 w-full">
          <Filter />
          <Link to="/apps/create">
            <Button size="sm" variant='solid' icon={<HiPlusCircle />} >Crear Aplicacion</Button>
          </Link>
        </div>
      </div>

      <AppsList />

    </div>
  )
}
