import { Select } from "components/ui";
import { useEffect, useState } from "react";
import { apiGetAppById, apiGetApps } from "services/AppService";
import useRequest from "utils/hooks/useRequest";
import AsyncSelect from 'react-select/async';

export default function AppsAsyncSelect({ value, className, placeholder, noOptionsMessage, ...rest }) {
  const apiRequest = useRequest()
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(false)
  const [defaultValue, setDefaultValue] = useState(value)

  const loadOptions = async (inputValue, callback) => {
    setLoading(true)
    const query = inputValue ? `search=${inputValue}` : ''
    const resp = await apiRequest(() => apiGetApps(query))

    if (resp.ok) {
      callback(
        resp.data.apps.map(app => ({
          label: `${app.code} | ${app.name}`,
          value: app.id,
        }))
      )
    }
    setLoading(false)
  }

  useEffect(() => {
    async function fetchApps() {
      const resp = await apiRequest(() => apiGetApps())

      if (resp.ok) {
        setApps(resp.data.apps.map(app => ({
          label: `${app.code} | ${app.name}`,
          value: app.id,
        })))
        setLoading(false)
      }
    }

    fetchApps()
  }, [apiRequest])

  useEffect(() => {
    // If the value changes, we set the default value
    if (value) {
      let appsOptions = apps;
      const app = appsOptions.find(app => app.value === value)
      if (app) {
        setDefaultValue(app)
      }

      // If the role is not in the list, we fetch it by id
      if (!app) {
        async function fetchApp() {
          const { ok, data: app } = await apiRequest(() => apiGetAppById(value))
          if (ok) {
            appsOptions = [...appsOptions, {
              label: `${app.code} | ${app.name}`,
              value: app.id,
            }]

            setDefaultValue({
              label: `${app.code} | ${app.name}`,
              value: app.id,
            })
            setApps(appsOptions)
          }
        }

        fetchApp()
      }
    }

    if (!value) {
      setDefaultValue(null)
    }
  }, [apiRequest, value, apps])

  return (
    <div>
      <Select
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions={apps}
        componentAs={AsyncSelect}
        noOptionsMessage={() => noOptionsMessage || 'No se encontraron aplicaciones'}
        placeholder={placeholder || 'Buscar aplicación...'}
        value={apps.filter(({ value: optionValue }) => optionValue === defaultValue?.value)}
        isLoading={loading}
        isClearable
        {...rest}
      />
    </div>
  )
}
