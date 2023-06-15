// import { Link, routes } from '@redwoodjs/router'
import React from 'react'

import { MetaTags } from '@redwoodjs/web'

import SlidingPannel from '../../components/SlidingPannel/SlidingPannel'

const DefaultHomePage = () => {
  return (
    <>
      <MetaTags title="DefaultHome" description="DefaultHome page" />
      <div className="main-container h-screen max-h-screen w-full max-w-full bg-red-200">
        <div className="main-header-contianer flex h-3/5 justify-center">
          <div className="slding-pannel-containe w-2/3 bg-yellow-200">
            <p className="flex justify-center px-4 text-3xl font-semibold ">
              Main news
            </p>
            <SlidingPannel />
          </div>
          <div className="top-news-container flex w-1/3 justify-center bg-purple-300">
            <div className="Header flex w-full justify-center bg-blue-300 text-3xl font-semibold">
              Top News
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DefaultHomePage
