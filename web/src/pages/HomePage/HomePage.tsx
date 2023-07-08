import React, { useEffect, useState } from 'react'

import { MetaTags, useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import CustomListHandler from 'src/components/CustomListHandler/CustomListHandler'
import { getStatus } from 'src/utils/storage'

import DefaultHomePage from '../DefaultHomePage/DefaultHomePage'
import SignedInHomePage from '../SignedInHomePage/SignedInHomePage'

const GET_CATEGORY_QUERY = gql`
  query CategoriesQuery {
    categories {
      id
      name
      articles {
        id
        sourceName
        author
        title
        description
        url
        urlToImage
        publishedAt
        content
      }
    }
  }
`
const firstLoad = sessionStorage.getItem('firstLoad')

const HomePage = () => {
  const status = getStatus()
  const { isAuthenticated } = useAuth()
  const { data, loading } = useQuery(GET_CATEGORY_QUERY)
  const [isDataLoaded, setIsDataLoaded] = useState(false)

  useEffect(() => {
    if (firstLoad === null) {
      const delay = 3000 // 3 seconds

      const timer = setTimeout(() => {
        if (!loading && data) {
          setIsDataLoaded(true)
        }
      }, delay)

      sessionStorage.setItem('firstLoad', 'false')

      return () => clearTimeout(timer)
    } else {
      setIsDataLoaded(true)
    }
  }, [loading, data])

  if (firstLoad === null && !isDataLoaded) {
    return <div>Loading...</div>
  }

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <CustomListHandler />
      {status === 1 && isAuthenticated ? (
        <SignedInHomePage />
      ) : (
        <DefaultHomePage />
      )}
    </>
  )
}

export default HomePage
