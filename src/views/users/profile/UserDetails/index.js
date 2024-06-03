import React, { useEffect, useState } from 'react'
import UserOverview from './Overview'
import useRequest from 'utils/hooks/useRequest'
import openNotification from 'utils/openNotification'
import { Loading } from 'components/shared'
import AppsOfUser from './AppsOfUser'
import { useNavigate } from 'react-router-dom'
import { apiGetUserPermissions } from 'services/UserPermissionServices'

export default function UserDetails({ id }) {
  const apiRequest = useRequest()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      const query = new URLSearchParams({ populated: true }).toString()
      const resp = await apiRequest(() => apiGetUserPermissions(id, query))

      if (resp.ok) {
        setUser(resp.data)
      } else {
        openNotification('error', 'Error', resp.message)
        console.error(resp)
        navigate(-1)
      }
      setLoading(false)
    }

    fetchUser()
  }, [apiRequest, navigate, id])

  return (
    <Loading loading={loading}>
      <div className='container mx-auto h-full'>
        {user && (
          <div className='flex flex-col lg:flex-row gap-4'>
            <UserOverview className='col-span-2' user={user} />
            <div className='w-full'>
              <h4 className='mb-4'>Aplicaciones</h4>
              {user.apps.length === 0 && <p className='text-gray-500 dark:text-gray-400 italic w-full text-center'>
                Este usuario no tiene aplicaciones asignadas
              </p>}
              <AppsOfUser apps={user.apps} />
            </div>
          </div>
        )}
      </div>
    </Loading>
  )
}
