import ViewTitle from 'components/custom/ViewTitle';
import AppForm from '../Form';
import useRequest from 'utils/hooks/useRequest';
import { apiGetAppById, apiUpdateApp } from 'services/AppService';
import openNotification from 'utils/openNotification';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loading } from 'components/shared';

export default function EditApp() {
  const apiRequest = useRequest()
  const navigate = useNavigate()
  const { id } = useParams()
  const [app, setApp] = useState(null)
  const [loading, setLoading] = useState(true)

  const onSubmit = async (values) => {
    const resp = await apiRequest(() => apiUpdateApp(id, values))
    if (resp.ok) {
      openNotification('success', 'Aplicación creada', 'La aplicación ha sido creada correctamente')
      navigate(-1)
    }

    if (!resp.ok) {
      openNotification('danger', 'Error', resp.message)
      console.error('Error:', resp.error)
    }
  }

  const onCancel = () => {
    navigate(-1)
  }

  useEffect(() => {
    async function fetchApp() {
      setLoading(true)
      const resp = await apiRequest(() => apiGetAppById(id))
      if (resp.ok) {
        setApp(resp.data)
      }

      if (!resp.ok) {
        openNotification('danger', 'Error', resp.message)
        console.error('Error:', resp.error)
      }
      setLoading(false)
    }

    fetchApp()
  }, [apiRequest, id])
  return (
    <div>
      <div className='mb-6'>
        <ViewTitle title='Editar Aplicación' showBackPage />
      </div>

      <Loading loading={loading}>
        <AppForm
          initialValues={app}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </Loading>
    </div>
  )
}
