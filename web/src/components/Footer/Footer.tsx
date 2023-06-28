import React from 'react'
import { useContext } from 'react'

import { Link, routes } from '@redwoodjs/router'

import CustomThemeContext from 'src/CustomThemeContext'

function Footer() {
  const { theme } = useContext(CustomThemeContext)
  return (
    <footer
      className={`mt-0 w-full transition-colors duration-300 ${
        theme === 1 ? 'bg-gray-800' : 'bg-gray-300'
      }`}
    >
      <div className={`container mx-auto py-4 text-center pt-8`}>
        <span
          className={`text-mdfont-bold transition-colors duration-300 ${
            theme === 1 ? 'text-white' : 'text-gray-700'
          }`}
        >
          &copy; {new Date().getFullYear()} Squidward News. All rights reserved.
        </span>
        <div
          className={`mt-0 flex justify-center space-x-4 py-4 transition-colors duration-300 ${
            theme === 1 ? 'text-white' : 'text-black'
          }`}
        >
          <Link
            to={routes.home()}
            className="transition-colors duration-200 ease-in-out hover:text-emerald-400 hover:underline"
          >
            Home
          </Link>
          <Link
            to={routes.home()}
            className="transition-colors duration-200 ease-in-out hover:text-emerald-400 hover:underline"
          >
            General
          </Link>
          <Link
            to={routes.home()}
            className="transition-colors duration-200 ease-in-out hover:text-emerald-400 hover:underline"
          >
            Business
          </Link>
          <Link
            to={routes.home()}
            className="transition-colors duration-200 ease-in-out hover:text-emerald-400 hover:underline"
          >
            Entertainment
          </Link>
          <Link
            to={routes.home()}
            className="transition-colors duration-200 ease-in-out hover:text-emerald-400 hover:underline"
          >
            Health
          </Link>
          <Link
            to={routes.home()}
            className="transition-colors duration-200 ease-in-out hover:text-emerald-400 hover:underline"
          >
            Science
          </Link>
          <Link
            to={routes.home()}
            className="transition-colors duration-200 ease-in-out hover:text-emerald-400 hover:underline"
          >
            Sports
          </Link>
          <Link
            to={routes.home()}
            className="transition-colors duration-200 ease-in-out hover:text-emerald-400 hover:underline"
          >
            Technology
          </Link>
          <Link
            to={routes.home()}
            className="transition-colors duration-200 ease-in-out hover:text-emerald-400 hover:underline"
          >
            About Us
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
