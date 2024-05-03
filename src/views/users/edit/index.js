import ViewTitle from "components/custom/ViewTitle"
import { useNavigate, useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import useRequest from "utils/hooks/useRequest"
import { apiUpdateUser } from "services/UserService"
import openNotification from "utils/openNotification"
import { Loading } from "components/shared"
import EditUserForm from "./EditUserForm"
import { UserContextProvider } from "./UserContext"
import { apiGetUserPermissions } from "services/UserPermissionServices"

export default function EditUser() {
  const { id } = useParams()
  const navigate = useNavigate()
  const apiRequest = useRequest()
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

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
    console.log(resp)
    if (resp.ok) {
      openNotification('success', 'Usuario actualizado', 'El usuario ha sido actualizado correctamente')
      navigate('/users')
    }

    if (!resp.ok) {
      openNotification('error', 'Error', resp.message)
    }
  }

  const onCancel = () => {
    navigate('/users')
  }

  useEffect(() => {
    async function fetchUser() {
      setLoading(true)
      const response = await apiRequest(() => apiGetUserPermissions(id))
      setLoading(false)
      if (response.ok) {
        setUser({
          ...response.data,
          password: '',
          passwordConfirmation: ''
        })
      }

      if (!response.ok) {
        openNotification('error', 'Error', response.message)
        navigate('/users')
      }
    }

    fetchUser()
  }, [apiRequest, id, navigate])

  return (
    <UserContextProvider value={{ user, setUser, addRole, deleteRole, addRestriction, deleteRestriction }}>
      <div className="flex justify-between mb-6">
        <ViewTitle title="Editar usuario" backPath={'/users'} showBackPage />
      </div>

      <Loading loading={loading}>
        <EditUserForm
          initialValues={user}
          onSubmit={onSubmit}
          onDelete={() => console.log('deleted')}
          onCancel={onCancel}
        />
      </Loading>
    </UserContextProvider>
  )
}
