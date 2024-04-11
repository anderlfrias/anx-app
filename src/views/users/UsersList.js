import { Button, Card, Table, Tooltip } from "components/ui"
import { useEffect, useState } from "react"
import { HiOutlinePaperAirplane, HiOutlineTrash } from "react-icons/hi"
import { apiGetUsers } from "services/UserService"
import useRequest from "utils/hooks/useRequest"
import openNotification from "utils/openNotification"

const { Tr, Th, Td, THead, TBody } = Table

export default function UsersList() {
  const [users, setUsers] = useState([])
  const apiRequest = useRequest()
  useEffect(() => {
    const fetchUsers = async () => {
      const resp = await apiRequest(() => apiGetUsers())
      console.log(resp)
      if (resp.ok) {
        setUsers(resp.data)
      } else {
        openNotification('error', 'Error', 'Error al obtener los usuarios')
        console.error(resp)
      }
    }

    fetchUsers()
  }, [apiRequest])
  
  return (
    <Card>
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
                  <Tooltip title='Eliminar'>
                    <Button size='sm' color='gray-600' icon={<HiOutlineTrash />} variant="twoTone" />
                  </Tooltip>
                  <Tooltip title='Ver perfil'>
                    <Button size='sm' icon={<HiOutlinePaperAirplane className='text-lg rotate-90' />} variant="twoTone" />
                  </Tooltip>
                </div>
              </Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </Card>
  )
}
