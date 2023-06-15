// import { Link, routes } from '@redwoodjs/router'
import React from 'react'

import { MetaTags } from '@redwoodjs/web'

import SlidingPannel from '../../components/SlidingPannel/SlidingPannel'

const DefaultHomePage = () => {
  return (
    <>
      <MetaTags title="DefaultHome" description="DefaultHome page" />
      <SlidingPannel />
    </>
  )
}

export default DefaultHomePage
