import { Select } from "components/ui";
import { useEffect, useState } from "react";
import useRequest from "utils/hooks/useRequest";
import AsyncSelect from 'react-select/async';
import { apiGetRoleById, apiGetRoles } from "services/RoleService";

export default function RolesAsyncSelect({ value, className, placeholder, noOptionsMessage, ...rest }) {
  const apiRequest = useRequest()
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(false)
  const [defaultValue, setDefaultValue] = useState(value)

  const loadOptions = async (inputValue, callback) => {
    setLoading(true)
    const query = inputValue ? `search=${inputValue}` : ''
    const resp = await apiRequest(() => apiGetRoles(query))

    if (resp.ok) {
      callback(
        resp.data.roles.map(role => ({
          label: `${role.name}`,
          value: role.id,
        }))
      )
    }
    setLoading(false)
  }

  useEffect(() => {
    async function fetchRoles() {
      const resp = await apiRequest(() => apiGetRoles())
      if (resp.ok) {
        setRoles(resp.data.roles.map(role => ({
          label: `${role.name}`,
          value: role.id,
        })))
        setLoading(false)
      }
    }

    fetchRoles()
  }, [apiRequest])

  useEffect(() => {
    // If the value changes, we set the default value
    if (value) {
      let rolesOptions = roles;
      const role = rolesOptions.find(role => role.value === value)
      if (role) {
        setDefaultValue(role)
      }

      // If the role is not in the list, we fetch it by id
      if (!role) {
        async function fetchRole() {
          const { ok, data: role } = await apiRequest(() => apiGetRoleById(value))
          if (ok) {
            rolesOptions = [...rolesOptions, {
              label: `${role.name}`,
              value: role.id,
            }]

            setDefaultValue({
              label: `${role.name}`,
              value: role.id,
            })

            setRoles(rolesOptions)
          }
        }

        fetchRole()
      }
    }

    if (!value) {
      setDefaultValue(null)
    }
  }, [apiRequest, value, roles])

  return (
    <div>
      <Select
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions={roles}
        componentAs={AsyncSelect}
        noOptionsMessage={() => noOptionsMessage || 'No se encontraron roles'}
        placeholder={placeholder || 'Buscar rol...'}
        value={roles.filter(({ value: optionValue }) => optionValue === defaultValue?.value)}
        isLoading={loading}
        isClearable
        {...rest}
      />
    </div>
  )
}
