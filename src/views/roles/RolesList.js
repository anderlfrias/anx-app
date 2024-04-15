import { Button, Card, Table, Tooltip } from "components/ui"
import { useEffect, useState } from "react"
import { apiDeleteRole, apiGetRoles } from "services/RoleService"
import useRequest from "utils/hooks/useRequest"
import openNotification from "utils/openNotification"
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi"
import Confirm from "components/custom/Confirm"

const { Tr, Th, Td, THead, TBody } = Table

export default function RolesList() {
  const apiRequest = useRequest()
  const [roles, setRoles] = useState([])

  const deleteRole = async (id) => {
    const resp = await apiRequest(() => apiDeleteRole(id))

    if (resp.ok) {
      openNotification('success', 'Rol eliminado', 'El rol ha sido eliminado correctamente')
      setRoles(roles.filter(role => role.id !== id))
    }

    if (!resp.ok) {
      openNotification('danger', 'Error', 'Error al eliminar el rol')
      console.error('Error:', resp.error)
    }
  }

  useEffect(() => {
    const fetchRoles = async () => {
      const resp = await apiRequest(() => apiGetRoles())

      if (resp.ok) {
        setRoles(resp.data)
      }

      if (!resp.ok) {
        openNotification('danger', 'Error', 'Error al obtener los roles')
        console.error('Error:', resp.error)
      }
    }

    fetchRoles()
  }, [apiRequest])

  return (
    <Card>
      <Table>
        <THead>
          <Tr>
            <Th>#</Th>
            <Th>Nombre</Th>
            <Th>Nombre normalizado</Th>
            <Th>Aplicación</Th>
            <Th />
          </Tr>
        </THead>
        <TBody>
          {roles.map((role, index) => (
            <Tr key={role.id}>
              <Td>{index + 1}</Td>
              <Td>{role.name}</Td>
              <Td>{role.normalizedName}</Td>
              <Td>{role.app}</Td>
              <Td>
                <div className="flex justify-end gap-2 min-w-max">
                  <Confirm onConfirm={() => deleteRole(role.id)} type='danger'>
                    <Tooltip title='Eliminar'>
                      <Button size='sm' color='gray-600' icon={<HiOutlineTrash />} variant="twoTone" />
                    </Tooltip>
                  </Confirm>
                  <Tooltip title='Editar'>
                    <Button size='sm' color='gray-600' icon={<HiOutlinePencilAlt />} variant="twoTone" />
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