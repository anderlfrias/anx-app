import classNames from "classnames";
import TextToCopy from "components/custom/TextToCopy";
import { Card } from "components/ui"
import { lastChars } from "utils/string";
import { maskPhoneNumber } from "utils/mask";
import { useDispatch, useSelector } from "react-redux";
import AvatarUpload from "components/custom/AvatarUpload";
import { setUser as setUserSlice } from 'store/auth/userSlice'
import useRequest from "utils/hooks/useRequest";
import { apiUpdateProfilePicture } from "services/ProfileServices";
import openNotification from "utils/openNotification";

export const UserInfoField = ({ label, value }) => (
  <div>
    <span>{label}</span>
    <div>
      <span
        className={classNames(
          'min-w-max',
          { 'text-gray-700 dark:text-gray-200 font-semibold': value },
          { 'text-gray-400 dark:text-gray-500 italic': !value }
        )}
      >
        {value || 'No proporcionado'}
      </span>
    </div>
  </div>
)

export default function ProfileOverview({ className }) {
  const apiRequest = useRequest()
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.auth.user)

  const onChangeProfilePicture = async (picture) => {
    const resp = await apiRequest(() => apiUpdateProfilePicture({ profilePicture: picture }))
    if (resp.ok) {
      dispatch(setUserSlice({ ...userInfo, profilePicture: picture }))
      openNotification('success', 'Imagen actualizada', 'Tu imagen de perfil ha sido actualizada correctamente')
    }
    if (!resp.ok) {
      openNotification('error', 'Error', resp.message)
    }
  }

  return (
    <div className={className}>
      <Card>
        <div className='flex flex-col lg:justify-between h-full 2xl:min-w-[360px] mx-auto'>
          <div className='sm:flex lg:flex-col items-center text-center gap-4'>
              <AvatarUpload
                value={user.profilePicture}
                onChange={onChangeProfilePicture}
                size={100}
              />
            <h4 className="">{`${user.name} ${user.firstSurname} ${user.secondSurname}`}</h4>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-y-7 gap-x-4 mt-8'>
            <UserInfoField label='Nombre de usuario' value={user.username} />
            <UserInfoField label='Correo electrónico' value={user.email} />
            <UserInfoField label='Número de teléfono' value={maskPhoneNumber(user.phoneNumber)} />
            <UserInfoField label='Código de empleado' value={user.employeeCode} />
            <UserInfoField label='Código externo'
              value={user.externalCode && (
                <TextToCopy text={user.externalCode}>{lastChars(user.externalCode, 6).toUpperCase()}</TextToCopy>
              )}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}
