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