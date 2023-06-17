import React from 'react'

import { MetaTags } from '@redwoodjs/web'

import CategoryListItems from 'src/components/CategoryList/CategoryList'

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

  const latestNews = [
    {
      title: 'News 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image:
        'https://images.unsplash.com/photo-1624454218532-350e24b012b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    },
    {
      title: 'News 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image:
        'https://images.unsplash.com/photo-1504194104404-433180773017?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    },
    {
      title: 'News 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image:
        'https://plus.unsplash.com/premium_photo-1671830697504-4e1e21962584?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
    },
    {
      title: 'News 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image:
        'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    },
    {
      title: 'News 5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image:
        'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    },
    {
      title: 'News 6',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image:
        'https://images.unsplash.com/photo-1624454218532-350e24b012b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    },
  ]

  return (
    <>
      <MetaTags title="DefaultHome" description="DefaultHome page" />

      <div className="main-container h-screen max-h-screen w-full max-w-full">
        <div className="main-header-contianer flex h-2/3 justify-center">
          <div className="slding-pannel-containe my-10  w-2/3">
            <p className="flex justify-center px-4 text-5xl font-bold">
              TOP 10 TODAY
            </p>
            <SlidingPannel />
          </div>
          <div className="top-news-container mx-4 w-1/3  justify-center">
            <div className="Header my-6 flex w-full justify-center rounded-lg bg-emerald-400 py-4 text-3xl font-semibold uppercase">
              Top Stories
            </div>
            <div className="category-list-container flex-column flex h-full max-h-[515px] justify-center">
              <CategoryListItems categories={categories} />
            </div>
          </div>
        </div>
        <div className="latest-news-container">
          <h2 className="latest-news-heading">Latest News</h2>
          <div className="category-grid">
            {latestNews.map((newsItem, index) => (
              <div key={index} className="category-box">
                <img src={newsItem.image} alt={newsItem.title} className="category-image" />
                <p className="category-title">{newsItem.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default DefaultHomePage
