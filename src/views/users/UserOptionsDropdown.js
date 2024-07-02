import { ResetPasswordSvg } from "assets/svg"
import ChangePasswordSvg from "assets/svg/ChangePasswordSvg"
import Confirm from "components/custom/Confirm"
import { EllipsisButton } from "components/shared"
import { Dropdown } from "components/ui"
import { PREVIOUS_URL_KEY } from "constants/app.constant"
import { Link } from "react-router-dom"
import { apiResetPassword } from "services/UserService"
import useRequest from "utils/hooks/useRequest"
import useURLSearchParams from "utils/hooks/useURLSearchParams"
import openNotification from "utils/openNotification"

export default function UserOptionsDropdown({ userId, onOpenChange, className }) {
  const apiRequest = useRequest()
  const params = useURLSearchParams()

  const onDropdownOpen = () => onOpenChange?.(true)
  const onDropdownClose = () => { onOpenChange?.(false) }

  const onResetPassword = async () => {

    const resp = await apiRequest(() => apiResetPassword(userId))
    if (resp.ok) {
      openNotification('success', 'Contraseña reseteada', 'La contraseña ha sido reseteada correctamente')
    }

    if (!resp.ok) {
      openNotification('error', 'Error', resp.message)
      console.error(resp)
    }
  }

  return (
    <>
      <Dropdown
        placement="middle-end-top"
        renderTitle={<EllipsisButton shape='round' className={`rotate-90 ${className}`} />}
        onOpen={onDropdownOpen}
        onClose={onDropdownClose}
      >
        <Dropdown.Item
          eventKey='change-password'
        >
          <Link to={`/users/${userId}/change-password?${PREVIOUS_URL_KEY}=${encodeURIComponent(params.fullPath)}`} className="flex gap-2 items-center">
            <span className="text-xl opacity-50"><ChangePasswordSvg /></span>
            <span>Cambiar Contraseña</span>
          </Link>
        </Dropdown.Item>

        <Dropdown.Item
          eventKey='reset-password'
        >
          <Confirm
            type='warning'
            subtitle='¿Estás seguro de desear resetear la contraseña de este usuario?'
            onConfirm={onResetPassword}
          >
            <div className="flex gap-2 items-center">
              <span className="text-xl opacity-50"><ResetPasswordSvg /></span>
              <span>Resetear Contraseña</span>
            </div>
          </Confirm>
        </Dropdown.Item>
      </Dropdown>
    </>
  )
}
