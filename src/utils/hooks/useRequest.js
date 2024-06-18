import { useCallback } from 'react'
import useAuth from './useAuth'
import openNotification from 'utils/openNotification'

const ERRORS_CODE = require('assets/maps/errors-code.json')
export default function useRequest () {
  const { signOut } = useAuth()
  const apiRequest = useCallback(async (cb) => {
    try {
      const resp = await cb()
      return {
        ok: true,
        data: resp.data
      }
    } catch (error) {
      console.error('Error:', error)

      if (error?.response?.status === 403) {
        openNotification('danger', 'Sesion expirada', 'Por favor inicie sesion nuevamente');
        signOut()
      }

      const message = ERRORS_CODE[error?.response?.data?.code] || 'Ocurrió un error inesperado. Contacte al administrador del sistema.'
      console.error('Error:', error)
      console.error('Message:', message)
      return { ok: false, message, error }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return apiRequest
}
