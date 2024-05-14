import classNames from 'classnames';
import { Input } from 'components/ui'
import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

export default function InputSearch({ className, placeholder = 'Buscar...', ...rest }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const onChange = useDebouncedCallback((search) => {
    if (search === '') {
      searchParams.delete('search');
      return navigate(`?${searchParams.toString()}`);
    }

    searchParams.set('search', search);
    navigate(`?${searchParams.toString()}`);
  }, 500);

  return (
    <div>
      <Input
        type="search"
        className={classNames('w-64', className)}
        size="sm"
        placeholder={placeholder}
        prefix={<FaSearch />}
        defaultValue={searchParams.get('search')}
        onChange={(e) => onChange(e.target.value)}
        {...rest}
      />
    </div>
  )
}
