import React, { useEffect, useState } from 'react'
import { useContext } from 'react'

// import { Link, routes } from '@redwoodjs/router'
import RefreshIcon from '@mui/icons-material/Refresh'
import { IconButton } from '@mui/material'

import { MetaTags } from '@redwoodjs/web'

import CategoryListItems from 'src/components/CategoryList/CategoryListItems'
import Footer from 'src/components/Footer/Footer'
import WeatherWidget from 'src/components/Weather/WeatherWidget'
import CustomThemeContext from 'src/CustomThemeContext'
import {
  getTimeSincePublication,
  getDescription,
  getLatest,
} from 'src/utils/storage'

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

async function fetchLatest() {
  try {
    const latestData = await getLatest()
    return latestData
  } catch (error) {
    console.log('Error fetching description article for categories:', error)
    throw error
  }
}

const SignedInHomePage = () => {
  const [descriptionData, setDescriptionData] = useState(null)
  const [latestData, setLatestData] = useState(null)
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

  useEffect(() => {
    fetchLatest()
      .then((data) => {
        setLatestData(data)
      })
      .catch((error) => {
        console.log('Error fetching descriptions:', error)
      })

    const interval = setInterval(() => {
      fetchLatest()
        .then((data) => {
          setLatestData(data)
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

  const { theme } = useContext(CustomThemeContext)

  return (
    <>
      <MetaTags title="Home" description="SignedInHome page" />
      <div
        className={`main-container h-screen max-h-screen w-full max-w-full transition-colors duration-200 ${
          theme === 1 ? 'bg-gray-700' : 'bg-white'
        }`}
      >
        <div className="main-header-contianer flex h-2/3 justify-center">
          <div className="slding-pannel-containe my-10  w-2/3">
            <p
              className={`flex justify-center px-4 text-5xl font-extrabold transition-colors duration-200 ${
                theme === 1 ? 'text-white' : ''
              }`}
            >
              TOP 10 TODAY
            </p>
            <SlidingPanel />
          </div>
          <div className="top-news-container mx-4 w-1/3  justify-center">
            <div
              className={`Header my-6 flex w-full justify-center rounded-lg py-4 text-3xl font-semibold uppercase transition-colors duration-200 ${
                theme === 1
                  ? 'bg-gray-800 text-white'
                  : 'bg-emerald-400 text-black'
              }`}
            >
              Your Top Stories
            </div>
            <div className="category-list-container max-h-1/3 flex h-[79.9%] flex-col justify-start overflow-auto">
              <CategoryListItems categories={categories} />
            </div>
          </div>
        </div>
        <div
          className={`main-content flex h-screen w-full transition-colors duration-200 ${
            theme === 1 ? 'bg-gray-700' : 'bg-white'
          }`}
        >
          <div
            className={`latest-news-container w-[70%] transition-colors duration-200 ${
              theme === 1 ? 'bg-gray-700' : 'bg-whtie'
            }`}
          >
            <div className="h-full w-full px-10 ">
              <div className="title-refresh-container flex justify-between">
                <h2
                  className={`latest-news-heading transition-colors duration-200 ${
                    theme === 1 ? 'text-white' : 'text-black'
                  }`}
                >
                  Personal News Feed
                </h2>
                <span style={{ cursor: 'not-allowed' }}>
                  <div className="flex items-center">
                    <span
                      className={`text-xl font-bold ${
                        theme === 1 ? 'text-gray-300' : 'text-gray-500'
                      }`}
                    >
                      Refresh Articles
                    </span>
                    {theme === 1 ? (
                      <IconButton
                        aria-label="delete"
                        size="large"
                        sx={{
                          width: 70,
                          height: 70,
                          color: 'white',
                        }}
                        onClick={fetchLatest}
                      >
                        <RefreshIcon fontSize="inherit" />
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label="delete"
                        size="large"
                        sx={{
                          width: 70,
                          height: 70,
                          color: 'black',
                        }}
                      >
                        <RefreshIcon fontSize="inherit" />
                      </IconButton>
                    )}
                  </div>
                </span>
              </div>
              <div className="grid-container h-[90%] overflow-auto">
                <div className="category-grid grid w-full max-w-full grid-cols-3 gap-4 ">
                  {latestData != null
                    ? latestData.map((newsItem, index) => (
                        <div
                          key={index}
                          className="category-box max-w-400 max-h-600 flex flex-col items-center justify-start rounded-lg text-center"
                        >
                          <img
                            src={newsItem.image}
                            alt={newsItem.title}
                            className="category-image h-56 w-full"
                          />
                          <div className="description-container h-[50%] max-w-full">
                            <p
                              className={`category-description text-lg font-semibold transition-colors duration-200 ${
                                theme === 1 ? 'text-white' : 'text-gray-800'
                              }  `}
                            >
                              {newsItem.description != ''
                                ? newsItem.description.length > 110
                                  ? newsItem.description.slice(0, 110) + '...'
                                  : newsItem.description
                                : 'This article does not have a decription'}
                            </p>
                          </div>
                          <div className="category-source-info justify-space flex w-full max-w-full">
                            <div className="content-container flex w-full max-w-sm justify-center space-x-6 py-2">
                              <span className="flex text-sm font-bold text-gray-400">
                                {getTimeSincePublication(newsItem.publishedAt)
                                  .hours > 0
                                  ? getTimeSincePublication(
                                      newsItem.publishedAt
                                    ).hours > 1
                                    ? `${
                                        getTimeSincePublication(
                                          newsItem.publishedAt
                                        ).hours
                                      } hours`
                                    : `${
                                        getTimeSincePublication(
                                          newsItem.publishedAt
                                        ).hours
                                      } hour`
                                  : `${
                                      getTimeSincePublication(
                                        newsItem.publishedAt
                                      ).minutes
                                    } mins ago`}
                              </span>
                              <span
                                className={` font-bold ${
                                  theme === 1 ? 'text-white' : 'text-gray-600'
                                }`}
                              >
                                {newsItem.sourceName}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    : ''}
                </div>
              </div>
            </div>
          </div>
          {/* Right Side Bar */}
          <div className="right-sidebar w-[30%]">
            {/* Weather Widject Container */}
            <div>
              <WeatherWidget city="Newark,NJ,USA" />
            </div>
            {/* Feat Article Container */}
            <div className="feat-article mt-0 flex h-[45%] flex-col justify-center">
              <span className="py-4 text-center text-3xl font-bold">
                Featured Article
              </span>
              {latestData != null && latestData ? (
                <div className="category-box max-w-400 max-h-600 mx-8 flex flex-col items-center justify-start bg-gradient-to-br from-emerald-400 to-white text-center">
                  <img
                    src={latestData[8].image}
                    alt={latestData[8].image}
                    className="category-image h-56 w-full rounded-es-full"
                  />
                  <p className="category-description text-xl font-bold text-gray-800">
                    {latestData[8].description}
                  </p>
                  <div className="category-source-info justify-space flex w-full max-w-full">
                    <div className="content-container flex w-full justify-center space-x-6 py-2">
                      <span className="flex text-sm font-bold text-gray-400">
                        {getTimeSincePublication(latestData[8].publishedAt)
                          .hours > 0
                          ? getTimeSincePublication(latestData[8].publishedAt)
                              .hours > 1
                            ? `${
                                getTimeSincePublication(
                                  latestData[8].publishedAt
                                ).hours
                              } hours`
                            : `${
                                getTimeSincePublication(
                                  latestData[8].publishedAt
                                ).hours
                              } hour`
                          : `${
                              getTimeSincePublication(latestData[9].publishedAt)
                                .minutes
                            } mins ago`}
                      </span>
                      <span className=" font-bold text-gray-600">
                        {latestData[8].sourceName}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default SignedInHomePage
