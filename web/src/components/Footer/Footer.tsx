import React from 'react'
import { useContext } from 'react'

import { Link, routes } from '@redwoodjs/router'

import CurrentPageContext from 'src/CurrentPageContext'
import CustomThemeContext from 'src/CustomThemeContext'

const CustomLink = (props) => {
  const { toggleCurrentPage } = useContext(CurrentPageContext)
  const { theme } = useContext(CustomThemeContext)
  const handleTheme = (first, second) => {
    if (theme === 1) {
      return first
    }
    return second
  }

  const handleLink = () => {
    toggleCurrentPage(props.category)
  }
  return (
    <>
      <div
        className={`${handleTheme(
          'text-white',
          'text-black'
        )} transition-colors duration-200 hover:text-emerald-400 hover:underline`}
      >
        <Link
          to={routes.category({ category: props.category })}
          onClick={handleLink}
        >
          <div>
            <span className="uppercase ">{props.category.slice(0, 1)}</span>
            <span>{props.category.slice(1)}</span>
          </div>
        </Link>
      </div>
    </>
  )
}

function Footer() {
  const { theme } = useContext(CustomThemeContext)
  const categories = [
    'home',
    'general',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology',
  ]
  return (
    <footer
      className={`mt-0 w-full transition-colors duration-300 ${
        theme === 1 ? 'bg-gray-800' : 'bg-gray-300'
      }`}
    >
      <div className={`container mx-auto py-4 pt-8 text-center`}>
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
          {categories.map((category: string) => {
            return (
              <>
                <CustomLink category={category} />
              </>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

export default Footer
