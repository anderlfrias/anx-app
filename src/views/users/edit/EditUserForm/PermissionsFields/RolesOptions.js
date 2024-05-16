import { Checkbox } from "components/ui";
import { useContext, useEffect, useState } from "react";
import { apiGetRestrictionsByAppIdAndRoleId } from "services/RestrictionService";
import useRequest from "utils/hooks/useRequest";
import openNotification from "utils/openNotification";
import UserContext from "../../UserContext";
import { apiDeleteRestrictionOfUserInApp, apiPostRestrictionToUserInApp } from "services/UserPermissionServices";
import { Loading } from "components/shared";

export default function RolesOptions({ role, rolesOfUser, onChangeRole: onChangeRoleFromProps, app }) {
  const apiRequest = useRequest()
  const { user, addRestriction, deleteRestriction } = useContext(UserContext)
  const [rolesIds, setRolesIds] = useState([]) // [roleId, roleId, roleId
  const [restrictions, setRestrictions] = useState([])
  const [restrictionsOfUser, setRestrictionsOfUser] = useState([]) // [restrictionId, restrictionId, restrictionId]
  const [loading, setLoading] = useState(false)

  const onChangeRestrictions = (checked, restriction) => {
    if (checked) {
      return addRestrictionToUser(restriction)
    }

    if (!checked) {
      return deleteRestrictionOfUser(restriction)
    }

  }

  const onChangeRole = async (checked, roleId) => {
    setLoading(true)
    await onChangeRoleFromProps(checked, roleId)
    setLoading(false)
  }

  const addRestrictionToUser = async (restriction) => {
    setLoading(true)
    const resp = await apiRequest(() => apiPostRestrictionToUserInApp(user.id, app.id, role.id, { restrictionId: restriction.id }))
    if (resp.ok) {
      setRestrictionsOfUser((prev) => [...prev, resp.data.restriction])
      addRestriction(resp.data, app.id, role.id)
      openNotification('success', 'Success', 'Restricción asignada correctamente')
    }

    if (!resp.ok) {
      openNotification('error', 'Error', resp.message)
    }
    setLoading(false)
  }

  const deleteRestrictionOfUser = async (restriction) => {
    setLoading(true)
    const resp = await apiRequest(() => apiDeleteRestrictionOfUserInApp(user.id, app.id, role.id, restriction.id))
    if (resp.ok) {
      setRestrictionsOfUser((prev) => prev.filter(restrictionId => restrictionId !== restriction.id))
      deleteRestriction(restriction.id, app.id, role.id)
      openNotification('success', 'Success', 'Restricción eliminada correctamente')
    }

    if (!resp.ok) {
      openNotification('error', 'Error', resp.message)
    }
    setLoading(false)
  }
  
  useEffect(() => {
    const mapRestrictionsOfUser = (user) => {
      const thisRoleInUser = user?.apps.find(userApp => userApp.app === app.id)?.roles?.find(uarole => uarole.role === role.id)
      const resctrictionsOfThisRole = thisRoleInUser?.restrictions || []
      return resctrictionsOfThisRole.map(uarrestriction => uarrestriction.restriction)
    }

    setRestrictionsOfUser(mapRestrictionsOfUser(user))
  }, [user, app, role])

  useEffect(() => {
    const fetchRoles = async () => {
      const resp = await apiRequest(() => apiGetRestrictionsByAppIdAndRoleId(app.id, role.id))
      if (resp.ok) {
        setRestrictions(resp.data)
      }
      
      if (!resp.ok) {
        openNotification('danger', 'Error', resp.message)
        console.error('Error:', resp.error)
      }
    }
    
    rolesIds.includes(role.id) ? fetchRoles() : setRestrictions([])
  }, [apiRequest, app, role, rolesIds])

  useEffect(() => setRolesIds(rolesOfUser.map(uarole => uarole.role)), [rolesOfUser])

  return (
    <Loading loading={loading} type='cover'>
    <div className='grid mb-2'>
      <div>
        <Checkbox
          onChange={() => onChangeRole(!rolesIds.includes(role.id), role.id)}
          checked={rolesIds.includes(role.id)}
        >
          {role.name}
        </Checkbox>
      </div>
      <div className='ml-7'>
        {(rolesIds.includes(role.id) && restrictions.length > 0) && <span className='block text-gray-900 dark:text-gray-50 font-semibold'>Restricciones</span>}
        {restrictions.map(restriction => (
          <Checkbox
            key={restriction.id}
            onChange={() => onChangeRestrictions(!restrictionsOfUser.includes(restriction.id), restriction)}
            checked={restrictionsOfUser.includes(restriction.id)}
          >
            {restriction.name}
          </Checkbox>
        ))}
      </div>
    </div>
    </Loading>
  )
}
