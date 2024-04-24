import classNames from "classnames";
import { Loading } from "components/shared";
import { Button, Card, Switcher } from "components/ui";

export default function AppsOptions({ app, className, loading }) {
  const { id, code, name } = app;

  return (
    <Loading loading={loading?.[id]} type='cover'>
      <Card bodyClass='h-full' className={classNames('', className)}>
        <div className='flex flex-col justify-between h-full'>
          <div className='flex flex-col justify-between mb-4'>
            <div className="flex justify-between items-center">
              <span className='text-base font-bold text-gray-900' >{code}</span>
              <div>
                <Switcher />
              </div>
            </div>
            <span>{name}</span>
          </div>
          <div>
            <Button
              variant='outline'
              className='w-full'
              type='button'
              size="sm"
            >
              Roles
            </Button>
          </div>
        </div>
      </Card>
    </Loading>
  )
}
