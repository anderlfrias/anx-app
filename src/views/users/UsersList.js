import Confirm from "components/custom/Confirm"
import CustomizedPagination from "components/custom/CustomizedPagination"
import UserImage from "components/custom/UserImage"
import { TableRowSkeleton } from "components/shared"
import { Button, Card, Table, Tooltip } from "components/ui"
import { PREVIOUS_URL_KEY } from "constants/app.constant"
import { useEffect, useState } from "react"
import { FaUserEdit } from "react-icons/fa"
import { HiPaperAirplane, HiTrash } from "react-icons/hi"
import { Link } from "react-router-dom"
import { apiDeleteUser, apiGetUsers } from "services/UserService"
import useRequest from "utils/hooks/useRequest"
import useURLSearchParams from "utils/hooks/useURLSearchParams"
import openNotification from "utils/openNotification"
import UserOptionsDropdown from "./UserOptionsDropdown"

const { Tr, Th, Td, THead, TBody } = Table

export default function UsersList() {
  const apiRequest = useRequest()
  const [users, setUsers] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const params = useURLSearchParams()

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
    const fetchUsers = async (query) => {
      setLoading(true)
      const resp = await apiRequest(() => apiGetUsers(query))

      if (resp.ok) {
        setUsers(resp.data.users)
        setTotal(resp.data.total)
      } else {
        openNotification('error', 'Error', resp.message)
        console.error(resp)
      }
      setLoading(false)
    }

    fetchUsers(params.query)
  }, [apiRequest, params.query])

  return (
    <Card>
      <Table>
        <THead>
          <Tr>
            <Th>Username</Th>
            <Th>Nombre</Th>
            <Th>Correo electrónico</Th>
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
                      to={`/users/${user.id}/profile?${PREVIOUS_URL_KEY}=${encodeURIComponent(params.fullPath)}`}
                      className='flex gap-2 items-center hover:text-sky-800 dark:hover:text-sky-600 ml-2 font-semibold'
                    >
                      <UserImage src={user.profilePicture} size={28} alt={`${user.name} ${user.firstSurname || ''}`} />
                      <span>{user.username}</span>
                    </Link>
                  </div>
                </Td>
                <Td>{`${user.name} ${user.firstSurname} ${user.secondSurname}`}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <div className="flex gap-1 justify-end items-center min-w-max">
                    <UserOptionsDropdown userId={user.id} />
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
                      <Link to={`/users/${user.id}?${PREVIOUS_URL_KEY}=${encodeURIComponent(params.fullPath)}`}>
                        <Button size='sm' icon={<FaUserEdit />} variant="plain" />
                      </Link>
                    </Tooltip>
                    <Tooltip title='Ver perfil'>
                      <Link to={`/users/${user.id}/profile?${PREVIOUS_URL_KEY}=${encodeURIComponent(params.fullPath)}`}>
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
      <CustomizedPagination className='mt-4' total={total} />
    </Card>
  )
}
