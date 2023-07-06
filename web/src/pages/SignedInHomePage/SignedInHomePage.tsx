import React, { useState } from 'react'
import { useContext } from 'react'

import RefreshIcon from '@mui/icons-material/Refresh'
import { Box, IconButton } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

import { MetaTags } from '@redwoodjs/web'

import ArticleList from 'src/components/ArticleList/ArticleList'
import ArticleRefresher from 'src/components/ArticleRefresher/ArticleRefresher'
import Footer from 'src/components/Footer/Footer'
import WeatherWidget from 'src/components/Weather/WeatherWidget'
import currentPageContext from 'src/CurrentPageContext'
import CustomThemeContext from 'src/CustomThemeContext'
import { isHomePage } from 'src/utils/storage'

import SlidingPanel from '../../components/SlidingPanel/SlidingPanel'

export const useRefreshToggle = () => {
  const [refreshToggle, setRefreshToggle] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(true)
  const [dataChanged, setDataChanged] = useState(true)

  const handleRefreshClick = () => {
    if (isRefreshing) {
      setRefreshToggle(true)
      setDataChanged(false)

      setTimeout(() => {
        setRefreshToggle(false)
      }, 1000)

      setTimeout(() => {
        setDataChanged(true)
      }, 3000)

      setIsRefreshing(false)
      setDataChanged(false)

      setTimeout(() => {
        setIsRefreshing(true)
      }, 10000)
    }
  }

  return [refreshToggle, handleRefreshClick, dataChanged]
}

const SignedInHomePage = () => {
  const { theme } = useContext(CustomThemeContext)
  const [refreshToggle, handleRefreshClick, dataChanged] = useRefreshToggle()
  const { toggleCurrentPage } = useContext(currentPageContext)
  toggleCurrentPage('home')
  isHomePage(1)

  return (
    <>
      <MetaTags title="Home" description="SignedInHome page" />
      <div
        className={`main-container h-screen max-h-screen w-full max-w-full transition-colors duration-200 ${
          theme === 1 ? 'bg-gray-700' : 'bg-white'
        }`}
      >
        {!dataChanged ? (
          <div className="flex h-[100%] items-center justify-center">
            <CircularProgress size={300} sx={{ color: '#34D399' }} />
          </div>
        ) : (
          <>
            <div className="main-header-contianer flex h-[70%] justify-center ">
              <div className="slding-pannel-containe my-10  w-2/3">
                <p
                  className={`flex justify-center px-4 text-4xl font-extrabold transition-colors duration-200 ${
                    theme === 1 ? 'text-white' : ''
                  }`}
                >
                  TOP 10 TODAY
                </p>
                <SlidingPanel />
              </div>
              <div className="top-news-container mx-4 flex  h-[100%]  w-1/3 items-center justify-center">
                <div className="category-list-container max-h-1/3 flex h-[100%] items-center">
                  <WeatherWidget city="Newark,NJ,USA" />
                </div>
              </div>
            </div>
            <div
              className={`main-content my-4 flex h-screen w-full transition-colors duration-200 ${
                theme === 1 ? 'bg-gray-700' : 'bg-white'
              }`}
            >
              <div
                className={`latest-news-container h-[103%] w-[100%] transition-colors duration-200 ${
                  theme === 1 ? 'bg-gray-900' : 'bg-whtie'
                }`}
              >
                <div className="h-full w-full px-10">
                  <div className="title-refresh-container flex justify-between">
                    <h2
                      className={`heading pt-10 text-4xl font-bold transition-colors duration-200 ${
                        theme === 1 ? 'text-emerald-400' : 'text-black'
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
                            onClick={() => {
                              if (typeof handleRefreshClick === 'function') {
                                handleRefreshClick()
                              }
                            }}
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
                        <CircularProgress
                          size={300}
                          sx={{ color: '#34D399' }}
                        />
                      </Box>
                    </div>
                  ) : (
                    <ArticleList />
                  )}
                </div>
              </div>
            </div>
            <div className="footer mt-0">
              <ArticleRefresher refreshToggle={refreshToggle} />
              <Footer />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default SignedInHomePage
