import React from 'react'

import { Link, routes } from '@redwoodjs/router'

function Footer() {
  return (
    <footer className={`mt-10 w-full bg-gray-300 py-4`}>
      <div className={`container mx-auto text-center `}>
        <span className="text-md font-bold text-gray-600">
          &copy; {new Date().getFullYear()} Squidward News. All rights reserved.
        </span>
        <div className="mt-4 flex justify-center space-x-4">
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
