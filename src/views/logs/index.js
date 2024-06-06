import ViewTitle from "components/custom/ViewTitle";
import LogsList from "./LogsList";
import { Button } from "components/ui";
import { HiOutlineFilter, HiX } from "react-icons/hi";
import LogFilter from "./LogFilter";
import { useEffect, useState } from "react";
import classNames from "classnames";
import useURLSearchParams from "utils/hooks/useURLSearchParams";
export default function Log() {
  const params = useURLSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(params.get('isFilterOpen') === 'true')
  const onFilter = (isFilterOpen) => {
    if (!isFilterOpen) params.delete('isFilterOpen');
    if (isFilterOpen) params.set('isFilterOpen', true);
  }

  useEffect(() => setIsFilterOpen(params.get('isFilterOpen') === 'true'), [params])

  return (
    <div>
      <div className='flex justify-between mb-6'>
        <ViewTitle title="Historial de Actividad" />
        <div>
          {isFilterOpen && <Button size='sm' variant='solid' color='red-600' icon={<HiX />} onClick={() => onFilter(false)} >Cerrar</Button>}
          {!isFilterOpen && <Button size='sm' variant='solid' icon={<HiOutlineFilter />} onClick={() => onFilter(true)} >Filtrar</Button>}
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
