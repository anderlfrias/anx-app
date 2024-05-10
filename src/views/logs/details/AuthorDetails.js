import UserImage from "components/custom/UserImage";
import { Button, Card } from "components/ui";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserInfoField } from "views/users/profile/UserDetails/Overview";

export default function AuthorDetails({ author }) {
  const { name, firstSurname, secondSurname, username, email, phoneNumber, profilePicture, employeeCode } = author;

  return (
    <Card>
      <div className="flex flex-col items-center text-center mb-4">
        <UserImage
          src={profilePicture}
          size={80}
        />
        <div>
          <h5 className='mt-2'>{`${name} ${firstSurname} ${secondSurname}`}</h5>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-y-7 gap-x-4 mt-8'>
        <UserInfoField label='Nombre de usuario' value={username} />
        <UserInfoField label='Correo electrónico' value={email} />
        <UserInfoField label='Número de teléfono' value={phoneNumber} />
        <UserInfoField label='Código de empleado' value={employeeCode} />
      </div>

      <div className='mt-6'>
        <Link to={`/users/${author.id}/profile`}>
          <Button className='w-full' variant='outline' icon={<FaRegUserCircle />}>Ver pérfil</Button>
        </Link>
      </div>
    </Card>
  )
}
