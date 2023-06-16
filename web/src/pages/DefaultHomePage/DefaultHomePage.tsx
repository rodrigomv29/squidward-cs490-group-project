// import { Link, routes } from '@redwoodjs/router'
import React from 'react'

import { MetaTags } from '@redwoodjs/web'

import CategoryListItems from 'src/components/CategoryList/CategoryListItems'

import SlidingPannel from '../../components/SlidingPannel/SlidingPannel'

const DefaultHomePage = () => {
  const categories = [
    {
      title: 'Business',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
        Sed diam nonummy nibh euismod hetrt dolor sit amet, conse`,
    },
    {
      title: 'Entertainment',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
        Sed diam nonummy nibh euismod hetrt dolor sit amet, consectetur adipiscing elit.`,
    },
    {
      title: 'Sports',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
        Sed diam nonummy nibh euismod hetrt dolor sit amet, consectetur adipiscing elit.`,
    },
    {
      title: 'World',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
        Sed diam nonummy nibh euismod hetrt dolor sit amet, consectetur adipiscing elit.`,
    },
    {
      title: 'Politics',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
        Sed `,
    },
  ]

  return (
    <>
      <MetaTags title="DefaultHome" description="DefaultHome page" />
      <div className="main-container h-screen max-h-screen w-full max-w-full ">
        <div className="main-header-contianer flex h-2/3 justify-center ">
          <div className="slding-pannel-containe my-10  w-2/3">
            <p className="flex justify-center px-4 text-5xl font-extrabold">
              TOP 10 TODAY
            </p>
            <SlidingPannel />
          </div>
          <div className="top-news-container mx-4 w-1/3  justify-center">
            <div className="Header my-6 flex w-full justify-center rounded-lg bg-emerald-400 py-4 text-3xl font-semibold uppercase">
              Top Stories
            </div>
            <div
              className={`category-list-container flex-column flex h-full max-h-[515px] justify-center`}
            >
              <CategoryListItems categories={categories} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DefaultHomePage
