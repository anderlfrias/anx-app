import Confirm from 'components/custom/Confirm'
import CustomizedTag from 'components/custom/CustomizedTag'
import { Button, Card, Switcher, Table, Tooltip } from 'components/ui'
import { useEffect, useState } from 'react'
import { HiLockClosed, HiLockOpen, HiTrash } from 'react-icons/hi'
import { apiGetUsersAccess } from 'services/AccessService'
import useRequest from 'utils/hooks/useRequest'
import openNotification from 'utils/openNotification'

const { Tr, Th, Td, THead, TBody } = Table

export default function UsersAccessList() {
  const apiRequest = useRequest()
  const [usersAccess, setUsersAccess] = useState([])

  const deleteAccess = async (id) => {
    console.log('delete', id)
  }

  useEffect(() => {
    async function fetchUsersAccess() {
      const resp = await apiRequest(apiGetUsersAccess)
      console.log(resp)
      if (resp.ok) {
        setUsersAccess(resp.data)
      }

      if (!resp.ok) {
        openNotification('danger', 'Error', resp.message)
        console.error('Error:', resp.error)
      }
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
            <Th />
          </Tr>
        </THead>
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
                  size='sm'
                  unCheckedContent={<HiLockOpen />}
                  checkedContent={<HiLockClosed />}
                  checked={userAccess.blocked}
                />
              </Td>
              <Td>
                <Confirm onConfirm={() => deleteAccess(userAccess.id)} type='danger'>
                  <Tooltip title='Eliminar'>
                    <Button size='sm' color='gray-600' icon={<HiTrash />} variant="twoTone" />
                  </Tooltip>
                </Confirm>
              </Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </Card>
  )
}
