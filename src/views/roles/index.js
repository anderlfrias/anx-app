import ViewTitle from "components/custom/ViewTitle";
import RolesList from "./RolesList";

export default function Roles() {
  return (
    <>
      <div className="mb-6">
        <ViewTitle title="Roles" />
      </div>

      <RolesList />
    </>
  )
}