import ViewTitle from "components/custom/ViewTitle";
import { Button } from "components/ui";
import { HiPlusCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import AppsList from "./AppsList";

export default function Apps() {

  return (
    <div>
      <div className="flex justify-between mb-6">
        <ViewTitle title="Aplicaciones" />
        
        <Link to="/apps/create">
          <Button size="sm" variant='solid' icon={<HiPlusCircle />} >Crear Aplicacion</Button>
        </Link>
      </div>

      <AppsList />

    </div>
  )
}
