import { Button, Card, Table, Tooltip } from "components/ui"
import { useEffect, useState } from "react"
import useRequest from "utils/hooks/useRequest"
import openNotification from "utils/openNotification"
import { HiPencilAlt, HiTrash } from "react-icons/hi"
import Confirm from "components/custom/Confirm"
import { Link, useLocation } from "react-router-dom"
import { AppCode } from "views/apps/AppsList"
import { apiDeleteRestriction, apiGetRestrictions } from "services/RestrictionService"
import { TextEllipsis } from "components/shared"

const { Tr, Th, Td, THead, TBody } = Table

export default function RestrictionsList() {
  const apiRequest = useRequest()
  const [restrictions, setRestrictions] = useState([])
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('search') || '';

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
    const fetchRoles = async (search) => {
      const resp = await apiRequest(() => apiGetRestrictions(search))

      if (resp.ok) {
        setRestrictions(resp.data)
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
            <Th>Descripción</Th>
            <Th>Aplicación</Th>
            <Th>Role</Th>
            <Th />
          </Tr>
        </THead>
        <TBody>
          {restrictions.map((restriction, index) => (
            <Tr key={restriction.id}>
              <Td>{index + 1}</Td>
              <Td>{restriction.name}</Td>
              <Td>{restriction.normalizedName}</Td>
              <Td>
                <TextEllipsis text={restriction.description} maxTextCount={40} />
              </Td>
              <Td>
                {restriction.app && <AppCode code={restriction.app.code} />}
              </Td>
              <Td>{restriction.role?.name}</Td>
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
        </TBody>
      </Table>
    </Card>
  )
}