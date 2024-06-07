import { jwtDecode } from 'jwt-decode'

const mapUser = (user) => {
  const {roles, ...rest } = user
  return {
    ...rest,
    authority: roles.map(({ role }) => role),
  }
}

export const mapUserFromToken = (token) => {
  const user = jwtDecode(token)
  return mapUser(user)
}
