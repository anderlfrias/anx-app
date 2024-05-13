import Confirm from "components/custom/Confirm"
import UserImage from "components/custom/UserImage"
import { TableRowSkeleton } from "components/shared"
import { Button, Card, Table, Tooltip } from "components/ui"
import { useEffect, useState } from "react"
import { FaUserEdit } from "react-icons/fa"
import { HiPaperAirplane, HiTrash } from "react-icons/hi"
import { Link, useLocation } from "react-router-dom"
import { apiDeleteUser, apiGetUsers } from "services/UserService"
import useRequest from "utils/hooks/useRequest"
import openNotification from "utils/openNotification"

const { Tr, Th, Td, THead, TBody } = Table

export default function UsersList() {
  const apiRequest = useRequest()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('search') || '';

  const onDelete = async (id) => {
    setDeleting(true)
    const resp = await apiRequest(() => apiDeleteUser(id))
    if (resp.ok) {
      setUsers(users.filter((user) => user.id !== id))
      openNotification('success', 'Usuario eliminado', 'El usuario ha sido eliminado correctamente')
    } else {
      openNotification('error', 'Error', resp.message)
      console.error(resp)
    }
    setDeleting(false)
  }

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
      <Table>
        <THead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th />
          </Tr>
        </THead>
        {loading ? (
          <TableRowSkeleton
            avatarInColumns={[0]}
            columns={4}
            rows={5}
            avatarProps={{ width: 28, height: 28 }}
          />
        ) : (
          <TBody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>
                  <div className='flex'>
                    <Link
                      to={`/users/${user.id}/profile`}
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
                    <Confirm
                      loading={deleting}
                      onConfirm={async () => await onDelete(user.id)}
                      type='danger'
                      subtitle='¿Estás seguro de eliminar este usuario?'
                    >
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
                      <Link to={`/users/${user.id}/profile`}>
                        <Button size='sm' icon={<HiPaperAirplane className='text-lg rotate-90' />} variant="solid" />
                      </Link>
                    </Tooltip>
                  </div>
                </Td>
              </Tr>
            ))}
            {users.length === 0 && (
              <Tr>
                <Td colSpan={4} className='text-center'>
                  No se encontraron usuarios
                </Td>
              </Tr>
            )}
          </TBody>
        )}
      </Table>
    </Card>
  )
}
