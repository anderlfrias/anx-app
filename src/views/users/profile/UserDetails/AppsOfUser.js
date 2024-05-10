import classNames from 'classnames'
import { Card } from 'components/ui'
import React from 'react'
import { GiPlainCircle } from "react-icons/gi";

export default function AppsOfUser({ className, apps }) {
  return (
    <div className={classNames('grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
      {apps.map(userapp => (
        <Card key={userapp.app.id}>
          <div className='mb-2'>
            <h5 className='text-xl font-semibold'>{userapp.app.code}</h5>
            <p className='text-gray-500 dark:text-gray-400'>{userapp.app.name}</p>
          </div>
          <ul>
            {userapp.roles.map(uarole => (
              <li key={uarole.role.id}>
                <div className=''>
                  <span className='flex items-center'><GiPlainCircle className='text-[.4rem] mr-2 min-w-max' /> {uarole.role.name}</span>
                  <ul className='ml-7'>
                    {uarole.restrictions.map(uarrestriction => (
                      <li key={uarrestriction.restriction.id} className='text-sm text-gray-500 dark:text-gray-400'>
                        <span className='flex'><GiPlainCircle className='text-[.4rem] mt-1 mr-2 min-w-min' />{uarrestriction.restriction.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  )
}
