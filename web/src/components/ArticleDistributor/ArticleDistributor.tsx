import React from 'react'

import { useQuery } from '@redwoodjs/web'

export const GET_CATEGORY_QUERY = gql`
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

function ArticleDistributor() {
  const { data, loading } = useQuery(GET_CATEGORY_QUERY)

  if (!loading) {
    const categoryArticlesMap = {}

    // Initialize the category arrays
    data &&
      data.categories.forEach((category) => {
        categoryArticlesMap[category.name] = []
      })

    // Populate the category arrays with specific properties of articles
    data &&
      data.categories.forEach((category) => {
        category.articles.forEach((article) => {
          const {
            id,
            title,
            description,
            sourceName,
            author,
            url,
            urlToImage,
            publishedAt,
            conent,
          } = article
          categoryArticlesMap[category.name].push({
            id,
            title,
            description,
            sourceName,
            author,
            url,
            urlToImage,
            publishedAt,
            conent,
          })
        })
      })

    console.log('Category Articles Map:', categoryArticlesMap['general'])
  }

  return <div></div>
}

export default ArticleDistributor
