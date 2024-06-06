import CustomizedPagination from "components/custom/CustomizedPagination"
import CustomizedTag from "components/custom/CustomizedTag"
import TextToCopy from "components/custom/TextToCopy"
import { TableRowSkeleton } from "components/shared"
import { Button, Card, Table, Tag, Tooltip } from "components/ui"
import { PREVIOUS_URL_KEY } from "constants/app.constant"
import { useEffect, useState } from "react"
import { HiPaperAirplane } from "react-icons/hi"
import { Link } from "react-router-dom"
import { apiGetLogs } from "services/LogService"
import useRequest from "utils/hooks/useRequest"
import useURLSearchParams from "utils/hooks/useURLSearchParams"
import openNotification from "utils/openNotification"

const { Tr, Th, Td, THead, TBody } = Table
export const ACCTIONS_COLORS = {
  GET: 'emerald',
  POST: 'blue',
  PUT: 'amber',
  DELETE: 'red',
}

export const LogStatus = ({ success }) => {
  return (
    <Tag prefix className={`border-0 font-semibold text-sm ${success ? 'text-emerald-500' : 'text-red-500'}`} prefixClass={success ? 'bg-emerald-500' : 'bg-red-500'}>
      {success ? 'Exitoso' : 'Fallido'}
    </Tag>
  )
}

export default function LogsList() {
  const apiRequest = useRequest()
  const [logs, setLogs] = useState([])
  const params = useURLSearchParams()
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchData(query) {
      setLoading(true)
      const res = await apiRequest(() => apiGetLogs(query))
      if (res.ok) {
        setLogs(res.data.logs)
        setTotal(res.data.total)
      }

      if (!res.ok) {
        openNotification('danger', 'Error', res.message)
        console.error('Error:', res.error)
      }
      setLoading(false)
    }

    fetchData(params.query)
  }, [apiRequest, params.query])

  return (
    <div>
      <Card>
        <Table compact>
          <THead>
            <Tr>
              <Th>#</Th>
              <Th>Accion</Th>
              <Th>Fecha</Th>
              <Th>Autor</Th>
              <Th>Origen</Th>
              <Th>Elemento</Th>
              <Th>Estado</Th>
              <Th />
            </Tr>
          </THead>
          {loading ? (
            <TableRowSkeleton columns={8} rows={10} />
          ) : (
            <TBody>
              {logs.map((log, index) => (
                <Tr key={log.id}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <CustomizedTag color={ACCTIONS_COLORS[log.action]} text={log.action} />
                  </Td>
                  <Td>{new Date(log.date).toLocaleString('es-DO')}</Td>
                  <Td>
                    {log.author ?
                      <CustomizedTag text={log.author.username} />
                      :
                      <span className='text-gray-500 italic'>Sin autor</span>
                    }
                  </Td>
                  <Td>{log.origin}</Td>
                  <Td>
                    {log.elementId ?
                      <TextToCopy text={log.elementId} className='cursor-pointer'>
                        #{log.elementId.substring(18, 24)}
                      </TextToCopy>
                      :
                      <span className='text-gray-400 dark:text-gray-500 italic min-w-max'>Sin elemento</span>
                    }
                  </Td>
                  <Td>
                    <LogStatus success={log.success} />
                  </Td>
                  <Td>
                    <Tooltip title='Ver detalles'>
                      <Link to={`/logs/${log.id}?${PREVIOUS_URL_KEY}=${encodeURIComponent(params.fullPath)}`}>
                        <Button size='sm' icon={<HiPaperAirplane className='text-lg rotate-90' />} variant='solid' />
                      </Link>
                    </Tooltip>
                  </Td>
                </Tr>
              ))}

              {logs.length === 0 && (
                <Tr>
                  <Td colSpan={8} className='text-center'>
                    No se encontraron registros
                  </Td>
                </Tr>
              )}
            </TBody>
          )}
        </Table>

        <CustomizedPagination className='mt-4' total={total} />
      </Card>
    </div>
  )
}
