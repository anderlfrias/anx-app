import UserImage from "components/custom/UserImage";
import { Button, Card } from "components/ui";
import { FaRegUserCircle } from "react-icons/fa";

export default function AuthorDetails({ author }) {
  const { name, firstSurname, secondSurname, username, email, phoneNumber, profilePicture } = author;

  return (
    <Card>
      <div className="flex flex-col items-center text-center mb-4">
        <UserImage
          src={profilePicture}
          size={80}
        />
        <div>
          <h5 className='mt-2'>{`${name} ${firstSurname} ${secondSurname}`}</h5>
          {/* <span>{username} | {email}</span> */}
        </div>
      </div>
      <div className='mb-2'>
        <span>Nombre de usuario</span>
        <p className="text-gray-700 dark:text-gray-200 font-semibold">
          {username}
        </p>
      </div>
      <div className='mb-2'>
        <span>Correo electrónico</span>
        <div>
          <a
            href={`mailto:${email}`}
            className="text-gray-700 dark:text-gray-200 font-semibold hover:text-sky-800 active:text-sky-900"
          >
            {email}
          </a>
        </div>
      </div>

      <div className='mb-2'>
        <span>Número de teléfono</span>
        <div>
          <a
            href={`tel:${phoneNumber}`}
            className="text-gray-700 dark:text-gray-200 font-semibold hover:text-sky-800 active:text-sky-900"
          >
            {phoneNumber}
          </a>
        </div>
      </div>

      <div className='flex justify-center mt-6'>
        <Button className='w-full' variant='outline' icon={<FaRegUserCircle />}>Ver pérfil</Button>
      </div>
    </Card>
  )
}
