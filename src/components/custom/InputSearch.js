import classNames from 'classnames';
import { Input } from 'components/ui'
import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { useDebouncedCallback } from 'use-debounce';
import useURLSearchParams from 'utils/hooks/useURLSearchParams';

export default function InputSearch({ className, placeholder = 'Buscar...', ...rest }) {
  const params = useURLSearchParams();

  const onChange = useDebouncedCallback((search) => {
    if (search === '') {
      params.delete('search');
      params.set('page', 0);
      return;
    }

    params.set('search', search);
    params.set('page', 0);
  }, 500);

  return (
    <div>
      <Input
        type="search"
        className={classNames('w-64', className)}
        size="sm"
        placeholder={placeholder}
        prefix={<FaSearch />}
        defaultValue={params.get('search')}
        onChange={(e) => onChange(e.target.value)}
        {...rest}
      />
    </div>
  )
}
