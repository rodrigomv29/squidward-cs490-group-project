import React, { useState, useCallback, useEffect, useContext } from 'react'

import { Box, CircularProgress } from '@mui/material'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx'

import CustomListAdder from 'src/components/CustomListAdder/CustomListAdder'
import CurrentPageContext from 'src/CurrentPageContext'
import { sortArticlesByDate } from 'src/utils/storage'

import { useGetArticles } from '../ArticleDistrobutor/ArticleDistrobutor'

const processData = (categoryArticlesMap, currentPage) => {
  const count = 999999
  const category = currentPage === 'home' ? 'general' : currentPage
  const categoryArticles = categoryArticlesMap[category]?.map(
    (article, index) => ({
      id: index + count,
      title: article.title,
      description: article.description,
      author: article.author,
      urlToImage: article.urlToImage,
      url: article.url,
      publishedAt: article.publishedAt,
      soruceName: article?.sourceName,
      soruceId: article.soruceId,
    })
  )
  return categoryArticles
}

function SlidingPannel() {
  const { currentPage } = useContext(CurrentPageContext)
  const { categoryArticlesMap, loading } = useGetArticles()

  let categoryArticles = []

  if (!loading) {
    categoryArticles = processData(categoryArticlesMap, currentPage)
  }

  const topTenData =
    categoryArticles?.length > 0
      ? sortArticlesByDate(
          categoryArticles
            .slice(0, 50)
            .filter((article) => article.urlToImage)
            .slice(0, 10)
        )
      : []

  const slides =
    topTenData != undefined
      ? topTenData
      : [{ title: 'Something went wrong', urlToImage: '' }]

  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }, [currentIndex, slides.length])

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide()
    }, 15000) // Change the delay (in milliseconds) to your desired interval

    return () => {
      clearInterval(slideInterval)
    }
  }, [currentIndex, nextSlide])

  if (categoryArticles?.length === 0 || loading) {
    // Render loading state or placeholder
    return (
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
          <CircularProgress size={200} sx={{ color: '#34D399' }} />
        </Box>
      </div>
    )
  }

  return (
    <>
      <div className="group relative m-auto h-[100%] max-h-[90%] w-full max-w-full  px-12 py-4">
        <div
          style={{
            backgroundImage: `url(${slides[currentIndex]?.urlToImage})`,
          }}
          className="h-full rounded-2xl bg-gradient-to-t bg-cover bg-center bg-no-repeat duration-500"
        >
          <div className="main-header absolute bottom-10 left-8 right-8 mx-4 rounded-xl bg-gray-600 bg-opacity-[0.6] px-10 py-4 text-white">
            <div className="title text-xl font-bold">
              {slides[currentIndex]?.title}
            </div>
            <div className="main-description text-sm">
              {slides[currentIndex]?.description}
            </div>
            <div className="published-at-container text-white">
              Published At:&nbsp;
              {slides[currentIndex]?.publishedAt.slice(5, 7)}-
              {slides[currentIndex]?.publishedAt.slice(8, 10)}-
              {slides[currentIndex]?.publishedAt.slice(0, 4)}&nbsp;at&nbsp;
              {slides[currentIndex]?.publishedAt.slice(
                slides[currentIndex]?.publishedAt.indexOf('T') + 1,
                slides[currentIndex]?.publishedAt.length - 5
              )}
            </div>
            <div className="read-more flex flex-row">
              <a
                href={slides[currentIndex]?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="read-more-link group relative inline-block transition-opacity duration-300 hover:opacity-60"
              >
                Read More
                <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform bg-emerald-400 transition-transform duration-300 group-hover:scale-x-100"></span>
              </a>
              <div className="relative top-[-8px]">
                <CustomListAdder article={slides[currentIndex]} />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-4 right-4 flex justify-center px-10 py-4">
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                className={`cursor-pointer text-2xl ${
                  currentIndex === slideIndex
                    ? 'text-emerald-400'
                    : 'text-gray-500'
                }`}
                role="button"
                tabIndex={0}
                onClick={() => goToSlide(slideIndex)}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    goToSlide(slideIndex)
                  }
                }}
              >
                <RxDotFilled />
              </div>
            ))}
          </div>
        </div>
        {/* Left Arrow */}
        <div className="-tranlate-x-0 absolute left-12 top-[50%] hidden translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        {/* Right Arrow */}
        <div className="-tranlate-x-0 absolute right-12 top-[50%] hidden translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
      </div>
    </>
  )
}

export default SlidingPannel
