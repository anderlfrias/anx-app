import classNames from "classnames";
import Confirm from "components/custom/Confirm";
import TextToCopy from "components/custom/TextToCopy";
import UserImage from "components/custom/UserImage"
import { Button, Card } from "components/ui"
import { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { HiTrash } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { apiDeleteUser } from "services/UserService";
import useRequest from "utils/hooks/useRequest";
import openNotification from "utils/openNotification";

// TODO: mover a un archivo separado. /src/utils/string.js
const reverseString = (str) => str.split('').reverse().join('')

export const UserInfoField = ({ label, value }) => (
  <div>
    <span>{label}</span>
    <div>
      <span
        className={classNames(
          { 'text-gray-700 dark:text-gray-200 font-semibold': value },
          { 'text-gray-400 dark:text-gray-500 italic': !value }
        )}
      >
        {value || 'No proporcionado'}
      </span>
    </div>
  </div>
)

export default function UserOverview({ className, user }) {
  const apiRequest = useRequest()
  const navigate = useNavigate()
  const [deleting, setDeleting] = useState(false)
  const {
    username,
    name,
    email,
    phoneNumber,
    profilePicture,
    firstSurname,
    secondSurname,
    employeeCode,
    externalCode = '6629054c94d787fa79ec22cc',
  } = user;

  const onDelete = async () => {
    setDeleting(true)
    const resp = await apiRequest(() => apiDeleteUser(user.id))
    if (resp.ok) {
      openNotification('success', 'Usuario eliminado', 'El usuario ha sido eliminado correctamente')
      navigate(-1)
    }

    if (!resp.ok) {
      openNotification('error', 'Error', resp.message)
    }
    setDeleting(false)
  }

  const DATA_LIST = [
    { label: 'Nombre de usuario', value: username },
    { label: 'Correo electrónico', value: email },
    { label: 'Número de teléfono', value: phoneNumber },
    { label: 'Código de empleado', value: employeeCode },
    { label: 'Código externo', value: externalCode && (
      <TextToCopy text={externalCode}>{reverseString(reverseString(externalCode).slice(0, 6)).toUpperCase()}</TextToCopy>
    )},
  ]

  return (
    <div className={className}>
      <Card>
        <div className='flex flex-col lg:justify-between h-full 2xl:min-w-[360px] mx-auto'>
          <div className='flex lg:flex-col items-center gap-4'>
            <UserImage size={90} src={profilePicture} />
            <h4>{name} {firstSurname} {secondSurname}</h4>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-y-7 gap-x-4 mt-8'>
            {DATA_LIST.map((item, index) => (
              <UserInfoField key={index} label={item.label} value={item.value} />
            ))}
          </div>

          <div className='mt-7 flex flex-col lg:flex-row gap-2'>
            <Confirm
              loading={deleting}
              onConfirm={onDelete}
              type='danger'
              subtitle='¿Estás seguro de eliminar este usuario?'
            >
              <Button className='w-full' icon={<HiTrash />} >Eliminar</Button>
            </Confirm>
            <Link to={`/users/${user.id}`}>
              <Button className='w-full' variant='solid' icon={<FaUserEdit />} >Editar</Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}
