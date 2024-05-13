import { Button, Card, Table, Tooltip } from "components/ui"
import { useEffect, useState } from "react"
import useRequest from "utils/hooks/useRequest"
import openNotification from "utils/openNotification"
import { HiExternalLink, HiLink, HiPencilAlt, HiTrash } from "react-icons/hi"
import Confirm from "components/custom/Confirm"
import { Link, useLocation } from "react-router-dom"
import { apiDeleteApp, apiGetApps } from "services/AppService"
import copy from "utils/lib/copy"
import CustomizedTag from "components/custom/CustomizedTag"
import { TableRowSkeleton } from "components/shared"

const { Tr, Th, Td, THead, TBody } = Table

const AppUrl = ({ url }) => {

  const onCopy = () => {
    copy(url)
    openNotification('success', 'Copiado', 'Enlace copiado al portapapeles')
  }

  if (!url) return (
    <span className='text-gray-500 italic min-w-max'>Sin URL</span>
  )

  return (
    <div className="flex gap-2">
      <Tooltip title='Copiar enlace'>
        <HiLink onClick={onCopy} className='text-lg cursor-pointer hover:text-sky-600 active:text-sky-900' />
      </Tooltip>
      <a
        href={url}
        target='_blank'
        rel='noreferrer'
      >
        <Tooltip title='Abrir enlace'>
          <HiExternalLink className='text-lg hover:text-sky-600 active:text-sky-900' />
        </Tooltip>
      </a>
    </div>
  )
}

export default function AppsList() {
  const apiRequest = useRequest()
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(false)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('search') || '';

  const deleteApp = async (id) => {
    const resp = await apiRequest(() => apiDeleteApp(id))

    if (resp.ok) {
      openNotification('success', 'Applicación eliminada', 'La aplicación ha sido eliminada correctamente')
      setApps(apps.filter(role => role.id !== id))
    }

    if (!resp.ok) {
      openNotification('danger', 'Error', 'Error al eliminar la aplicación')
      console.error('Error:', resp.error)
    }
  }

  useEffect(() => {
    const fetchRoles = async (search) => {
      setLoading(true)
      const resp = await apiRequest(() => apiGetApps(search))

      if (resp.ok) {
        setApps(resp.data)
      }

      if (!resp.ok) {
        openNotification('danger', 'Error', 'Error al obtener las aplicaciones')
        console.error('Error:', resp.error)
      }
      setLoading(false)
    }

    fetchRoles(search)
  }, [apiRequest, search])

  return (
    <Card>
      <Table>
        <THead>
          <Tr>
            <Th>#</Th>
            <Th>Código</Th>
            <Th>Nombre</Th>
            <Th>Descripción</Th>
            <Th>URL</Th>
            <Th />
          </Tr>
        </THead>
        {loading ? (
          <TableRowSkeleton columns={6} rows={5} />
        ) : (
          <TBody>
            {apps.map((app, index) => (
              <Tr key={app.id}>
                <Td>{index + 1}</Td>
                <Td><CustomizedTag text={app.code} /></Td>
                <Td>{app.name}</Td>
                <Td>{app.description}</Td>
                <Td><AppUrl url={app.url} /></Td>
                <Td>
                  <div className="flex justify-end gap-2 min-w-max">
                    <Confirm onConfirm={() => deleteApp(app.id)} type='danger'>
                      <Tooltip title='Eliminar'>
                        <Button size='sm' color='gray-600' icon={<HiTrash />} variant="twoTone" />
                      </Tooltip>
                    </Confirm>
                    <Tooltip title='Editar'>
                      <Link to={`/apps/${app.id}`}>
                        <Button size='sm' color='gray-600' icon={<HiPencilAlt />} variant="twoTone" />
                      </Link>
                    </Tooltip>
                  </div>
                </Td>
              </Tr>
            ))}
            {apps.length === 0 && (
              <Tr>
                <Td colSpan={6} className='text-center'>
                  No se encontraron aplicaciones
                </Td>
              </Tr>
            )}
          </TBody>
        )}
      </Table>
    </Card>
  )
}