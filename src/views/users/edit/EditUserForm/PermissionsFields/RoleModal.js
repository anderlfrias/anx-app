import { Loading } from "components/shared";
import { Button, Checkbox, Drawer } from "components/ui";
import { useContext, useState } from "react";
import { apiGetRolesByAppId } from "services/RoleService";
import useRequest from "utils/hooks/useRequest";
import UserContext from "../../UserContext";
import openNotification from "utils/openNotification";

export default function RoleModal({ app }) {
  const apiRequest = useRequest();
  const [roles, setRoles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const { user } = useContext(UserContext);

  const openDrawer = async () => {
    if (!user.apps.find(userApp => userApp.app === app.id)) {
      openNotification('info', 'Información', 'El usuario no tiene permisos para esta aplicación')
      return
    }
    setIsOpen(true)
    await fetchRoles()
  }

  const onDrawerClose = () => {
    setIsOpen(false)
  }

  const onChangeRole = (checked, roleId) => {
    console.log('checked', checked)
    console.log('userId', user.id)
    console.log('appId', app.id)
    console.log('roleId', roleId)
  }

  const fetchRoles = async () => {
    setLoadingRoles(true)
    const resp = await apiRequest(() => apiGetRolesByAppId(app.id))
    console.log('fetchRoles', resp)
    if (resp.ok) {
      setRoles(resp.data)
    }
    setLoadingRoles(false)
  }

  const Footer = (
    <div className="text-right w-full">
      <Button size="sm" className="mr-2" onClick={() => onDrawerClose()}>
        Cerrar
      </Button>
      <Button size="sm" variant="solid" onClick={() => onDrawerClose()}>
        Confirm
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
        <Loading loading={loadingRoles}>
          {roles.map(role => (
            <div key={role.id}>
              <Checkbox onChange={(checked) => onChangeRole(checked, role.id)} >
                {role.name}
              </Checkbox>
            </div>
          ))}
        </Loading>
      </Drawer>
    </div>
  )
}
