import type { UserArticle } from '@prisma/client'

import {
  userArticles,
  userArticle,
  createUserArticle,
  updateUserArticle,
  deleteUserArticle,
} from './userArticles'
import type { StandardScenario } from './userArticles.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userArticles', () => {
  scenario('returns all userArticles', async (scenario: StandardScenario) => {
    const result = await userArticles()

    expect(result.length).toEqual(Object.keys(scenario.userArticle).length)
  })

  scenario(
    'returns a single userArticle',
    async (scenario: StandardScenario) => {
      const result = await userArticle({ id: scenario.userArticle.one.id })

      expect(result).toEqual(scenario.userArticle.one)
    }
  )

  scenario('creates a userArticle', async () => {
    const result = await createUserArticle({
      input: {
        title: 'String',
        url: 'String',
        publishedAt: '2023-07-12T22:59:43.077Z',
        articleId: 1375816,
      },
    })

    expect(result.title).toEqual('String')
    expect(result.url).toEqual('String')
    expect(result.publishedAt).toEqual(new Date('2023-07-12T22:59:43.077Z'))
    expect(result.articleId).toEqual(1375816)
  })

  scenario('updates a userArticle', async (scenario: StandardScenario) => {
    const original = (await userArticle({
      id: scenario.userArticle.one.id,
    })) as UserArticle
    const result = await updateUserArticle({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a userArticle', async (scenario: StandardScenario) => {
    const original = (await deleteUserArticle({
      id: scenario.userArticle.one.id,
    })) as UserArticle
    const result = await userArticle({ id: original.id })

    expect(result).toEqual(null)
  })
})
