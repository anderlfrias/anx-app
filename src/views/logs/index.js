import ViewTitle from "components/custom/ViewTitle";
import LogsList from "./LogsList";
export default function Log() {

  return (
    <div>
      <div className='mb-6'>
        <ViewTitle title="Historial de Actividad" />
      </div>

      <LogsList />
    </div>
  )
}
