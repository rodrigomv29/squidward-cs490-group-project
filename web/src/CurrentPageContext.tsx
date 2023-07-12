import React, { createContext, useState } from 'react'

import { getIsHomePage } from 'src/utils/storage'

const CurrentPageContext = createContext({
  currentPage: '',
  toggleCurrentPage: (_page: string) => {},
})

export const CurrentPageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(() => {
    const storedPage = localStorage.getItem('currentPage')
    if (getIsHomePage() === true) {
      localStorage.setItem('currentPage', 'home')
      return 'home'
    }
    return storedPage
  })

  const toggleCurrentPage = (_page: string) => {
    setCurrentPage(_page)
    localStorage.setItem('currentPage', _page)
  }

  const firstLoad = sessionStorage.getItem('isFirstRender')

  if (firstLoad === null) {
    toggleCurrentPage('home')
    sessionStorage.setItem('isFirstRender', 'false')
  }

  return (
    <CurrentPageContext.Provider value={{ currentPage, toggleCurrentPage }}>
      {children}
    </CurrentPageContext.Provider>
  )
}

export default CurrentPageContext
