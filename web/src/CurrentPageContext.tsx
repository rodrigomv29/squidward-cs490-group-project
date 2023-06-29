import React, { createContext, useState } from 'react'

const CurrentPageContext = createContext({
  currentPage: 'home',
  toggleCurrentPage: (_page: string) => {},
})

export const CurrentPageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home')

  const toggleCurrentPage = (_page: string) => {
    setCurrentPage(_page)
    localStorage.setItem('currentPage', _page)
  }

  return (
    <CurrentPageContext.Provider value={{ currentPage, toggleCurrentPage }}>
      {children}
    </CurrentPageContext.Provider>
  )
}

export default CurrentPageContext
