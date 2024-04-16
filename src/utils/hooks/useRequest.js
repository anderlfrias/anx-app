import { useCallback } from 'react'
import useAuth from './useAuth'
import openNotification from 'utils/openNotification'

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

      return {
        ok: false,
        message: error?.response?.data?.message || error.toString(),
        error
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return apiRequest
}
