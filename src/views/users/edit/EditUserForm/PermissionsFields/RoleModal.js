import { Loading } from "components/shared";
import { Button, Drawer } from "components/ui";
import { useContext, useState } from "react";
import { apiGetRolesByAppId } from "services/RoleService";
import useRequest from "utils/hooks/useRequest";
import UserContext from "../../UserContext";
import openNotification from "utils/openNotification";
import { apiDeleteRoleOfUserInApp, apiPostRoleToUserInApp } from "services/UserPermissionServices";
import RolesOptions from "./RolesOptions";

export default function RoleModal({ app }) {
  const apiRequest = useRequest();
  const [roles, setRoles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [rolesOfUser, setRolesOfUser] = useState([]); // [roleId, roleId, roleId]
  const { user, addRole, deleteRole } = useContext(UserContext);

  const openDrawer = async () => {
    if (!user.apps.find(userApp => userApp.app === app.id)) {
      openNotification('info', 'Información', 'El usuario no tiene permisos para esta aplicación')
      return
    }

    setRolesOfUser(mapRolesOfUser(user))
    setIsOpen(true)
    await fetchRoles()
  }

  const onDrawerClose = () => {
    setIsOpen(false)
  }

  const mapRolesOfUser = (user) => {
    return user?.apps.find(userApp => userApp.app === app.id)?.roles || []
  }

  const onChangeRole = async(checked, roleId) => {
    if (checked) {
      return await addRoleToUser(roleId)
    }

    if (!checked) {
      return await deleteRoleOfUser(roleId)
    }
  }

  const addRoleToUser = async (roleId) => {
    const resp = await apiRequest(() => apiPostRoleToUserInApp(user.id, app.id, { roleId }))
    if (resp.ok) {
      setRolesOfUser((prev) => [...prev, resp.data])
      addRole(resp.data, app.id)
    }

    if (!resp.ok) {
      openNotification('error', 'Error', resp.message)
    }
  }

  const deleteRoleOfUser = async (roleId) => {
    const resp = await apiRequest(() => apiDeleteRoleOfUserInApp(user.id, app.id, roleId))
    if (resp.ok) {
      setRolesOfUser((prev) => prev.filter(({ role }) => role !== roleId))
      deleteRole(roleId, app.id)
    }

    if (!resp.ok) {
      openNotification('error', 'Error', resp.message)
    }
  }

  const fetchRoles = async () => {
    setLoadingRoles(true)
    const resp = await apiRequest(() => apiGetRolesByAppId(app.id))

    if (resp.ok) {
      setRoles(resp.data)
    }
    setLoadingRoles(false)
  }

  const Footer = (
    <div className="text-right w-full">
      <Button size="sm" variant="solid" onClick={() => onDrawerClose()}>
        Terminar
      </Button>
    </div>
  )

  const Title = (
    <div>
      <h5>{app.code}</h5>
      <p>Roles en <strong>{app.name}</strong></p>
    </div>
  )

  return (
    <div>
      <Button
        variant='outline'
        className='w-full'
        type='button'
        size="sm"
        onClick={openDrawer}
      >
        Roles
      </Button>

      <Drawer
        title={Title}
        footer={Footer}
        isOpen={isOpen}
        onClose={onDrawerClose}
        onRequestClose={onDrawerClose}
      >
        <Loading loading={loadingRoles} type='cover'>
          {roles.map(role => (
            <div key={role.id}>
              <RolesOptions
                role={role}
                app={app}
                rolesOfUser={rolesOfUser}
                onChangeRole={onChangeRole}
              />
            </div>
          ))}
        </Loading>
      </Drawer>
    </div>
  )
}
