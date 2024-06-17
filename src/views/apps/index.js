import ViewTitle from "components/custom/ViewTitle";
import { Button } from "components/ui";
import { HiPlusCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import AppsList from "./AppsList";
import InputSearch from "components/custom/InputSearch";

export default function Apps() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row  justify-between mb-6">
        <ViewTitle title="Aplicaciones" />
        
        <div className="flex flex-col sm:flex-row  justify-end gap-2 w-full">
          <InputSearch className="w-full sm:w-auto" />
          <Link to="/apps/create">
            <Button className='w-full' size="sm" variant='solid' icon={<HiPlusCircle />} >Crear Aplicacion</Button>
          </Link>
        </div>
      </div>

      <AppsList />

    </div>
  )
}
