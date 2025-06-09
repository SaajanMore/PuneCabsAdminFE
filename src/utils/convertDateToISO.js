export default function convertDateToISO(indianDate) {
  if (!indianDate) return ''
  const [day, month, year] = indianDate.split('/')
  if (!day || !month || !year) return ''
  // pad day and month with leading zero if needed
  const dd = day.padStart(2, '0')
  const mm = month.padStart(2, '0')
  return `${year}-${mm}-${dd}`
}
