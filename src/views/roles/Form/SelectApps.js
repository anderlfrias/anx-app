import { Select } from "components/ui";
import { useEffect, useState } from "react";
import { apiGetApps } from "services/AppService";
import useRequest from "utils/hooks/useRequest";
import openNotification from "utils/openNotification";

export default function SelectApps({ value, ...rest }) {
  const apiRequest = useRequest();
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const fetchApps = async () => {
      const resp = await apiRequest(() => apiGetApps());

      if (resp.ok) {
        console.log(resp.data);
        setApps(resp.data.map((app) => ({
          label: app.name,
          value: app.id
        })));
      }

      if (!resp.ok) {
        openNotification("danger", "Error", "Error al obtener las aplicaciones");
        console.error("Error:", resp.error);
      }
    };

    fetchApps();
  }, [apiRequest]);
  return (
    <Select
      label="Aplicaciones"
      placeholder="Selecciona una aplicación"
      options={apps}
      value={apps.find((app) => app.value === value)}
      isClearable
      {...rest}
    />
  )
}
