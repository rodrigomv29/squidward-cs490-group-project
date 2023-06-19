import React, { useEffect, useState } from 'react'

// import { Link, routes } from '@redwoodjs/router'
import RefreshIcon from '@mui/icons-material/Refresh'
import { IconButton } from '@mui/material'

import { MetaTags } from '@redwoodjs/web'

import CategoryListItems from 'src/components/CategoryList/CategoryListItems'
import Footer from 'src/components/Footer/Footer'
import WeatherWidget from 'src/components/Weather/WeatherWidget'
import { getDescription, getTimeSincePublication } from 'src/utils/storage'

import SlidingPanel from '../../components/SlidingPanel/SlidingPanel'

async function fetchDescriptionsForCategories(categories) {
  try {
    const descriptionArticle = {}

    for (const category of categories) {
      const categoryDescription = await getDescription(category)
      descriptionArticle[category] = categoryDescription
    }

    return descriptionArticle
  } catch (error) {
    console.log('Error fetching description article for categories:', error)
    throw error
  }
}

const DefaultHomePage = () => {
  const [descriptionData, setDescriptionData] = useState(null)

  const categoriesArray = [
    'General',
    'Business',
    'Entertainment',
    'Sports',
    'Health',
    'Science',
    'Technology',
  ]

  useEffect(() => {
    fetchDescriptionsForCategories(categoriesArray)
      .then((descriptions) => {
        const updatedDescriptions = {
          ...descriptions,
          ...descriptions,
        }
        setDescriptionData(updatedDescriptions)
      })
      .catch((error) => {
        console.log('Error fetching descriptions:', error)
      })

    const interval = setInterval(() => {
      fetchDescriptionsForCategories(categoriesArray)
        .then((descriptions) => {
          const updatedDescriptions = {
            ...descriptions,
            ...descriptions,
          }

          setDescriptionData(updatedDescriptions)
        })
        .catch((error) => {
          console.log('Error fetching descriptions:', error)
        })
    }, 3600000) // 1 hour in milliseconds

    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const categoryDescriptions = categoriesArray.map((category) => ({
    name: category,
    article:
      descriptionData && descriptionData[category]?.[0]
        ? descriptionData[category][0]
        : {
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet arcu ac dolor scelerisque tincidunt. Phasellus faucibus, dui ut sollicitudin viverra, nibh velit vulputate mauris, sed posuere tortor purus vel elit. Proin placerat, lacus non viverra auctor, risus arcu semper velit, ac sollicitudin odio mauris ac lectus. Nulla non erat ut odio feugiat blandit.',
          },
  }))

  const categories = categoryDescriptions

  const latestNews = [
    {
      title: 'News 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image:
        'https://images.unsplash.com/photo-1624454218532-350e24b012b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      sourceId: 'null',
      sourceName: 'CNN',
      publishedAt: '2023-06-17T23:54:09Z',
    },
    {
      title: 'News 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image:
        'https://images.unsplash.com/photo-1504194104404-433180773017?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      sourceId: 'CNN',
      sourceName: 'BBC News',
      publishedAt: '2023-06-17T14:35:09Z',
    },
    {
      title: 'News 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image:
        'https://plus.unsplash.com/premium_photo-1671830697504-4e1e21962584?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
      sourceId: 'null',
      sourceName: 'CNN',
      publishedAt: '2023-06-17T20:45:09Z',
    },
    {
      title: 'News 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image:
        'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      sourceId: 'CNN',
      sourceName: 'CNN',
      publishedAt: '2023-06-17T08:54:09Z',
    },
    {
      title: 'News 5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image:
        'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      sourceId: 'CNN',
      sourceName: 'CNN',
      publishedAt: '2023-06-17T18:65:09Z',
    },
    {
      title: 'News 6',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image:
        'https://images.unsplash.com/photo-1624454218532-350e24b012b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      sourceId: 'CNN',
      sourceName: 'Articles for us',
      publishedAt: '2023-06-17T22:54:09Z',
    },
  ]

  return (
    <>
      <MetaTags title="Home" description="DefaultHome page" />
      <div
        className={`main-container h-screen max-h-screen w-full max-w-full transition-colors duration-300 `}
      >
        <div className="main-header-contianer flex h-2/3 justify-center">
          <div className="slding-pannel-containe my-10  w-2/3">
            <p className="flex justify-center px-4 text-5xl font-extrabold">
              TOP 10 TODAY
            </p>
            <SlidingPanel />
          </div>
          <div className="top-news-container mx-4 w-1/3  justify-center">
            <div className="Header my-6 flex w-full justify-center rounded-lg bg-emerald-400 py-4 text-3xl font-semibold uppercase">
              Top Stories
            </div>
            <div className="category-list-container max-h-1/3 flex h-[79.9%] flex-col justify-start overflow-auto">
              <CategoryListItems categories={categories} />
            </div>
          </div>
        </div>
        <div className="main-content flex h-screen w-full">
          <div className="latest-news-container w-[70%]">
            <div className="h-full w-full px-10 ">
              <div className="title-refresh-container flex justify-between">
                <h2 className="latest-news-heading">Latest News</h2>
                <span style={{ cursor: 'not-allowed' }}>
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-gray-500">
                      Refresh Articles
                    </span>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      sx={{
                        width: 70,
                        height: 70,
                      }}
                    >
                      <RefreshIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                </span>
              </div>
              <div className="category-grid grid w-full max-w-full grid-cols-3 gap-4">
                {latestNews.map((newsItem, index) => (
                  <div
                    key={index}
                    className="category-box max-w-400 max-h-600 flex flex-col items-center justify-start rounded-lg text-center"
                  >
                    <img
                      src={newsItem.image}
                      alt={newsItem.title}
                      className="category-image h-56 w-full"
                    />
                    <p className="category-description text-lg font-semibold text-gray-800 ">
                      {newsItem.description}
                    </p>
                    <div className="category-source-info justify-space flex w-full max-w-full">
                      <div className="content-container flex w-full max-w-sm justify-center space-x-6 py-2">
                        <span className="flex text-sm font-bold text-gray-400">
                          {getTimeSincePublication(newsItem.publishedAt).hours >
                          0
                            ? getTimeSincePublication(newsItem.publishedAt)
                                .hours > 1
                              ? `${
                                  getTimeSincePublication(newsItem.publishedAt)
                                    .hours
                                } hours`
                              : `${
                                  getTimeSincePublication(newsItem.publishedAt)
                                    .hours
                                } hour`
                            : `${
                                getTimeSincePublication(newsItem.publishedAt)
                                  .minutes
                              } mins ago`}
                        </span>
                        <span className=" font-bold text-gray-600">
                          {newsItem.sourceName}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="right-sidebar w-[30%]">
            <div className="weather-container  mx-10 my-4 mt-8 h-2/5 text-center text-2xl font-bold text-black">
              <WeatherWidget city="Newark,NJ,USA" />
            </div>
            <div className="feat-article mt-0 flex h-3/5 flex-col justify-center">
              <span className="py-2 text-center text-3xl font-bold">
                Featured Article
              </span>
              <div className="category-box max-w-400 max-h-600 mx-8 flex flex-col items-center justify-start bg-gradient-to-br from-emerald-400 to-white text-center">
                <img
                  src={latestNews[3].image}
                  alt={latestNews[0].title}
                  className="category-image h-56 w-full rounded-es-full"
                />
                <p className="category-description text-xl font-bold text-gray-800">
                  {latestNews[0].description}
                </p>
                <div className="category-source-info justify-space flex w-full max-w-full">
                  <div className="content-container flex w-full justify-center space-x-6 py-2">
                    <span className="flex text-sm font-bold text-gray-400">
                      {getTimeSincePublication(latestNews[0].publishedAt)
                        .hours > 0
                        ? getTimeSincePublication(latestNews[0].publishedAt)
                            .hours > 1
                          ? `${
                              getTimeSincePublication(latestNews[0].publishedAt)
                                .hours
                            } hours`
                          : `${
                              getTimeSincePublication(latestNews[0].publishedAt)
                                .hours
                            } hour`
                        : `${
                            getTimeSincePublication(latestNews[0].publishedAt)
                              .minutes
                          } mins ago`}
                    </span>
                    <span className=" font-bold text-gray-600">
                      {latestNews[0].sourceName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default DefaultHomePage
