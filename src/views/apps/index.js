import ViewTitle from "components/custom/ViewTitle";
import { Button } from "components/ui";
import { useEffect } from "react";
import { HiPlusCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { apiGetApps } from "services/AppService";
import useRequest from "utils/hooks/useRequest";

export default function Apps() {
  const apiRequest = useRequest()

  useEffect(() => {
    async function fetchData() {
      const response = await apiRequest(apiGetApps)
      console.log(response)
    }

    fetchData()
  }, [apiRequest])
  return (
    <div>
      <div className="flex justify-between mb-6">
        <ViewTitle title="Aplicaciones" />
        
        <Link to="/apps/create">
          <Button size="sm" variant='solid' icon={<HiPlusCircle />} >Crear Aplicacion</Button>
        </Link>
      </div>

    </div>
  )
}
