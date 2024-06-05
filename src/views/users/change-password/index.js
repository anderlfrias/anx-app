import ChangePasswordForm from "components/custom/ChangePasswordForm";
import ViewTitle from "components/custom/ViewTitle";
import { Card } from "components/ui";
import { useParams } from "react-router-dom";

export default function ChangePasswordAdmin() {
  const { id } = useParams()
  console.log('id', id)

  return (
    <>
      <div className='mb-6'>
        <ViewTitle title='Cambiar Contraseña' showBackPage />
      </div>
      
      <Card>
        <ChangePasswordForm userId={id}/>
      </Card>
    </>
  )
}
