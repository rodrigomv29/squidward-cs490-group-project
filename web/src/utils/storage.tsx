export const setVariable = (value: number) => {
  localStorage.setItem('variable', String(value))
}

// Get the value of the variable from local storage
export const getVariable = (): number | null => {
  const value = localStorage.getItem('variable')
  return value ? Number(value) : null
}
