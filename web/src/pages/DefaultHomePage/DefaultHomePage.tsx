import React from 'react'

// import { Link, routes } from '@redwoodjs/router'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Box, IconButton } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

import { MetaTags } from '@redwoodjs/web'

import ArticleListDefault from 'src/components/ArticleListDefault/ArticleListDefault'
import ArticleRefresher from 'src/components/ArticleRefresher/ArticleRefresher'
import CategoryListItems from 'src/components/CategoryList/CategoryListItems'
import Footer from 'src/components/Footer/Footer'
import WeatherWidget from 'src/components/Weather/WeatherWidget'
import { isHomePage } from 'src/utils/storage'

import SlidingPanel from '../../components/SlidingPanel/SlidingPanel'
import { useRefreshToggle } from '../SignedInHomePage/SignedInHomePage'

const DefaultHomePage = () => {
  const [refreshToggle, handleRefreshClick] = useRefreshToggle()
  isHomePage(1)

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
              <CategoryListItems />
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
                      Refresh
                    </span>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      sx={{
                        width: 70,
                        height: 70,
                      }}
                      onClick={() => {
                        if (typeof handleRefreshClick === 'function') {
                          handleRefreshClick()
                        }
                      }}
                    >
                      <RefreshIcon fontSize="inherit" />
                    </IconButton>
                  </div>
                </span>
              </div>
              <div className="category-grid-container h-[90%] overflow-auto">
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
                  <ArticleListDefault />
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
        <ArticleRefresher refreshToggle={refreshToggle} />
        <Footer />
      </div>
    </>
  )
}

export default DefaultHomePage
