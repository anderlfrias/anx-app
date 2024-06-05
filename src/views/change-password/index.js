import ChangePasswordForm from "components/custom/ChangePasswordForm";
import ViewTitle from "components/custom/ViewTitle";
import { Card } from "components/ui";
import { useSelector } from "react-redux";

export default function ChangePassword() {
  const { id } = useSelector((state) => state.auth.user)

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
