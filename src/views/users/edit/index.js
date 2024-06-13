import ViewTitle from "components/custom/ViewTitle"
import { useNavigate, useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import useRequest from "utils/hooks/useRequest"
import { apiDeleteUser, apiUpdateUser } from "services/UserService"
import openNotification from "utils/openNotification"
import { Loading } from "components/shared"
import EditUserForm from "./EditUserForm"
import { UserContextProvider } from "./UserContext"
import { apiGetUserPermissions } from "services/UserPermissionServices"
import { PREVIOUS_URL_KEY } from "constants/app.constant"
import useURLSearchParams from "utils/hooks/useURLSearchParams"

export default function EditUser() {
  const { id } = useParams()
  const navigate = useNavigate()
  const apiRequest = useRequest()
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const params = useURLSearchParams()

  const addRole = (role, appId) => {
    const newUser = {
      ...user,
      apps: user.apps.map(userapps => {
        if (userapps.app === appId) {
          return {
            ...userapps,
            roles: userapps?.roles ? [...userapps?.roles, role] : [role]
          }
        }
        return userapps
      })
    }

    setUser(newUser)
  }

  const deleteRole = (roleId, appId) => {
    const newUser = {
      ...user,
      apps: user.apps.map(userapps => {
        if (userapps.app === appId) {
          return {
            ...userapps,
            roles: userapps?.roles.filter(uarole => uarole?.role !== roleId)
          }
        }
        return userapps
      })
    }

    setUser(newUser)
  }

  const addRestriction = (restriction, appId, roleId) => {
    const newUser = {
      ...user,
      apps: user.apps.map(userapps => {
        if (userapps.app === appId) {
          return {
            ...userapps,
            roles: userapps?.roles.map(uarole => {
              if (uarole.role === roleId) {
                return {
                  ...uarole,
                  restrictions: uarole?.restrictions ? [...uarole?.restrictions, restriction] : [restriction]
                }
              }
              return uarole
            })
          }
        }
        return userapps
      })
    }

    setUser(newUser)
  }

  const deleteRestriction = (restrictionId, appId, roleId) => {
    const newUser = {
      ...user,
      apps: user.apps.map(userapps => {
        if (userapps.app === appId) {
          return {
            ...userapps,
            roles: userapps?.roles.map(uarole => {
              if (uarole.role === roleId) {
                return {
                  ...uarole,
                  restrictions: uarole?.restrictions.filter(uarrestriction => uarrestriction.restriction !== restrictionId)
                }
              }
              return uarole
            })
          }
        }
        return userapps
      })
    }

    setUser(newUser)
  }
  const onSubmit = async (values) => {
    const resp = await apiRequest(() => apiUpdateUser(id, values))
    if (resp.ok) {
      openNotification('success', 'Usuario actualizado', 'El usuario ha sido actualizado correctamente')
      navigate(decodeURIComponent(params.get(PREVIOUS_URL_KEY) || '/users'))
    }

    if (!resp.ok) {
      openNotification('error', 'Error', resp.message)
    }
  }

  const onDelete = async () => {
    const resp = await apiRequest(() => apiDeleteUser(id))
    if (resp.ok) {
      openNotification('success', 'Usuario eliminado', 'El usuario ha sido eliminado correctamente')
      navigate(decodeURIComponent(params.get(PREVIOUS_URL_KEY) || '/users'))
    }

    if (!resp.ok) {
      openNotification('error', 'Error', resp.message)
    }
  }

  const onCancel = () => {
    navigate(decodeURIComponent(params.get(PREVIOUS_URL_KEY) || '/users'))
  }

  useEffect(() => {
    async function fetchUser() {
      setLoading(true)
      const response = await apiRequest(() => apiGetUserPermissions(id))
      setLoading(false)
      console.log(response)
      if (response.ok) {
        setUser({
          ...response.data,
          password: '',
          passwordConfirmation: ''
        })
      }

      if (!response.ok) {
        openNotification('error', 'Error', response.message)
        navigate(decodeURIComponent(params.get(PREVIOUS_URL_KEY) || '/users'))
      }
    }

    fetchUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiRequest, id, navigate])

  return (
    <UserContextProvider value={{ user, setUser, addRole, deleteRole, addRestriction, deleteRestriction }}>
      <div className="flex justify-between mb-6">
        <ViewTitle title="Editar usuario" backPath={decodeURIComponent(params.get(PREVIOUS_URL_KEY) || '/users')} showBackPage />
      </div>

      <Loading loading={loading}>
        <EditUserForm
          initialValues={user}
          onSubmit={onSubmit}
          onDelete={onDelete}
          onCancel={onCancel}
        />
      </Loading>
    </UserContextProvider>
  )
}
