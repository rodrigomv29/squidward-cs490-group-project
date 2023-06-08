export const setStatus = (status: number) => {
  localStorage.setItem('status', String(status))
}

// Get the status from local storage
export const getStatus = (): number | null => {
  const status = localStorage.getItem('status')
  return status ? parseInt(status, 10) : null
}
