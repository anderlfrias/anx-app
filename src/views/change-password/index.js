import ViewTitle from "components/custom/ViewTitle";
import ChangePasswordForm from "./ChangePasswordForm";
import { Card } from "components/ui";

export default function ChangePassword() {
  return (
    <>
      <div className='mb-6'>
        <ViewTitle title='Cambiar Contraseña' showBackPage />
      </div>
      
      <Card>
        <ChangePasswordForm />
      </Card>
    </>
  )
}
