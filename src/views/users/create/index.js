import ViewTitle from "components/custom/ViewTitle";
import UserForm from "../Form";

export default function Create() {

  const onSubmit = (values) => {
    console.log(values)
  }
  return (
    <>
      <div className="flex justify-between mb-6">
        <ViewTitle title="Crear usuarios" showBackPage />
      </div>

      <UserForm onSubmit={onSubmit} onDelete={() => console.log('deleted')} />
    </>
  )
}
