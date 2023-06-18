import React, { useState, useEffect, useCallback } from 'react'

import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx'

import { Link, routes } from '@redwoodjs/router'

function SlidingPannel() {
  const slides = [
    {
      image_url:
        'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      title: 'The Main title for the Article 1',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus justo ut risus consectetur, eu posuere elit dignissim.
                    Nulla facilisi. Donec in dapibus odio. Aliquam eu ligula eleifend,
                    rhoncus felis at, ultricies dui.`,
    },
    {
      image_url:
        'https://images.unsplash.com/photo-1504194104404-433180773017?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      title: 'Still the main title of the article',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus justo ut risus consectetur, eu posuere elit dignissim.
                    Nulla facilisi. Donec in dapibus odio. Aliquam eu ligula eleifend,
                    rhoncus felis at, ultricies dui.`,
    },
    {
      image_url:
        'https://images.unsplash.com/photo-1624454218532-350e24b012b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      title: 'Yet another sample article title',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus justo ut risus consectetur, eu posuere elit dignissim.
                    Nulla facilisi. Donec in dapibus odio. Aliquam eu ligula eleifend,
                    rhoncus felis at, ultricies dui.`,
    },
    {
      image_url:
        'https://plus.unsplash.com/premium_photo-1671830697504-4e1e21962584?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
      title: 'The Main title for the Article 5',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus justo ut risus consectetur, eu posuere elit dignissim.
                    Nulla facilisi. Donec in dapibus odio. Aliquam eu ligula eleifend,
                    rhoncus felis at, ultricies dui.`,
    },
    {
      image_url:
        'https://images.unsplash.com/photo-1626626925024-aaf056134c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80',
      title: 'This is a sample title that needs to be replaced',
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus justo ut risus consectetur, eu posuere elit dignissim.
                    Nulla facilisi. Donec in dapibus odio. Aliquam eu ligula eleifend,
                    rhoncus felis at, ultricies dui.`,
    },
  ]

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
    }, 10000) // Change the delay (in milliseconds) to your desired interval

    return () => {
      clearInterval(slideInterval)
    }
  }, [currentIndex, nextSlide]) // Trigger the effect whenever currentIndex changes

  return (
    <>
      <div className="group relative m-auto h-full w-full max-w-full  px-4 py-4">
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].image_url})` }}
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
