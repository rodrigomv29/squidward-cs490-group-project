import { useContext } from 'react'

import { MetaTags } from '@redwoodjs/web'

import ThemeContext from 'src/ThemeContext'
import { getStatus } from 'src/utils/storage'

import DefaultHomePage from '../DefaultHomePage/DefaultHomePage'

const HomePage = () => {
  const status = getStatus()
  const { theme } = useContext(ThemeContext)
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      {status === 0 ? (
        <DefaultHomePage />
      ) : (
        <div
          className={`h-screen w-full transition-colors duration-300 ${
            theme === 1 ? 'bg-gray-700 text-white' : ''
          }`}
        >
          Logged in
        </div>
      )}
    </>
  )
}

export default HomePage
