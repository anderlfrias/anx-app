import { Button, Card, Table, Tooltip } from "components/ui"
import { useEffect, useState } from "react"
import useRequest from "utils/hooks/useRequest"
import openNotification from "utils/openNotification"
import { HiPencilAlt, HiTrash } from "react-icons/hi"
import Confirm from "components/custom/Confirm"
import { Link, useLocation } from "react-router-dom"
import { apiDeletePermission, apiGetPermissions } from "services/PermissionService"
import { AppCode } from "views/apps/AppsList"

const { Tr, Th, Td, THead, TBody } = Table

export default function PermissionsList() {
  const apiRequest = useRequest()
  const [permissions, setPermissions] = useState([])
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('search') || '';

  const deletePermission = async (id) => {
    const resp = await apiRequest(() => apiDeletePermission(id))

    if (resp.ok) {
      openNotification('success', 'Permiso eliminado', 'El permiso ha sido eliminado correctamente')
      setPermissions(permissions.filter(role => role.id !== id))
    }

    if (!resp.ok) {
      openNotification('danger', 'Error', resp.message)
      console.error('Error:', resp.error)
    }
  }

  useEffect(() => {
    const fetchRoles = async (search) => {
      const resp = await apiRequest(() => apiGetPermissions(search))

      if (resp.ok) {
        setPermissions(resp.data)
      }

      if (!resp.ok) {
        openNotification('danger', 'Error', resp.message)
        console.error('Error:', resp.error)
      }
    }

    fetchRoles(search)
  }, [apiRequest, search])

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
          {permissions.map((permission, index) => (
            <Tr key={permission.id}>
              <Td>{index + 1}</Td>
              <Td>{permission.name}</Td>
              <Td>{permission.normalizedName}</Td>
              <Td>
                {permission.app && <AppCode code={permission.app.code} />}
              </Td>
              <Td>
                <div className="flex justify-end gap-2 min-w-max">
                  <Confirm onConfirm={() => deletePermission(permission.id)} type='danger'>
                    <Tooltip title='Eliminar'>
                      <Button size='sm' color='gray-600' icon={<HiTrash />} variant="twoTone" />
                    </Tooltip>
                  </Confirm>
                  <Tooltip title='Editar'>
                    <Link to={`/permissions/${permission.id}`}>
                      <Button size='sm' color='gray-600' icon={<HiPencilAlt />} variant="twoTone" />
                    </Link>
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