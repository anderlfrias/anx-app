import { Input } from 'components/ui'
import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

export default function Filter() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const onChange = useDebouncedCallback((search) => {
    console.log(search);
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
        className="w-56"
        size="sm"
        placeholder="Buscar..."
        prefix={<FaSearch />}
        defaultValue={searchParams.get('search')}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
