import React, { useEffect, useState } from 'react'
import useRequest from 'utils/hooks/useRequest'
import openNotification from 'utils/openNotification'
import { Loading } from 'components/shared'
import AppsOfUser from './AppsOfUser'
import { Link, useNavigate } from 'react-router-dom'
import { apiGetUserPermissions } from 'services/UserPermissionServices'
import UserOverview from 'components/custom/UserOverview'
import Confirm from 'components/custom/Confirm'
import { apiDeleteUser } from 'services/UserService'
import useURLSearchParams from 'utils/hooks/useURLSearchParams'
import { Button } from 'components/ui'
import { HiTrash } from 'react-icons/hi'
import { PREVIOUS_URL_KEY } from 'constants/app.constant'
import { FaUserEdit } from 'react-icons/fa'
import AccessOfUser from './AccessOfUser'

export default function UserDetails({ id }) {
  const apiRequest = useRequest()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const { fullPath } = useURLSearchParams()

  const onDelete = async () => {
    setDeleting(true)
    const resp = await apiRequest(() => apiDeleteUser(user.id))
    if (resp.ok) {
      openNotification('success', 'Usuario eliminado', 'El usuario ha sido eliminado correctamente')
      navigate(-1)
    }

    if (!resp.ok) {
      openNotification('error', 'Error', resp.message)
    }
    setDeleting(false)
  }

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

  console.log(user)

  const UserAction = () => (
    <div className='mt-7 flex flex-col lg:flex-row gap-2'>
      <Confirm
        loading={deleting}
        onConfirm={onDelete}
        type='danger'
        subtitle='¿Estás seguro de eliminar este usuario?'
      >
        <Button className='w-full' icon={<HiTrash />} >Eliminar</Button>
      </Confirm>
      <Link to={`/users/${user.id}?${PREVIOUS_URL_KEY}=${fullPath}`}>
        <Button className='w-full' variant='solid' icon={<FaUserEdit />} >Editar</Button>
      </Link>
    </div>
  )

  return (
    <Loading loading={loading}>
      <div className=''>
        {user && (
          <div className='flex flex-col lg:flex-row gap-4'>
            <UserOverview
              className='col-span-2'
              user={user}
              actions={UserAction}
            />
            <div className='w-full'>
              <h4 className='mb-4'>Aplicaciones</h4>
              {user.apps.length === 0 && <p className='text-gray-500 dark:text-gray-400 italic w-full text-center'>
                Este usuario no tiene aplicaciones asignadas
              </p>}
              <AppsOfUser apps={user.apps} />

              <h4 className='mt-6 mb-4'>Accesos</h4>
              <AccessOfUser userId={id} />
            </div>
          </div>
        )}
      </div>
    </Loading>
  )
}
