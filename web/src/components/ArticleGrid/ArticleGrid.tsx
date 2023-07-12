import React, { useCallback, useContext, useState } from 'react'

import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx'

import CurrentPageContext from 'src/CurrentPageContext'
import CustomThemeContext from 'src/CustomThemeContext'
import { sortArticlesByDate } from 'src/utils/storage'

import { useGetArticles } from '../ArticleDistrobutor/ArticleDistrobutor'

const processData = (categoryArticlesMap, currentPage) => {
  const category = currentPage === 'home' ? 'general' : currentPage
  const categoryArticles = categoryArticlesMap[category]
    ?.slice(15)
    ?.map((article) => ({
      id: article.id,
      title: article.title,
      description: article.description,
      author: article.author,
      urlToImage: article.urlToImage,
      url: article.url,
      publishedAt: article.publishedAt,
      sourceName: article.sourceName,
      category: article.category,
      content: article.content,
    }))
  return categoryArticles
}

function ArticleGrid({ itemsPerPage }) {
  const { theme } = useContext(CustomThemeContext)
  const [currentSlidePage, setCurrentSlidePage] = useState(0)

  const { categoryArticlesMap, loading } = useGetArticles()

  const { currentPage } = useContext(CurrentPageContext)

  let categoryArticles = []

  if (!loading) {
    categoryArticles = processData(categoryArticlesMap, currentPage)
  }

  const totalPages = Math.ceil(categoryArticles.length / itemsPerPage)

  sortArticlesByDate(categoryArticles)

  const handleTheme = (firstArg, secondArg) => {
    return theme === 1 ? firstArg : secondArg
  }

  const handlePageChange = (newPage) => {
    setCurrentSlidePage(newPage)
  }

  const prevPage = () => {
    setCurrentSlidePage((prevPage) =>
      prevPage === 0 ? totalPages - 1 : prevPage - 1
    )
  }

  const nextPage = useCallback(() => {
    setCurrentSlidePage((prevPage) =>
      prevPage === totalPages - 1 ? 0 : prevPage + 1
    )
  }, [setCurrentSlidePage, totalPages])

  const renderItems = () => {
    const start = currentSlidePage * itemsPerPage
    const end = start + itemsPerPage

    return categoryArticles.slice(start, end).map((newsItem, index) => (
      <a
        href={newsItem.url}
        key={newsItem.id}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          key={index}
          className={` h-[80%] p-4 transition-colors duration-200 ${handleTheme(
            'text-white',
            'text-gray-800'
          )}`}
        >
          <div className="h-full  w-full px-12">
            <div className="category-box lg:max-w-400 max-h-300 md:max-w-300 max-h-200 sm:max-w-200 max-h-100 flex h-full flex-col items-center justify-start rounded-lg text-center">
              <div className="h-[65%] w-full">
                <img
                  src={newsItem?.urlToImage}
                  alt={newsItem?.title}
                  className="h-full w-full object-fill"
                />
              </div>
              <div
                className={`text-md h-[10rem] w-full font-semibold transition-colors duration-200 hover:underline ${handleTheme(
                  'text-white',
                  'text-black'
                )}`}
              >
                {newsItem.description
                  ? newsItem.description?.length > 100
                    ? newsItem.description?.slice(0, 100) + '...'
                    : newsItem?.description
                  : newsItem.content?.length > 100
                  ? newsItem.content.slice(0, 100) + '...'
                  : newsItem.contnt
                  ? newsItem.content
                  : 'This article does not have a description or content'}
              </div>
              <div className="flex w-full flex-row justify-between  px-12">
                <span className="flex text-sm font-bold text-gray-400">
                  {newsItem.publishedAt.slice(5, 7)}-
                  {newsItem.publishedAt.slice(8, 10)}-
                  {newsItem.publishedAt.slice(0, 4)}&nbsp;at&nbsp;
                  {newsItem.publishedAt.slice(
                    newsItem.publishedAt.indexOf('T') + 1,
                    newsItem.publishedAt.length - 5
                  )}
                </span>
                <span
                  className={` font-bold ${
                    theme === 1 ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {newsItem?.sourceName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </a>
    ))
  }

  const renderPaginationDots = () => {
    return (
      <div
        className="pagination-dots"
        style={{ position: 'relative', top: '-8px', display: 'flex' }}
      >
        {Array.from({ length: totalPages }, (_, index) => (
          <div
            key={index}
            className={`cursor-pointer text-2xl ${
              currentSlidePage === index ? 'text-emerald-400' : 'text-gray-500'
            }`}
            onClick={() => handlePageChange(index)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handlePageChange(index)
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Go to page ${index + 1}`}
          >
            <RxDotFilled size={25} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="main-container group h-full">
        <div className="main-content h-full">
          <div className="grid-container overflow-hidden px-4 py-2 sm:h-[80%] md:h-[85%] lg:h-[100%]">
            <div className="category-grid grid h-[80%] w-full max-w-full grid-cols-3">
              {renderItems().map((item, index) => (
                <div
                  key={index}
                  className="grid-items"
                  style={{
                    marginTop: '0px',
                    marginBottom: '-180px',
                    height: '90%',
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="flex w-full items-center justify-center">
              <div className="mt-8 flex w-[50%] justify-center">
                {renderPaginationDots()}
              </div>
            </div>
          </div>
        </div>
        {/* Left Arrow */}
        <div className="-tranlate-x-0 absolute left-4 top-[105%] hidden translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
          <BsChevronCompactLeft onClick={prevPage} size={30} />
        </div>
        {/* Right Arrow */}
        <div className="-tranlate-x-0 absolute right-4 top-[105%] hidden translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
          <BsChevronCompactRight onClick={nextPage} size={30} />
        </div>
      </div>
    </>
  )
}

export default ArticleGrid
