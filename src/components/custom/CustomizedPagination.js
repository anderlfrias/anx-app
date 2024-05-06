import { Pagination, Select } from "components/ui";
import useURLSearchParams from "utils/hooks/useURLSearchParams";

const PAGE_OPTIONS = [
  { label: "10 / página", value: 10 },
  { label: "20 / página", value: 20 },
  { label: "50 / página", value: 50 },
  { label: "100 / página", value: 100 },
];

export default function CustomizedPagination({ className, total }) {
  const params = useURLSearchParams();

  const onPageSelect = (value) => {
    params.set('top', value);
  };

  const onPaginationChange = (page) => {
    params.set('page', page - 1);
  };

  return (
    <div className={className}>
      <div className='flex justify-between mt-4'>
        <div style={{ minWidth: 180 }}>
          <Select
            size="sm"
            isSearchable={false}
            value={PAGE_OPTIONS.find(x => x.value === parseInt(params.get('top') || 10))}
            options={PAGE_OPTIONS}
            onChange={selected => onPageSelect(selected.value)}
          />
        </div>
        <Pagination className='flex justify-end w-full '
          onChange={onPaginationChange}
          total={total}
          currentPage={parseInt(params.get('page') || 0) + 1}
          pageSize={parseInt(params.get('top') || 10)}
          displayTotal
        />
      </div>
    </div>
  )
}
