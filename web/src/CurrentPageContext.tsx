import React, { createContext, useState, useEffect } from 'react'

const CurrentPageContext = createContext({
  currentPage: 'home',
  toggleCurrentPage: (_page: string) => {},
})

export const CurrentPageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('')

  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage')
    setCurrentPage(savedPage ? savedPage : '')
  }, [])

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
