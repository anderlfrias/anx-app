import CustomizedTag from "components/custom/CustomizedTag"
import { TableRowSkeleton } from "components/shared"
import { Card, Table } from "components/ui"
import { useEffect, useState } from "react"
import { HiLockClosed, HiLockOpen } from "react-icons/hi"
import { apiGetUserAccessByUserId } from "services/AccessService"
import useRequest from "utils/hooks/useRequest"

const { Tr, Th, Td, THead, TBody } = Table

export default function AccessOfUser({ userId }) {
  const apiRequest = useRequest()
  const [ loading, setLoading ] = useState(true)
  const [ usersAccess, setUsersAccess ] = useState([])

  useEffect(() => {
    const fetchUserAccess = async () => {
      const resp = await apiRequest(() => apiGetUserAccessByUserId(userId))
      if (resp.ok) {
        setUsersAccess(resp.data)
      }
      setLoading(false)
    }

    fetchUserAccess()
  }, [apiRequest, userId])

  return (
    <Card>
      <Table compact>
        <THead>
          <Tr>
            <Th>#</Th>
            <Th>IP</Th>
            <Th>Aplicación</Th>
            <Th>Intentos</Th>
            <Th />
          </Tr>
        </THead>
        {loading ? (
          <TableRowSkeleton columns={6} rows={5} />
        ) : (
        <TBody>
          {usersAccess.map((userAccess, index) => (
            <Tr key={userAccess.id}>
              <Td>{index + 1}</Td>
              <Td>
                <CustomizedTag
                  text={userAccess.originIpAddress}
                  color='emerald'
                />
              </Td>
              <Td>
                <CustomizedTag
                  text={userAccess.app.code}
                  description={userAccess.app.name}
                />
              </Td>
              <Td>{userAccess.accessFailedCount || '-'}</Td>
              <Td>
                <CustomizedTag
                  text={userAccess.lockout ? <HiLockClosed /> : <HiLockOpen />}
                  color={userAccess.lockout ? 'red' : 'green'}
                />
              </Td>
            </Tr>
          ))}
          {usersAccess.length === 0 && (
            <Tr>
              <Td colSpan={6} className='text-center'>
                No se encontraron accesos
              </Td>
            </Tr>
          )}
        </TBody>
        )}
      </Table>
    </Card>
  )
}
