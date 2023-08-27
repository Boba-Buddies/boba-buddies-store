export function formatDateToDDMMYYYY(dateString: string) {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

export function format24HourTo12Hour(dateString: string) {
  const date = new Date(dateString)

  const hour = date.getHours()
  const minute = date.getMinutes()
  const twelveHour = hour % 12 || 12

  // Determine whether it's AM or PM
  const ampm = hour < 12 ? 'AM' : 'PM'

  // Pad the minute with a zero if it's less than 10
  const minuteString = minute < 10 ? `0${minute}` : minute

  // Return the formatted time
  return `${twelveHour}:${minuteString}${ampm}`
}
