export const getDateWithEndDay = (date) => {
  const d = new Date(date)
  d.setHours(23, 59, 59, 999)
  return d.toISOString()
}