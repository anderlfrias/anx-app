import { Select } from "components/ui";
import { useEffect, useState } from "react";
import useRequest from "utils/hooks/useRequest";
import AsyncSelect from 'react-select/async';
import { apiGetUserById, apiGetUsers } from "services/UserService";

export default function UsersAsyncSelect({ value, className, placeholder, noOptionsMessage, ...rest }) {
  const apiRequest = useRequest()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [defaultValue, setDefaultValue] = useState(value)

  const loadOptions = async (inputValue, callback) => {
    setLoading(true)
    const resp = await apiRequest(() => apiGetUsers(inputValue))

    if (resp.ok) {
      callback(
        resp.data.map(role => ({
          label: `${role.name}`,
          value: role.id,
        }))
      )
    }
    setLoading(false)
  }

  useEffect(() => {
    async function fetchUsers() {
      const resp = await apiRequest(() => apiGetUsers())
      if (resp.ok) {
        setUsers(resp.data.map(role => ({
          label: `${role.name}`,
          value: role.id,
        })))
        setLoading(false)
      }
    }

    fetchUsers()
  }, [apiRequest])

  useEffect(() => {
    // If the value changes, we set the default value
    if (value) {
      let usersOptions = users;
      const user = usersOptions.find(user => user.value === value)
      if (user) {
        setDefaultValue(user)
      }

      // If the user is not in the list, we fetch it by id
      if (!user) {
        async function fetchUser() {
          const { ok, data: user } = await apiRequest(() => apiGetUserById(value))

          console.log('user', user)
          if (ok) {
            usersOptions = [...usersOptions, {
              label: `${user.name}`,
              value: user.id,
            }]

            setDefaultValue({
              label: `${user.name}`,
              value: user.id,
            })
          }
        }

        fetchUser()
      }
    }

    if (!value) {
      setDefaultValue(null)
    }
  }, [apiRequest, value, users])

  return (
    <div>
      <Select
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions={users}
        componentAs={AsyncSelect}
        noOptionsMessage={() => noOptionsMessage || 'No se encontraron usuarios'}
        placeholder={placeholder || 'Buscar usuario...'}
        value={users.filter(({ value: optionValue }) => optionValue === defaultValue?.value)}
        isLoading={loading}
        isClearable
        {...rest}
      />
    </div>
  )
}