import { Dropdown, Pagination } from "components/ui";
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
    params.set('page', 0);
  };

  const onPaginationChange = (page) => {
    params.set('page', page - 1);
  };

  return (
    <div className={className}>
      <div className='sm:flex justify-between mt-4'>
        <div style={{ minWidth: 180 }}>
          <Dropdown
            placement="top-center"
            title={`${parseInt(params.get('top') || 10)} / página`}
            activeKey={params.get('top') || '10'}
          >
            {PAGE_OPTIONS.map(({ label, value }) => (
              <Dropdown.Item
                key={value}
                eventKey={value.toString()}
                onClick={() => onPageSelect(value)}
              >
                {label}
              </Dropdown.Item>
            ))}
          </Dropdown>
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
