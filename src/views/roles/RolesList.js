import { Button, Card, Table, Tooltip } from "components/ui"
import { useEffect, useState } from "react"
import { apiDeleteRole, apiGetRoles } from "services/RoleService"
import useRequest from "utils/hooks/useRequest"
import openNotification from "utils/openNotification"
import { HiPencilAlt, HiTrash } from "react-icons/hi"
import Confirm from "components/custom/Confirm"
import { Link } from "react-router-dom"
import CustomizedTag from "components/custom/CustomizedTag"
import { TableRowSkeleton } from "components/shared"
import CustomizedPagination from "components/custom/CustomizedPagination"
import useURLSearchParams from "utils/hooks/useURLSearchParams"

const { Tr, Th, Td, THead, TBody } = Table

export default function RolesList() {
  const apiRequest = useRequest()
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const params = useURLSearchParams()

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
    const fetchRoles = async (query) => {
      setLoading(true)
      const resp = await apiRequest(() => apiGetRoles(query))

      if (resp.ok) {
        setRoles(resp.data.roles)
        setTotal(resp.data.total)
      }

      if (!resp.ok) {
        openNotification('danger', 'Error', 'Error al obtener los roles')
        console.error('Error:', resp.error)
      }
      setLoading(false)
    }

    fetchRoles(params.query)
  }, [apiRequest, params.query])

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
        {loading ? (
          <TableRowSkeleton columns={5} rows={5} />
        ) : (
          <TBody>
            {roles.map((role, index) => (
              <Tr key={role.id}>
                <Td>{index + 1}</Td>
                <Td>{role.name}</Td>
                <Td>
                  <CustomizedTag text={role.normalizedName} />
                </Td>
                <Td>
                  {role.app ? (<CustomizedTag text={role.app.code} description={role.app.name} />) :
                    (<span className='text-gray-400 italic dark:text-gray-600 min-w-max'>Sin aplicación</span>)
                  }
                </Td>
                <Td>
                  <div className="flex justify-end gap-2 min-w-max">
                    <Confirm onConfirm={() => deleteRole(role.id)} type='danger'>
                      <Tooltip title='Eliminar'>
                        <Button size='sm' color='gray-600' icon={<HiTrash />} variant="twoTone" />
                      </Tooltip>
                    </Confirm>
                    <Tooltip title='Editar'>
                      <Link to={`/roles/${role.id}`}>
                        <Button size='sm' color='gray-600' icon={<HiPencilAlt />} variant="twoTone" />
                      </Link>
                    </Tooltip>
                  </div>
                </Td>
              </Tr>
            ))}
            {roles.length === 0 && (
              <Tr>
                <Td colSpan={5} className='text-center'>
                  No se encontraron roles
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