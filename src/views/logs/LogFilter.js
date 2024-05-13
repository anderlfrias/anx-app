import classNames from "classnames";
import UsersAsyncSelect from "components/custom/UsersAsyncSelect";
import { Button, DatePicker, Input, Select } from "components/ui";
import { useDebouncedCallback } from "use-debounce";
import { getDateWithEndDay } from "utils/date";
import useURLSearchParams from "utils/hooks/useURLSearchParams";

const ACTIONS_OPTIONS = [
  { label: 'GET', value: 'GET' },
  { label: 'POST', value: 'POST' },
  { label: 'PUT', value: 'PUT' },
  { label: 'DELETE', value: 'DELETE' },
]

const STATUS_OPTIONS = [
  { label: 'Exitoso', value: 'true' },
  { label: 'Fallido', value: 'false' },
]

export default function LogFilter({ className }) {
  const params = useURLSearchParams();

  const onChangeParams = (key, value) => {
    params.set(key, value);
    params.set('page', 0);
  }
  const onChangeInput = useDebouncedCallback((key, value) => {
    params.set(key, value);
    params.set('page', 0);
  }, 500);

  const onChangeActions = (selected) => {
    const actions = selected.map((action) => action.value);
    params.set('actions', actions);
    params.set('page', 0);
  }

  const currentActions = params.get('actions')?.split(',') || [];

  const onClearFilter = () => {
    params.clear();
  }

  return (
    <div className={classNames('', className)}>
      <div className='grid sm:grid-cols-2 gap-2'>
        <UsersAsyncSelect
          size='sm'
          className='w-full'
          placeholder='-Todos los usuarios-'
          value={params.get('author')}
          onChange={(selected) => onChangeParams('author', selected?.value || '')}
          hideLabel
        />

        <Select
          size='sm'
          isMulti
          placeholder='Acciones'
          options={ACTIONS_OPTIONS}
          value={ACTIONS_OPTIONS.filter((action) => currentActions.includes(action.value))}
          onChange={onChangeActions}
        />

        <Input
          type='search'
          size='sm'
          placeholder='Origen'
          defaultValue={params.get('origin')}
          onChange={(e) => onChangeInput('origin', e.target.value)}
        />

        <Input
          type='search'
          size='sm'
          placeholder='Elemento'
          defaultValue={params.get('elementId')}
          onChange={(e) => onChangeInput('elementId', e.target.value)}
        />

        <DatePicker
          size='sm'
          placeholder='Fecha inicio'
          value={params.get('startDate') ? new Date(params.get('startDate')) : null}
          onChange={(d) => onChangeParams('startDate', d ? new Date(d).toISOString() : '')}
        />

        <DatePicker
          size='sm'
          placeholder='Fecha fin'
          value={params.get('endDate') ? new Date(params.get('endDate')) : null}
          onChange={(d) => onChangeParams('endDate', d ? getDateWithEndDay(d) : '')}
        />

        <Select
          size='sm'
          placeholder='Estado'
          options={STATUS_OPTIONS}
          value={STATUS_OPTIONS.find((estado) => estado.value === params.get('success'))}
          onChange={(selected) => onChangeParams('success', selected?.value || '')}
          isClearable
        />

        <div className='flex justify-end items-end'>
          <Button size='sm' onClick={onClearFilter}>Limpiar Filtro</Button>
        </div>
      </div>
    </div>
  )
}
