import React from 'react'

import { MetaTags, useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
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

const HomePage = () => {
  const status = getStatus()
  const { isAuthenticated } = useAuth()
  const { data, loading } = useQuery(GET_CATEGORY_QUERY)

  if (!loading) {
    if (data?.categories.some((category) => category.articles.length <= 20)) {
      return <div>Loading...</div>
    } else {
      return (
        <>
          {status === 1 && isAuthenticated ? (
            <SignedInHomePage />
          ) : (
            <DefaultHomePage />
          )}
        </>
      )
    }
  }

  return (
    <>
      <MetaTags title="Home" description="Home page" />
    </>
  )
}

export default HomePage
