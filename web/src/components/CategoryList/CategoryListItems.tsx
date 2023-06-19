import React from 'react'
import { useContext } from 'react'

import { Link, routes } from '@redwoodjs/router'

import CustomThemeContext from 'src/CustomThemeContext'

function CategoryListItems({ categories }) {
  const { theme } = useContext(CustomThemeContext)

  return (
    <div className="flex max-h-full flex-col">
      <div className="categories-container flex h-full flex-grow flex-col justify-between px-4 py-8">
        <div className="items-controller  max-h-full">
          <div className="main-container overflow-auto ">
            {categories.map((category, index) => (
              <div key={category.name} className="mb-2 flex flex-wrap">
                <span
                  className={`relative flex w-1/5 flex-col items-center justify-center text-3xl font-bold transition-colors duration-200 ${
                    theme === 1 ? 'text-white' : 'text-black'
                  }`}
                >
                  {index + 1}
                  <span className="mt-1 w-[25%] border-b-4 border-emerald-400"></span>
                </span>

                <div className="category-container flex w-4/5 flex-col items-center justify-center py-2">
                  <span className="flex justify-center text-left font-bold text-emerald-400">
                    {category.name}
                  </span>
                  <Link to={routes.home()}>
                    <span className="flex justify-center px-4">
                      <span
                        className={`transition-colors duration-200 hover:underline ${
                          theme === 1 ? 'text-white' : 'text-black'
                        }`}
                      >
                        {category.article.description.length > 200
                          ? category.article.description.slice(0, 200) + '...'
                          : category.article.description}
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryListItems
