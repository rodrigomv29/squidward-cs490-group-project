import React, { useContext } from 'react'

import { useQuery } from '@redwoodjs/web'

import CurrentPageContext from 'src/CurrentPageContext'

const GET_ARTICLES_BY_CATEGORY_QUERY = gql`
  query FindArticleByCategoryQuery($category: String!) {
    article: getArticlesByCategory(category: $category) {
      articles {
        id
      }
    }
  }
`

const FetchArticlesByCategory = () => {
  const { currentPage } = useContext(CurrentPageContext)
  const category = currentPage === 'home' ? 'general' : currentPage
  const { loading } = useQuery(GET_ARTICLES_BY_CATEGORY_QUERY, {
    variables: { category },
  })

  if (!loading) {
    return true
  }

  return null
}

function ArticleRefresher({ refreshToggle }) {
  return <div>{refreshToggle && <FetchArticlesByCategory />}</div>
}

export default ArticleRefresher
