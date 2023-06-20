import fetch from 'node-fetch'
import type {
  QueryResolvers,
  MutationResolvers,
  CategoryRelationResolvers,
  Article,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const categories: QueryResolvers['categories'] = () => {
  return db.category.findMany()
}

export const category: QueryResolvers['category'] = ({ id }) => {
  return db.category.findUnique({
    where: { id },
  })
}

export const createCategory: MutationResolvers['createCategory'] = ({
  input,
}) => {
  return db.category.create({
    data: input,
  })
}

export const updateCategory: MutationResolvers['updateCategory'] = ({
  id,
  input,
}) => {
  return db.category.update({
    data: input,
    where: { id },
  })
}

export const deleteCategory: MutationResolvers['deleteCategory'] = ({ id }) => {
  return db.category.delete({
    where: { id },
  })
}

export const Category: CategoryRelationResolvers = {
  articles: (_obj, { root }) => {
    return db.category.findUnique({ where: { id: root?.id } }).articles()
  },
}

export const createCategoryAPI: MutationResolvers['createCategory'] = async ({
  input,
}) => {
  const { name } = input

  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${name.toLowerCase()}&apiKey=${
      process.env.NEWSAPI_KEY
    }`
  )

  const json = await response.json()
  const articlesArr: Array<Article> = json.articles

  const createdCategory = await db.category.create({
    data: {
      name,
      articles: {
        create: articlesArr.map((article) => ({
          sourceId: article.sourceId,
          sourceName: article.sourceName,
          author: article.author,
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.urlToImage,
          publishedAt: new Date(article.publishedAt),
          content: article.content,
        })),
      },
    },
    include: {
      articles: true, // Include the associated articles in the response
    },
  })

  return createdCategory
}

export const getArticles = async ({ category }) => {
  const query = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWSAPI_KEY}`
  const response = await fetch(query)

  const json = await response.json()

  const articlesArr: Array<Article> = json.articles
  const input = {
    input: {
      name: category,
      articles: articlesArr,
    },
  }
  const _result = createCategoryAPI(input)

  console.log(JSON.stringify(json))
  return json
}
