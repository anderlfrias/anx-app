import CustomizedTag from "components/custom/CustomizedTag";
import ViewTitle from "components/custom/ViewTitle";
import { Loading } from "components/shared";
import { Card } from "components/ui";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { apiGetLogById } from "services/LogService";
import useRequest from "utils/hooks/useRequest";
import { ACCTIONS_COLORS, LogStatus } from "../LogsList";
import AuthorDetails from "./AuthorDetails";

export default function LogsDetails() {
  const { id } = useParams();
  const apiRequest = useRequest();
  const [loading, setLoading] = useState(true);
  const [log, setLog] = useState({});

  console.log(id)

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
  return (
    <>
      <div className='flex justify-between mb-6'>
        <ViewTitle title={'Detalles de la actividad'} showBackPage />
      </div>

      <Loading loading={loading}>
        <div className='grid grid-cols-3 gap-4'>
          <Card className='col-span-2'>
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
            <p className='w-full'>
              {log.description}
            </p>
          </Card>

          <div>
            {log.author ? (
              <AuthorDetails author={log.author} />
            ) : (
              <div className='flex justify-center items-center h-48'>
                <span className='text-gray-500 italic'>Sin autor</span>
              </div>
            )}
          </div>
        </div>
      </Loading>
    </>
  )
}
