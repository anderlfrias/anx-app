import { Button, Card, Table, Tooltip } from "components/ui"
import { useEffect, useState } from "react"
import useRequest from "utils/hooks/useRequest"
import openNotification from "utils/openNotification"
import { HiPencilAlt, HiTrash } from "react-icons/hi"
import Confirm from "components/custom/Confirm"
import { Link } from "react-router-dom"
import { apiDeleteRestriction, apiGetRestrictions } from "services/RestrictionService"
import { TableRowSkeleton, TextEllipsis } from "components/shared"
import CustomizedTag from "components/custom/CustomizedTag"
import CustomizedPagination from "components/custom/CustomizedPagination"
import useURLSearchParams from "utils/hooks/useURLSearchParams"

const { Tr, Th, Td, THead, TBody } = Table

export default function RestrictionsList() {
  const apiRequest = useRequest()
  const [restrictions, setRestrictions] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const params = useURLSearchParams()

  const deleteRestriction = async (id) => {
    const resp = await apiRequest(() => apiDeleteRestriction(id))

    if (resp.ok) {
      openNotification('success', 'Restricción eliminada', 'La resctricción ha sido eliminado correctamente')
      setRestrictions(restrictions.filter(role => role.id !== id))
    }

    if (!resp.ok) {
      openNotification('danger', 'Error', resp.message)
      console.error('Error:', resp.error)
    }
  }

  useEffect(() => {
    const fetchRestrictions = async (query) => {
      setLoading(true)
      const resp = await apiRequest(() => apiGetRestrictions(query))

      if (resp.ok) {
        setRestrictions(resp.data.restrictions)
        setTotal(resp.data.total)
      }

      if (!resp.ok) {
        openNotification('danger', 'Error', resp.message)
        console.error('Error:', resp.error)
      }
      setLoading(false)
    }

    fetchRestrictions(params.query)
  }, [apiRequest, params.query])

  return (
    <Card>
      <Table>
        <THead>
          <Tr>
            <Th>#</Th>
            <Th>Nombre</Th>
            <Th>Nombre normalizado</Th>
            <Th>Descripción</Th>
            <Th>Aplicación</Th>
            <Th>Role</Th>
            <Th />
          </Tr>
        </THead>
        {loading ? (
          <TableRowSkeleton columns={7} rows={5} />
        ) : (
          <TBody>
            {restrictions.map((restriction, index) => (
              <Tr key={restriction.id}>
                <Td>{index + 1}</Td>
                <Td>{restriction.name}</Td>
                <Td>
                  <CustomizedTag text={restriction.normalizedName} />
                </Td>
                <Td>
                  <TextEllipsis text={restriction.description} maxTextCount={40} />
                </Td>
                <Td>
                  {restriction.app && <CustomizedTag text={restriction.app.code} description={restriction.app.name} />}
                </Td>
                <Td>
                  {restriction.role && <CustomizedTag text={restriction.role.normalizedName} description={restriction.role.name} />}
                </Td>
                <Td>
                  <div className="flex justify-end gap-2 min-w-max">
                    <Confirm onConfirm={() => deleteRestriction(restriction.id)} type='danger'>
                      <Tooltip title='Eliminar'>
                        <Button size='sm' color='gray-600' icon={<HiTrash />} variant="twoTone" />
                      </Tooltip>
                    </Confirm>
                    <Tooltip title='Editar'>
                      <Link to={`/restrictions/${restriction.id}`}>
                        <Button size='sm' color='gray-600' icon={<HiPencilAlt />} variant="twoTone" />
                      </Link>
                    </Tooltip>
                  </div>
                </Td>
              </Tr>
            ))}
            {restrictions.length === 0 && (
              <Tr>
                <Td colSpan={7} className='text-center'>
                  No se encontraron restricciones
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