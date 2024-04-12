import Confirm from "components/custom/Confirm"
import { Loading } from "components/shared"
import { Button, Card, Table, Tooltip } from "components/ui"
import { useEffect, useState } from "react"
import { HiPaperAirplane, HiTrash } from "react-icons/hi"
import { apiGetUsers } from "services/UserService"
import useRequest from "utils/hooks/useRequest"
import openNotification from "utils/openNotification"

const { Tr, Th, Td, THead, TBody } = Table

export default function UsersList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const apiRequest = useRequest()
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      const resp = await apiRequest(() => apiGetUsers())
      console.log(resp)
      if (resp.ok) {
        setUsers(resp.data)
      } else {
        openNotification('error', 'Error', 'Error al obtener los usuarios')
        console.error(resp)
      }
      setLoading(false)
    }

    fetchUsers()
  }, [apiRequest])

  return (
    <Card>
      <Loading loading={loading} type="cover" >
        <Table>
          <THead>
            <Tr>
              <Th>#</Th>
              <Th>Nombre</Th>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th />
            </Tr>
          </THead>
          <TBody>
            {users.map((user, index) => (
              <Tr key={user.id}>
                <Td>{index + 1}</Td>
                <Td>{`${user.name} ${user.firstSurname} ${user.secondSurname}`}</Td>
                <Td>{user.username}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <div className="flex gap-2 justify-end min-w-max">
                    <Confirm onConfirm={() => console.log('delete')} type='danger'>
                      <Tooltip title='Eliminar'>
                        <Button size='sm' color='gray-600' icon={<HiTrash />} variant="twoTone" />
                      </Tooltip>
                    </Confirm>
                    <Tooltip title='Ver perfil'>
                      <Button size='sm' icon={<HiPaperAirplane className='text-lg rotate-90' />} variant="solid" />
                    </Tooltip>
                  </div>
                </Td>
              </Tr>
            ))}
          </TBody>
        </Table>
      </Loading>
    </Card>
  )
}
