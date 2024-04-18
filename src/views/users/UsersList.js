import ResetPasswordSvg from "assets/svg/ResetPasswordSvg"
import Confirm from "components/custom/Confirm"
import { Loading } from "components/shared"
import { Button, Card, Table, Tooltip } from "components/ui"
import { useEffect, useState } from "react"
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
      console.log(resp)
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
              <Th>#</Th>
              <Th>Nombre</Th>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th />
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
                    <Tooltip title='Resetear Contraseña'>
                      <ResetPasswordSvg className='text-lg cursor-pointer hover:text-sky-600 active:text-sky-900' />
                    </Tooltip>
                  </div>
                </Td>
                <Td>
                  <div className="flex gap-2 justify-end min-w-max">
                    <Confirm onConfirm={() => console.log('delete')} type='danger'>
                      <Tooltip title='Eliminar'>
                        <Button size='sm' color='gray-600' icon={<HiTrash />} variant="twoTone" />
                      </Tooltip>
                    </Confirm>
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
