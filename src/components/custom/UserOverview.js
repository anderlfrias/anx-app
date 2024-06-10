import classNames from "classnames";
import TextToCopy from "components/custom/TextToCopy";
import UserImage from "components/custom/UserImage"
import { Card } from "components/ui"
import { lastChars } from "utils/string";

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

export default function UserOverview({ className, user, actions:ActionsComponent }) {
  const {
    username,
    name,
    email,
    phoneNumber,
    profilePicture,
    firstSurname,
    secondSurname,
    employeeCode,
    externalCode,
  } = user;

  const DATA_LIST = [
    { label: 'Nombre de usuario', value: username },
    { label: 'Correo electrónico', value: email },
    { label: 'Número de teléfono', value: phoneNumber },
    { label: 'Código de empleado', value: employeeCode },
    { label: 'Código externo', value: externalCode && (
      <TextToCopy text={externalCode}>{lastChars(externalCode, 6).toUpperCase()}</TextToCopy>
    )},
  ]

  return (
    <div className={className}>
      <Card>
        <div className='flex flex-col lg:justify-between h-full 2xl:min-w-[360px] mx-auto'>
          <div className='flex lg:flex-col items-center text-center gap-4'>
            <UserImage size={90} src={profilePicture} />
            <h4>{name} {firstSurname} {secondSurname}</h4>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-y-7 gap-x-4 mt-8'>
            {DATA_LIST.map((item, index) => (
              <UserInfoField key={index} label={item.label} value={item.value} />
            ))}
          </div>
          {ActionsComponent && <ActionsComponent />}
        </div>
      </Card>
    </div>
  )
}
