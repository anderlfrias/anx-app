import classNames from "classnames";
import { Button, Card, Switcher } from "components/ui";

export default function AppsOptions({ app, className }) {
  const { code, name } = app;

  return (
    <Card className={classNames('', className)}>
      <div className='flex flex-col justify-between mb-4'>
        <div className="flex justify-between items-center">
          <span className='text-base font-bold text-gray-900' >{code}</span>
          <div>
            <Switcher /> 
          </div>
        </div>
        <span>{name}</span>
      </div>
      <Button className='w-full' type='button' size="sm"  >
        Roles
      </Button>
    </Card>
  )
}
