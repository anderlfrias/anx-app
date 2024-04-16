import ViewTitle from 'components/custom/ViewTitle';
import AppForm from '../Form';
import useRequest from 'utils/hooks/useRequest';
import { apiCreateApp } from 'services/AppService';
import openNotification from 'utils/openNotification';
import { useNavigate } from 'react-router-dom';

export default function CreateApp() {
  const apiRequest = useRequest()
  const navigate = useNavigate()

  const onSubmit = async (values) => {

    const resp = await apiRequest(() => apiCreateApp(values))
    
    if (resp.ok) {
      openNotification('success', 'Aplicación creada', 'La aplicación ha sido creada correctamente')
      navigate(-1)
    }

    if (!resp.ok) {
      openNotification('danger', 'Error', 'Error al crear la aplicación')
      console.error('Error:', resp.error)
    }
  }

  const onCancel = () => {
    navigate(-1)
  }
  return (
    <div>
      <div className='mb-6'>
        <ViewTitle title='Crear Aplicación' showBackPage />
      </div>

      <AppForm onSubmit={onSubmit} onCancel={onCancel} />
    </div>
  )
}
