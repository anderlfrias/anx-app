import { PERSIST_STORE_NAME } from "constants/app.constant"
import deepParseJson from "./deepParseJson"
import { ROOT } from "constants/roles.constant"

const getNormalisedRoles = (roles) => {
  if (!roles) return []
  return roles.map((role) => role.toLowerCase())
}

export const displayRole = (roles) => {
  if (!roles) return ''
  const normalisedRoles = getNormalisedRoles(roles)
  if (normalisedRoles.includes('root')) return 'Root'
  if (normalisedRoles.includes('admin')) return 'Admin'
  if (normalisedRoles.includes('user')) return 'User'
  if (normalisedRoles.length > 0) return normalisedRoles[0]
  return ''
}

export const getPrimaryRole = (roles) => {
  if (!roles) return ''
  const normalisedRoles = getNormalisedRoles(roles)
  if (normalisedRoles.includes('root')) return 'root'
  if (normalisedRoles.includes('admin')) return 'admin'
  if (normalisedRoles.includes('user')) return 'user'
  if (normalisedRoles.length > 0) return normalisedRoles[0]
  return ''
}

export const getRolesOfCurrentUser = () => {
  const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME)
  const persistData = deepParseJson(rawPersistData)
  const roles = persistData?.auth?.user?.authority || null
  return roles
}

export const isRoot = () => {
  const roles = getRolesOfCurrentUser()
  const normalisedRoles = getNormalisedRoles(roles)
  return normalisedRoles.includes(ROOT)
}
