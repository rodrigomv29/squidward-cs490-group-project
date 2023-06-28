import React, { useState } from 'react'
import { useEffect, useContext } from 'react'

import CustomThemeContext from 'src/CustomThemeContext'
import { getLatest, getTimeSincePublication } from 'src/utils/storage'

async function fetchLatest() {
  try {
    const latestData = await getLatest()
    return latestData
  } catch (error) {
    console.log('Error fetching description article for categories:', error)
    throw error
  }
}

function ArticleList() {
  const [latestData, setLatestData] = useState(null)
  const { theme } = useContext(CustomThemeContext)

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

  return (
    <>
      <div className="grid-container overflow-auto px-4 py-8 sm:h-[60%] md:h-[65%] lg:h-[85%]">
        <div className="category-grid grid w-full max-w-full grid-cols-3 gap-4 ">
          {latestData != null
            ? latestData.map((newsItem, index) => (
                <div
                  key={index}
                  className="category-box lg:max-w-400 max-h-400 md:max-w-300 max-h-300 sm:max-w-200 max-h-200 flex flex-col items-center justify-start rounded-lg text-center"
                >
                  <div className="w-full">
                    <div className="container sm:h-[8rem] md:h-[10rem] lg:h-[12rem]">
                      <div className="image-container h-full w-full">
                        <img
                          src={newsItem.image}
                          alt={newsItem.title}
                          className="category-image h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="description-container my-2 h-[50%] max-w-full overflow-hidden px-2">
                    <p
                      className={`category-description text-md font-semibold transition-colors duration-200  ${
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
                    <div className="content-container flex w-full max-w-sm flex-col items-center justify-center space-x-6 py-2 sm:flex">
                      <span className="flex text-sm font-bold text-gray-400">
                        {getTimeSincePublication(newsItem.publishedAt).hours > 0
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
    </>
  )
}

export default ArticleList
