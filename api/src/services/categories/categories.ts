import type {
  QueryResolvers,
  MutationResolvers,
  CategoryRelationResolvers,
  Article,
} from 'types/graphql'

import { db } from 'src/lib/db'

const fetch = require('node-fetch')

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
  const { name, articles } = input

  const createdCategory = await db.category.create({
    data: {
      name: name, // Use the extracted 'name' property
      articles: {
        create: articles.map((article) => ({
          sourceId: article.source.id,
          sourceName: article.source.name,
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
  })

  return createdCategory
}

// export const getArticles = async ({ category }) => {
//   try {
//     const query = `https://newsapi.org/v2/top-headlines/`
//     const result = await fetch(query, {
//       headers: {
//         Authorization: `Bearer ${process.env.NEWSAPI_KEY}`,
//       },
//       params: {
//         country: `us`,
//         category: `${category}`,
//         apiKey: `${process.env.NEWSAPI_KEY}`,
//       },
//     })

//     const json = await result.json()
//     const articlesArr: Array<Article> = json.articles

//     const input = {
//       input: {
//         name: category,
//         articles: articlesArr,
//       },
//     }
//     const _result = createCategoryAPI(input)

//     return {
//       category,
//       articles: articlesArr,
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

export const getArticles = async ({ category }) => {
  const query = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&`
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

  return {
    category,
    articles: articlesArr,
  }
}
