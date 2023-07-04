// import { Link, routes } from '@redwoodjs/router'

import React, { useEffect, useState, useContext } from 'react'

// import { Link, routes } from '@redwoodjs/router'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Box, IconButton } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

import { MetaTags } from '@redwoodjs/web'

import ArticleRefresher from 'src/components/ArticleRefresher/ArticleRefresher'
import Footer from 'src/components/Footer/Footer'
import TopNewsByCategory from 'src/components/TopNewsByCategory/TopNewsByCategory'
import CurrentPageContext from 'src/CurrentPageContext'
import CustomThemeContext from 'src/CustomThemeContext'
import { useRefreshToggle } from 'src/pages/SignedInHomePage/SignedInHomePage'
import { getArticles, getLatest, isHomePage } from 'src/utils/storage'

import ArticleGrid from '../../components/ArticleGrid/ArticleGrid'
import SlidingPanel from '../../components/SlidingPanel/SlidingPanel'

const CategoryPage = (categoryObject) => {
  const { toggleCurrentPage } = useContext(CurrentPageContext)
  toggleCurrentPage(categoryObject.category)
  isHomePage(0)
  async function fetchArticles(category) {
    try {
      const articles = await getArticles(category)
      return articles
    } catch (error) {
      console.log('Error fetching description article for categories:', error)
      throw error
    }
  }

  async function fetchLatest(category) {
    try {
      const articles = await getLatest(category)
      return articles
    } catch (error) {
      console.log('Error fetching description article for categories:', error)
      throw error
    }
  }

  const category = categoryObject.category
  localStorage.setItem('currentPage', category)

  const [articles, setArticles] = useState([])
  const [latest, setLatest] = useState([])
  const [refreshToggle, handleRefreshClick] = useRefreshToggle()

  const { theme } = useContext(CustomThemeContext)

  const handleTheme = (firstArg, secondArg) => {
    return theme === 1 ? firstArg : secondArg
  }

  // Use effect to control api fetching
  useEffect(() => {
    fetchArticles(category)
      .then((articles) => {
        setArticles(articles)
      })
      .catch((error) => {
        console.log('Error fetching descriptions:', error)
      })

    const interval = setInterval(() => {
      fetchArticles(category)
        .then((articles) => {
          setArticles(articles)
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
    fetchLatest(category)
      .then((articles) => {
        setLatest(articles)
      })
      .catch((error) => {
        console.log('Error fetching descriptions:', error)
      })

    const interval = setInterval(() => {
      fetchLatest(category)
        .then((articles) => {
          setLatest(articles)
        })
        .catch((error) => {
          console.log('Error fetching descriptions:', error)
        })
    }, 3600000) // 1 hour in milliseconds

    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])

  return (
    <>
      <MetaTags
        title={category.slice(0, 1).toUpperCase() + category.slice(1)}
        description="Category page"
      />
      <div
        className={`main-container h-screen max-h-screen w-full max-w-full transition-colors duration-300 ${handleTheme(
          'bg-gray-700',
          'bg-white'
        )}`}
      >
        <div className="main-header-contianer flex h-2/3 justify-center">
          <div className="slding-pannel-containe my-10  w-2/3">
            <p
              className={`flex justify-center px-4 text-4xl font-extrabold uppercase ${handleTheme(
                'text-white',
                'text-black'
              )}`}
            >
              top 10 today
            </p>
            <SlidingPanel />
          </div>
          <div className="top-news-container mx-4 w-1/3  justify-center">
            <div
              className={`Header my-6 flex w-full justify-center rounded-lg py-2 text-2xl font-semibold uppercase transition-colors duration-200 ${handleTheme(
                'bg-gray-900 text-white',
                'bg-emerald-400 text-black'
              )}`}
            >
              {category}
            </div>
            <div className="category-list-container max-h-1/3 flex h-[79.9%] flex-col justify-start overflow-auto">
              <TopNewsByCategory articles={articles} />
            </div>
          </div>
        </div>
        <div
          className={`main-content colors flex h-[90%] w-full pb-10 transition duration-200 ${handleTheme(
            'bg-gray-700',
            'bg-white'
          )}`}
          style={{ marginTop: '-50px' }}
        >
          <div className="latest-news-container w-[100%]">
            <div className="h-full w-full px-10">
              <div className="title-refresh-container flex justify-between">
                <h2
                  className={`flex items-center text-4xl font-bold ${handleTheme(
                    'text-emerald-400',
                    'text-black'
                  )}`}
                >
                  Latest News in&nbsp;
                  <span className="uppercase">{category.slice(0, 1)}</span>
                  {category.slice(1)}
                </h2>
                <span style={{ cursor: 'not-allowed' }}>
                  <div className="mt-8 flex items-center">
                    <span
                      className={`text-xl font-bold ${handleTheme(
                        'text-white',
                        'text-gray-500'
                      )}`}
                    >
                      Refresh Articles
                    </span>
                    {handleTheme(
                      <IconButton
                        aria-label="delete"
                        size="large"
                        sx={{
                          width: 70,
                          height: 70,
                          color: 'white',
                        }}
                        onClick={() => {
                          if (typeof handleRefreshClick === 'function') {
                            handleRefreshClick()
                          }
                        }}
                      >
                        <RefreshIcon fontSize="inherit" />
                      </IconButton>,
                      <IconButton
                        aria-label="delete"
                        size="large"
                        sx={{
                          width: 70,
                          height: 70,
                          color: 'black',
                        }}
                        onClick={() => {
                          if (typeof handleRefreshClick === 'function') {
                            handleRefreshClick()
                          }
                        }}
                      >
                        <RefreshIcon fontSize="inherit" />
                      </IconButton>
                    )}
                  </div>
                </span>
              </div>
              <div className="category-grid-container h-[90%]">
                {refreshToggle ? (
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
                ) : (
                  <ArticleGrid items={latest} itemsPerPage={6} />
                )}
              </div>
            </div>
          </div>
        </div>
        <ArticleRefresher refreshToggle={refreshToggle} />
        <Footer />
      </div>
    </>
  )
}

export default CategoryPage
