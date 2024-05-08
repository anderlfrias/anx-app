import React, { useEffect, useState } from 'react'
import UserOverview from './Overview'
import useRequest from 'utils/hooks/useRequest'
import openNotification from 'utils/openNotification'
import { apiGetUserById } from 'services/UserService'
import { Loading } from 'components/shared'
import { Card } from 'components/ui'

export default function UserDetails({ id }) {
  const apiRequest = useRequest()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      const resp = await apiRequest(() => apiGetUserById(id))

      if (resp.ok) {
        setUser(resp.data)
      } else {
        openNotification('error', 'Error', resp.message)
        console.error(resp)
      }
      setLoading(false)
    }

    fetchUser()
  }, [apiRequest, id])
  return (
    <Loading loading={loading}>
      <div className='container mx-auto h-full'>
        <div className='flex flex-col lg:flex-row gap-4'>
          <UserOverview className='col-span-2' user={user} />
          <div className='w-full'>
            <Card>
              <div>
                Something here
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Loading>
  )
}
