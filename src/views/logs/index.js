import ViewTitle from "components/custom/ViewTitle";
import LogsList from "./LogsList";
import { Button } from "components/ui";
import { HiOutlineFilter, HiX } from "react-icons/hi";
import LogFilter from "./LogFilter";
import { useState } from "react";
import classNames from "classnames";
export default function Log() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const onFilter = () => setIsFilterOpen(!isFilterOpen)

  return (
    <div>
      <div className='flex justify-between mb-6'>
        <ViewTitle title="Historial de Actividad" />
        <div>
          {isFilterOpen && <Button size='sm' variant='solid' color='red-600' icon={<HiX />} onClick={onFilter} >Cerrar</Button>}
          {!isFilterOpen && <Button size='sm' variant='solid' icon={<HiOutlineFilter />} onClick={onFilter} >Filtrar</Button>}
        </div>
      </div>

      <LogFilter
        className={classNames( 'mb-6',
          { 'h-0 hidden': !isFilterOpen, 'block': isFilterOpen }
        )}
      />

      <LogsList />
    </div>
  )
}
