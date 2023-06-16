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
        author: 'String',
        title: 'String',
        description: 'String',
        url: 'String',
        urlToImage: 'String',
        publishedAt: 'String',
        content: 'String',
      },
    })

    expect(result.author).toEqual('String')
    expect(result.title).toEqual('String')
    expect(result.description).toEqual('String')
    expect(result.url).toEqual('String')
    expect(result.urlToImage).toEqual('String')
    expect(result.publishedAt).toEqual('String')
    expect(result.content).toEqual('String')
  })

  scenario('updates a article', async (scenario: StandardScenario) => {
    const original = (await article({ id: scenario.article.one.id })) as Article
    const result = await updateArticle({
      id: original.id,
      input: { author: 'String2' },
    })

    expect(result.author).toEqual('String2')
  })

  scenario('deletes a article', async (scenario: StandardScenario) => {
    const original = (await deleteArticle({
      id: scenario.article.one.id,
    })) as Article
    const result = await article({ id: original.id })

    expect(result).toEqual(null)
  })
})
