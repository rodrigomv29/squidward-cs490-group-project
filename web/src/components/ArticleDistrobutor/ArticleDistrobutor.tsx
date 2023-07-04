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

export const useGetArticles = () => {
  const { data, loading } = useQuery(GET_CATEGORY_QUERY)

  const categoryArticlesMap =
    !loading && data
      ? data.categories.reduce((map, category) => {
          map[category.name] = category.articles.map((article) => ({
            id: article.id,
            title: article.title,
            description: article.description,
            sourceName: article.sourceName,
            author: article.author,
            url: article.url,
            urlToImage: article.urlToImage,
            publishedAt: article.publishedAt,
            content: article.content,
          }))
          return map
        }, {})
      : {}
  return { categoryArticlesMap, loading }
}

function ArticleDistrobutor() {
  return <div></div>
}

export default ArticleDistrobutor
