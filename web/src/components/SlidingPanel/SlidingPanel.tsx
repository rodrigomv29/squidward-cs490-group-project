import React, { useState, useCallback, useEffect } from 'react'

import { useLazyQuery } from '@apollo/react-hooks'
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx'

import { Link, routes } from '@redwoodjs/router'

import { getTopTen } from 'src/utils/storage'

export const QUERY = gql`
  query FindArticlesQuery {
    articles {
      author
      title
      description
    }
  }
`

function SlidingPannel() {
  const [topTenData, setTopTenData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTopTen()
        setTopTenData(response)
      } catch (error) {
        console.log('Error fetching top 10 data:', error)
      }
    }

    fetchData()

    const interval = setInterval(() => {
      fetchData()
    }, 3600000) // 1 hour in milliseconds

    return () => {
      clearInterval(interval)
    }
  }, [])

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

  return (
    <>
      <div className="group relative m-auto h-full w-full max-w-full  px-4 py-4">
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].urlToImage})` }}
          className="h-full rounded-2xl bg-cover bg-center bg-no-repeat duration-500"
        >
          <div className="main-header absolute bottom-20 left-4 right-4 mx-4 rounded-xl bg-gray-600 bg-opacity-[0.4] px-10 py-4 text-white">
            <div className="title text-2xl font-bold">
              {slides[currentIndex].title}
            </div>
            <div className="main-description">
              {slides[currentIndex].description}
            </div>
            <div className="read-more">
              <Link
                to={routes.home()}
                className="read-more-link group relative inline-block"
              >
                Read More
                <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform bg-emerald-400 transition-transform duration-300 group-hover:scale-x-100"></span>
              </Link>
            </div>
          </div>
          <div className="absolute bottom-2 left-4 right-4 flex justify-center px-10 py-4">
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
        <div className="-tranlate-x-0 absolute left-5 top-[50%] hidden translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        {/* Right Arrow */}
        <div className="-tranlate-x-0 absolute right-5 top-[50%] hidden translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white group-hover:block">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
      </div>
    </>
  )
}

export default SlidingPannel
