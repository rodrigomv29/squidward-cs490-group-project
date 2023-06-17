import React, { createContext, useState, useEffect } from 'react'

const ThemeContext = createContext({
  theme: 0,
  toggleTheme: () => {},
})

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(0) // Initial theme value

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    setTheme(savedTheme ? parseInt(savedTheme) : 0)
  }, [])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 0 ? 1 : 0))
    localStorage.setItem('theme', theme === 0 ? '1' : '0')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext
