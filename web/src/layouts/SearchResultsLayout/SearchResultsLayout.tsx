import React from 'react'

import { Link, routes } from '@redwoodjs/router'

import SquidwardLogo from '../../../public/squidward_logo.png'

type SearchResultLayoutProps = {
  children?: React.ReactNode
}

const SearchResultLayout = ({ children }: SearchResultLayoutProps) => {
  return (
    <>
      <header>
        <div className="main pt-2">
          <div className="flex items-center justify-between">
            <Link to={routes.home()}>
              <div className="main-logo-container flex items-center justify-center">
                <div className="main-header-text flex items-center">
                  <div className="main-logo-squidward mx-2 h-10 rounded-md bg-emerald-400 px-3 py-1.5 text-2xl font-extrabold text-white">
                    Squidward
                  </div>
                  <div className="main-logo-news text-4xl font-semibold">
                    News
                  </div>
                </div>
                <div className="squidward-logo">
                  <img
                    src={SquidwardLogo}
                    alt="Squidward Logo"
                    className="h-full w-full"
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  )
}

export default SearchResultLayout
