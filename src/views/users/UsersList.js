import Confirm from "components/custom/Confirm"
import UserImage from "components/custom/UserImage"
import { Loading } from "components/shared"
import { Button, Card, Table, Tooltip } from "components/ui"
import { useEffect, useState } from "react"
import { FaUserEdit } from "react-icons/fa"
import { HiPaperAirplane, HiTrash } from "react-icons/hi"
import { Link, useLocation } from "react-router-dom"
import { apiGetUsers } from "services/UserService"
import useRequest from "utils/hooks/useRequest"
import openNotification from "utils/openNotification"

const { Tr, Th, Td, THead, TBody } = Table

export default function UsersList() {
  const apiRequest = useRequest()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('search') || '';

  useEffect(() => {
    const fetchUsers = async (search) => {
      setLoading(true)
      const resp = await apiRequest(() => apiGetUsers(search))

      if (resp.ok) {
        setUsers(resp.data)
      } else {
        openNotification('error', 'Error', resp.message)
        console.error(resp)
      }
      setLoading(false)
    }

    fetchUsers(search)
  }, [apiRequest, search])

  return (
    <Card>
      <Loading loading={loading} type="cover" >
        <Table>
          <THead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Username</Th>
              <Th>Email</Th>
              {/* <Th /> */}
              <Th />
            </Tr>
          </THead>
          <TBody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>
                  <div className='flex'>
                    <Link
                      to={`/users/${user.id}`}
                      className='flex gap-2 items-center hover:text-sky-800 ml-2 font-semibold'
                    >
                      <UserImage src={user.profilePicture} size={28} alt={`${user.name} ${user.firstSurname || ''}`} />
                      <span>{user.username}</span>
                    </Link>
                  </div>
                </Td>
                <Td>{`${user.name} ${user.firstSurname} ${user.secondSurname}`}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <div className="flex gap-1 justify-end min-w-max">
                    <Confirm onConfirm={() => console.log('delete')} type='danger'>
                      <Tooltip title='Eliminar'>
                        <Button size='sm' icon={<HiTrash />} variant="plain" />
                      </Tooltip>
                    </Confirm>
                    <Tooltip title='Editar'>
                      <Link to={`/users/${user.id}`}>
                        <Button size='sm' icon={<FaUserEdit />} variant="plain" />
                      </Link>
                    </Tooltip>
                    <Tooltip title='Ver perfil'>
                      <Link to={`/users/${user.id}`}>
                        <Button size='sm' icon={<HiPaperAirplane className='text-lg rotate-90' />} variant="solid" />
                      </Link>
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
