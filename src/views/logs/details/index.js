import CustomizedTag from "components/custom/CustomizedTag";
import ViewTitle from "components/custom/ViewTitle";
import { Loading } from "components/shared";
import { Button, Card } from "components/ui";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { apiGetLogById } from "services/LogService";
import useRequest from "utils/hooks/useRequest";
import { ACCTIONS_COLORS, LogStatus } from "../LogsList";
import UserOverview from "components/custom/UserOverview";
import { PREVIOUS_URL_KEY } from "constants/app.constant";
import { FaRegUserCircle } from "react-icons/fa";
import useURLSearchParams from "utils/hooks/useURLSearchParams";

export default function LogsDetails() {
  const { id } = useParams();
  const apiRequest = useRequest();
  const [loading, setLoading] = useState(true);
  const [log, setLog] = useState({});
  const params = useURLSearchParams();

  useEffect(() => {
    async function fetchLog() {
      setLoading(true);
      const resp = await apiRequest(() => apiGetLogById(id));
      console.log(resp)
      if (resp.ok) {
        setLog(resp.data);
      }

      setLoading(false);
    }

    fetchLog();
  }, [apiRequest, id])

  const UserAction = () => (
    <div className='mt-6'>
      <Link to={`/users/${log.author?.id}/profile?${PREVIOUS_URL_KEY}=${params.fullPath}`}>
        <Button className='w-full' variant='outline' icon={<FaRegUserCircle />}>Ver pérfil</Button>
      </Link>
    </div>
  )
  return (
    <>
      <div className='flex justify-between mb-6'>
        <ViewTitle title={'Detalles de la actividad'} backPath={decodeURIComponent(params.get(PREVIOUS_URL_KEY))} showBackPage />
      </div>

      <Loading loading={loading}>
        <div className='grid lg:grid-cols-3 gap-4'>
          <div className='lg:order-last'>
            {log.author ? (
              <UserOverview
                user={log.author}
                actions={UserAction}
              />
            ) : (
              <div className='flex justify-center items-center h-full'>
                <span className='text-gray-500 italic'>Sin autor</span>
              </div>
            )}
          </div>
          <Card className='lg:col-span-2'>
            <div className='flex gap-3 py-2 odd:bg-white even:bg-slate-50'>
              <p className='w-56 font-bold'>Accion</p>
              <div className='w-full'>
                <CustomizedTag color={ACCTIONS_COLORS[log.action]} text={log.action} />
              </div>
            </div>

            <div className='flex gap-3 py-2 odd:bg-white even:bg-slate-50'>
              <p className='w-56 font-bold'>Fecha</p>
              <p className='w-full'>{new Date(log.date).toLocaleString()}</p>
            </div>

            <div className='flex gap-3 py-2 odd:bg-white even:bg-slate-50'>
              <p className='w-56 font-bold'>Origen</p>
              <p className='w-full'>{log.origin}</p>
            </div>

            <div className='flex gap-3 py-2 odd:bg-white even:bg-slate-50'>
              <p className='w-56 font-bold'>Elemento</p>
              <p className='w-full'>{log.elementId}</p>
            </div>

            <div className='flex gap-3 py-2 odd:bg-white even:bg-slate-50'>
              <p className='w-56 font-bold'>Estado</p>
              <div className='w-full'>
                <LogStatus success={log.success} />
              </div>
            </div>

            <div className='flex gap-3 py-2 bg-slate-50'>
              <p className='w-56 font-bold'>Descripcion:</p>
            </div>
            <pre className='w-full' style={{ whiteSpace: 'pre-wrap' }} >
              {log.description}
            </pre>
          </Card>
        </div>
      </Loading>
    </>
  )
}
