import CustomizedTag from 'components/custom/CustomizedTag'
import { TableRowSkeleton } from 'components/shared'
import { Card, Switcher, Table } from 'components/ui'
import { useEffect, useState } from 'react'
import { HiLockClosed, HiLockOpen } from 'react-icons/hi'
import { apiGetUsersAccess, apiLockoutUserAccess, apiUnlockUserAccess } from 'services/AccessService'
import useRequest from 'utils/hooks/useRequest'
import openNotification from 'utils/openNotification'

const { Tr, Th, Td, THead, TBody } = Table

export default function UsersAccessList() {
  const apiRequest = useRequest()
  const [usersAccess, setUsersAccess] = useState([])
  const [changinfAccess, setChangingAccess] = useState({})
  const [loading, setLoading] = useState(false)

  const onChangeAccess = async (id, checked) => {
    if (checked) {
      return lockoutUserAccess(id)
    }

    if (!checked) {
      return unlockUserAccess(id)
    }
  }

  const lockoutUserAccess = async (id) => {
    setChangingAccess({ ...changinfAccess, [id]: true })
    const resp = await apiRequest(() => apiLockoutUserAccess(id))

    if (resp.ok) {
      setUsersAccess(usersAccess.map(userAccess => {
        if (userAccess.id === id) {
          return { ...userAccess, lockoutEnabled: true }
        }

        return userAccess
      }))
      openNotification('success', 'Bloqueado', 'El acceso ha sido bloqueado exitosamente')
    }

    if (!resp.ok) {
      openNotification('danger', 'Error', resp.message)
      console.error('Error:', resp.error)
    }
    setChangingAccess({ ...changinfAccess, [id]: false })
  }

  const unlockUserAccess = async (id) => {
    setChangingAccess({ ...changinfAccess, [id]: true })
    const resp = await apiRequest(() => apiUnlockUserAccess(id))

    if (resp.ok) {
      setUsersAccess(usersAccess.map(userAccess => {
        if (userAccess.id === id) {
          return { ...userAccess, lockoutEnabled: false }
        }

        return userAccess
      }))
      openNotification('success', 'Desbloqueado', 'El acceso ha sido desbloqueado exitosamente')
    }

    if (!resp.ok) {
      openNotification('danger', 'Error', resp.message)
      console.error('Error:', resp.error)
    }
    setChangingAccess({ ...changinfAccess, [id]: false })
  }

  useEffect(() => {
    async function fetchUsersAccess() {
      setLoading(true)
      const resp = await apiRequest(apiGetUsersAccess)

      if (resp.ok) {
        setUsersAccess(resp.data)
      }

      if (!resp.ok) {
        openNotification('danger', 'Error', resp.message)
        console.error('Error:', resp.error)
      }
      setLoading(false)
    }

    fetchUsersAccess()
  }, [apiRequest])

  return (
    <Card>
      <Table>
        <THead>
          <Tr>
            <Th>#</Th>
            <Th>IP</Th>
            <Th>Usuario</Th>
            <Th>Aplicación</Th>
            <Th>Intentos Fallidos</Th>
            <Th>Bloqueado</Th>
          </Tr>
        </THead>
        {loading ? (
          <TableRowSkeleton columns={6} rows={5} />
        ) : (
        <TBody>
          {usersAccess.map((userAccess, index) => (
            <Tr key={userAccess.id}>
              <Td>{index + 1}</Td>
              <Td>
                <CustomizedTag
                  text={userAccess.originIpAddress}
                  color='emerald'
                />
              </Td>
              <Td>
                <CustomizedTag
                  text={userAccess.user.username}
                  description={`${userAccess.user.name} ${userAccess.user.firstSurname} ${userAccess.user.secondSurname}`}
                />
              </Td>
              <Td>
                <CustomizedTag
                  text={userAccess.app.code}
                  description={userAccess.app.name}
                />
              </Td>
              <Td>{userAccess.accessFailedCount}</Td>
              <Td>
                <Switcher
                  isLoading={changinfAccess[userAccess.id]}
                  size='sm'
                  unCheckedContent={<HiLockOpen />}
                  checkedContent={<HiLockClosed />}
                  checked={userAccess.lockoutEnabled}
                  onChange={() => onChangeAccess(userAccess.id, !userAccess.lockoutEnabled)}
                />
              </Td>
            </Tr>
          ))}
          {usersAccess.length === 0 && (
            <Tr>
              <Td colSpan={6} className='text-center'>
                No se encontraron accesos
              </Td>
            </Tr>
          )}
        </TBody>
        )}
      </Table>
    </Card>
  )
}
