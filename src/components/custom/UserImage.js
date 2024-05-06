import { Avatar } from "components/ui";
import { FaUser } from "react-icons/fa";

export default function UserImage({ className, src, size, ...rest }) {
  return (
    <Avatar
      className={className}
      shape='circle'
      size={size}
      src={src}
      icon={<FaUser />}
      {...rest}
    />
  )
}
