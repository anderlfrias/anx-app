import { Button, Card, Table, Tag, Tooltip } from "components/ui"
import { useEffect, useState } from "react"
import useRequest from "utils/hooks/useRequest"
import openNotification from "utils/openNotification"
import { HiExternalLink, HiLink, HiPencilAlt, HiTrash } from "react-icons/hi"
import Confirm from "components/custom/Confirm"
import { Link } from "react-router-dom"
import { apiDeleteApp, apiGetApps } from "services/AppService"
import copy from "utils/lib/copy"

const { Tr, Th, Td, THead, TBody } = Table

const AppCode = ({ code }) => (
  <Tag className="bg-slate-100 text-slate-600 dark:bg-slate-500/20 dark:text-slate-100 border-0 rounded">
    {code}
  </Tag>
)

const AppUrl = ({ url }) => {

  const onCopy = () => {
    copy(url)
    openNotification('success', 'Copiado', 'Enlace copiado al portapapeles')
  }

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
    const fetchRoles = async () => {
      const resp = await apiRequest(() => apiGetApps())

      if (resp.ok) {
        setApps(resp.data)
      }

      if (!resp.ok) {
        openNotification('danger', 'Error', 'Error al obtener las aplicaciones')
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
            <Th>Código</Th>
            <Th>Nombre</Th>
            <Th>Descripción</Th>
            <Th>URL</Th>
            <Th />
          </Tr>
        </THead>
        <TBody>
          {apps.map((app, index) => (
            <Tr key={app.id}>
              <Td>{index + 1}</Td>
              <Td><AppCode code={app.code} /></Td>
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
        </TBody>
      </Table>
    </Card>
  )
}