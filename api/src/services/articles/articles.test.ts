import type { Article } from '@prisma/client'

import {
  articles,
  article,
  createArticle,
  updateArticle,
  deleteArticle,
} from './articles'
import type { StandardScenario } from './articles.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('articles', () => {
  scenario('returns all articles', async (scenario: StandardScenario) => {
    const result = await articles()

    expect(result.length).toEqual(Object.keys(scenario.article).length)
  })

  scenario('returns a single article', async (scenario: StandardScenario) => {
    const result = await article({ id: scenario.article.one.id })

    expect(result).toEqual(scenario.article.one)
  })

  scenario('creates a article', async () => {
    const result = await createArticle({
      input: {
        sourceId: 'String1376965',
        sourceName: 'String',
        title: 'String',
        description: 'String',
        url: 'String',
        publishedAt: '2023-06-16T22:02:41.813Z',
      },
    })

    expect(result.sourceId).toEqual('String1376965')
    expect(result.sourceName).toEqual('String')
    expect(result.title).toEqual('String')
    expect(result.description).toEqual('String')
    expect(result.url).toEqual('String')
    expect(result.publishedAt).toEqual(new Date('2023-06-16T22:02:41.813Z'))
  })

  scenario('updates a article', async (scenario: StandardScenario) => {
    const original = (await article({ id: scenario.article.one.id })) as Article
    const result = await updateArticle({
      id: original.id,
      input: { sourceId: 'String96575492' },
    })

    expect(result.sourceId).toEqual('String96575492')
  })

  scenario('deletes a article', async (scenario: StandardScenario) => {
    const original = (await deleteArticle({
      id: scenario.article.one.id,
    })) as Article
    const result = await article({ id: original.id })

    expect(result).toEqual(null)
  })

  scenario('creates a article calling the api', async () => {
    const fetchArticles = async () => {
      const category = 'Sports'
      const query = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWSAPI_KEY}`
      const response = await fetch(query)
      const data = await response.json()
      return data
    }

    let fetchedData

    await fetchArticles().then((data) => {
      fetchedData = data
      console.log(data.articles[0])
    })

    const firstArticle = fetchedData.articles[0]

    const input = {
      sourceId: firstArticle.source.id,
      sourceName: firstArticle.source.name,
      title: firstArticle.title,
      description: firstArticle.description,
      url: firstArticle.url,
      publishedAt: new Date(firstArticle.publishedAt),
    }

    const result = await createArticle({ input })

    expect(result.sourceId).toEqual(input.sourceId)
    expect(result.sourceName).toEqual(input.sourceName)
    expect(result.title).toEqual(input.title)
    expect(result.description).toEqual(input.description)
    expect(result.url).toEqual(input.url)
    expect(result.publishedAt).toEqual(input.publishedAt)
  })
})
