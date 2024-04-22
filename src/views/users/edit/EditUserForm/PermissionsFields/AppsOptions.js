import classNames from "classnames";
import { Button, Card, Switcher } from "components/ui";

export default function AppsOptions({ app, className }) {
  const { code, name } = app;

  return (
    <Card className={classNames('h-full', className)}>
      <div className='flex flex-col justify-between mb-4'>
        <div className="flex justify-between items-center">
          <span className='text-base font-bold text-gray-900' >{code}</span>
          <div>
            <Switcher /> 
          </div>
        </div>
        <span>{name}</span>
      </div>
      <Button
        variant='outline'
        className='w-full'
        // className='w-full border-sky-700 text-sky-700 hover:bg-sky-700 hover:text-white active:bg-sky-800 active:text-white'
        type='button'
        size="sm"
      >
        Roles
      </Button>
    </Card>
  )
}
