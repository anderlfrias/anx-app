import { jwtDecode } from 'jwt-decode'

const mapUser = (user) => {
  const {rolesInApp, ...rest } = user
  return {
    ...rest,
    authority: rolesInApp || [],
  }
}

export const mapUserFromToken = (token) => {
  const user = jwtDecode(token)
  return mapUser(user)
}
