import React, { useEffect, useState } from 'react'

// import { Link, routes } from '@redwoodjs/router'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Box, IconButton } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

import { MetaTags } from '@redwoodjs/web'

import ArticleList from 'src/components/ArticleList/ArticleList'
import CategoryListItems from 'src/components/CategoryList/CategoryListItems'
import Footer from 'src/components/Footer/Footer'
import WeatherWidget from 'src/components/Weather/WeatherWidget'
import { getDescription } from 'src/utils/storage'

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
  const [refreshToggle, setRefreshToggle] = useState(true)

  const handleRefreshClick = () => {
    setRefreshToggle(false)
    setTimeout(() => {
      setRefreshToggle(true)
    }, 800)
  }

  const categoriesArray = [
    'General',
    'Business',
    'Entertainment',
    'Sports',
    'Health',
    'Science',
    'Technology',
  ]

  // Use effect to control api fetching
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

  return (
    <>
      <MetaTags title="Home" description="DefaultHome page" />
      <div
        className={`main-container h-screen max-h-screen w-full max-w-full transition-colors duration-300`}
      >
        <div className="main-header-contianer flex h-2/3 justify-center">
          <div className="slding-pannel-containe my-10  w-2/3">
            <p className="flex justify-center px-4 text-4xl font-extrabold ">
              TOP 10 TODAY
            </p>
            <SlidingPanel />
          </div>
          <div className="top-news-container mx-4 w-1/3  justify-center">
            <div className="Header my-6 flex w-full justify-center rounded-lg bg-emerald-400 py-2 text-2xl font-semibold uppercase">
              Top Stories
            </div>
            <div className="category-list-container max-h-1/3 flex h-[79.9%] flex-col justify-start overflow-auto">
              <CategoryListItems categories={categories} />
            </div>
          </div>
        </div>
        <div className="main-content flex h-screen w-full">
          <div className="latest-news-container w-[70%]">
            <div className="h-full w-full px-10">
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
                      onClick={handleRefreshClick}
                    >
                      <RefreshIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                </span>
              </div>
              <div className="category-grid-container h-[90%] overflow-auto">
                {refreshToggle ? (
                  <ArticleList />
                ) : (
                  <div className="h-[80%]">
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '100%',
                        alignItems: 'center',
                        color: '#34D399',
                      }}
                    >
                      <CircularProgress size={300} sx={{ color: '#34D399' }} />
                    </Box>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="right-sidebar flex w-[30%] items-center">
            <div className="weather-container text-black">
              <WeatherWidget city="Newark,NJ,USA" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default DefaultHomePage
