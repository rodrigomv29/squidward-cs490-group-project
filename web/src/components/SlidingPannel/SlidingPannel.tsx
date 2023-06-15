import React, { useState } from 'react'

import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'
import { RxDotFilled } from 'react-icons/rx'

import { Link, routes } from '@redwoodjs/router'

function SlidingPannel() {
  const slides = [
    {
      url: 'https://images.unsplash.com/photo-1533228876829-65c94e7b5025?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1504194104404-433180773017?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1624454218532-350e24b012b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    },
    {
      url: 'https://plus.unsplash.com/premium_photo-1671830697504-4e1e21962584?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1626626925024-aaf056134c20?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80',
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }

  return (
    <>
      <div className="group relative m-auto h-[780px] w-full max-w-[1400px] px-4 py-16">
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className="h-full w-full rounded-2xl bg-cover bg-center duration-500"
        >
          <div className="main-header absolute bottom-20 left-4 right-4 text-white px-10">
            <div className="title text-2xl font-bold">
              The Main title for the Article
            </div>
            <div className="main-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              faucibus justo ut risus consectetur, eu posuere elit dignissim.
              Nulla facilisi. Donec in dapibus odio. Aliquam eu ligula eleifend,
              rhoncus felis at, ultricies dui.
            </div>
            <div className="read-more">
              <Link to={routes.home()}>Read More</Link>
            </div>
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
        <div className="top-4 flex justify-center py-2">
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              className="cursor-pointer text-2xl"
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
    </>
  )
}

export default SlidingPannel
