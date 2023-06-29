import type { Category } from '@prisma/client'
import { Article } from 'types/graphql'

import {
  categories,
  category,
  createCategory,
  updateCategory,
  deleteCategory,
  createCategoryAPI,
} from './categories'
import type { StandardScenario } from './categories.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations
jest.setTimeout(10000)

describe('categories', () => {
  scenario('returns all categories', async (scenario: StandardScenario) => {
    const result = await categories()

    expect(result.length).toEqual(Object.keys(scenario.category).length)
  })

  scenario('returns a single category', async (scenario: StandardScenario) => {
    const result = await category({ id: scenario.category.one.id })

    expect(result).toEqual(scenario.category.one)
  })

  scenario('creates a category', async () => {
    const result = await createCategory({
      input: { name: 'String6450187' },
    })

    expect(result.name).toEqual('String6450187')
  })

  scenario('updates a category', async (scenario: StandardScenario) => {
    const original = (await category({
      id: scenario.category.one.id,
    })) as Category
    const result = await updateCategory({
      id: original.id,
      input: { name: 'String17648652' },
    })

    expect(result.name).toEqual('String17648652')
  })

  scenario('deletes a category', async (scenario: StandardScenario) => {
    const original = (await deleteCategory({
      id: scenario.category.one.id,
    })) as Category
    const result = await category({ id: original.id })

    expect(result).toEqual(null)
  })

  scenario('creates a category calling the api', async () => {
    const category = 'Science'
    const fetchArticles = async () => {
      const query = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWSAPI_KEY}`
      const response = await fetch(query)
      const data = await response.json()
      return data
    }

    const articlesArr = await fetchArticles().then((data) => {
      const articles: Array<Article> = data.articles
      return articles
    })

    const input = {
      input: {
        name: category,
        articles: articlesArr,
      },
    }

    const result = await createCategoryAPI(input)
    expect(result.name).toEqual(category)
  })
})
