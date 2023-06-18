export const setStatus = (status: number) => {
  localStorage.setItem('status', String(status))
}

// Get the status from local storage
export const getStatus = () => {
  const status = localStorage.getItem('status')
  return status ? parseInt(status, 10) : null
}
export function getCurrentMilitaryTime(): {
  hours: string
  minutes: string
  militaryTime: string
} {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')

  const militaryTime = `${hours}:${minutes}`
  return { hours, minutes, militaryTime }
}

export function getTimeSincePublication(publishedAt) {
  const dateTimeString = publishedAt
  const regex = /T(\d{2}):(\d{2})/
  const matches = regex.exec(dateTimeString)

  let hours = 0
  let minutes = 0

  const currentTime = getCurrentMilitaryTime()

  if (matches && matches.length > 2) {
    hours = parseInt(matches[1], 10)
    minutes = parseInt(matches[2], 10)
  }

  hours = Math.abs(parseInt(currentTime.hours) - hours)
  minutes = Math.abs(parseInt(currentTime.minutes) - minutes)

  return { hours, minutes }
}
