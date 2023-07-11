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

const GET_ARTICLE_QUERY = gql`
  query getArticlesById($id: ID!) {
    article(id: $id) {
      id
      title
      description
      sourceName
      sourceId
      author
      url
      urlToImage
      publishedAt
      content
    }
  }
`

interface Article {
  id: string
  title: string
  description: string
  sourceName: string
  sourceId: string
  author: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
  category: string
}

export function GetArticle(id) {
  const { loading, error, data } = useQuery(GET_ARTICLE_QUERY, {
    variables: { id: id },
  })

  if (!loading) {
    return data
  } else {
    return error
  }
}

export const useGetArticles = (articleIds?: number[]) => {
  const { data, loading } = useQuery(GET_CATEGORY_QUERY)

  const categoryArticlesMap: { [category: string]: Article[] } =
    !loading && data
      ? data.categories.reduce(
          (map: { [category: string]: Article[] }, category) => {
            const categoryName = category.name
            map[category.name] = category.articles.map((article) => ({
              id: article.id,
              title: article.title,
              description: article.description,
              sourceName: article.sourceName,
              sourceId: article.sourceId,
              author: article.author,
              url: article.url,
              urlToImage: article.urlToImage,
              publishedAt: article.publishedAt,
              content: article.content,
              category: categoryName,
            }))
            return map
          },
          {}
        )
      : {}

  if (articleIds && articleIds.length > 0) {
    const filteredArticles = Object.values(categoryArticlesMap)
      .flat()
      .filter((article) => articleIds.includes(parseInt(article.id)))
    return { articles: filteredArticles, loading }
  }

  return { categoryArticlesMap, loading }
}

function ArticleDistrobutor() {
  return <div></div>
}

export default ArticleDistrobutor
