import ViewTitle from "components/custom/ViewTitle";
import RoleForm from "../Form";

export default function CreateRole() {
  return (
    <>
      <div className="flex justify-between mb-6">
        <ViewTitle title="Crear Roles" showBackPage />
      </div>

      <RoleForm />
    </>
  )
}
