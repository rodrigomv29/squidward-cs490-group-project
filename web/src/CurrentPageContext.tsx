import React, { createContext, useState } from 'react'

import { setFirstRender } from 'src/utils/storage'

const CurrentPageContext = createContext({
  currentPage: '',
  toggleCurrentPage: (_page: string) => {},
})

export const CurrentPageProvider = ({ children }) => {
  const isFirstRender = setFirstRender()
  const [currentPage, setCurrentPage] = useState(() => {
    const storedPage = localStorage.getItem('currentPage')
    if (isFirstRender) {
      setCurrentPage('home')
      localStorage.setItem('currentPage', 'home')
      return 'home'
    }
    return storedPage || 'home'
  })

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
