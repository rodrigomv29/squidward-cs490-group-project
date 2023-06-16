import { fetch } from '@whatwg-node/fetch'
import type { MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

// export const articles: QueryResolvers['articles'] = () => {
//   return db.article.findMany()
// }

// export const article: QueryResolvers['article'] = ({ id }) => {
//   return db.article.findUnique({
//     where: { id },
//   })
// }

export const createArticle: MutationResolvers['createArticle'] = ({
  input,
}) => {
  return db.article.create({
    data: input,
  })
}

export const updateArticle: MutationResolvers['updateArticle'] = ({
  id,
  input,
}) => {
  return db.article.update({
    data: input,
    where: { id },
  })
}

export const deleteArticle: MutationResolvers['deleteArticle'] = ({ id }) => {
  return db.article.delete({
    where: { id },
  })
}

export const getArticles = async ({ category }) => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWSAPI_KEY}`
  )
  const json = await response.json()

  return {
    category,
    author: json.articles,
    title: json.title,
    description: json.description,
    url: json.url,
    urlToImage: json.urlToImage,
    publishedAt: json.publishedAt,
    content: json.content,
  }
}
