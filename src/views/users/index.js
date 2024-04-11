import ViewTitle from "components/custom/ViewTitle";
import UsersList from "./UsersList";

export default function Users() {
  return (
    <>
      <div className="mb-6">
        <ViewTitle title="Usuarios" />
      </div>

      <UsersList />
    </>
  )
}
