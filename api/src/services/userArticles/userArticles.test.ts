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

  scenario('creates a userArticle', async (scenario: StandardScenario) => {
    const result = await createUserArticle({
      input: {
        title: 'String',
        url: 'String',
        publishedAt: '2023-07-13T07:20:22.354Z',
        articleId: 2747491,
        userId: scenario.userArticle.two.userId,
      },
    })

    expect(result.title).toEqual('String')
    expect(result.url).toEqual('String')
    expect(result.publishedAt).toEqual(new Date('2023-07-13T07:20:22.354Z'))
    expect(result.articleId).toEqual(2747491)
    expect(result.userId).toEqual(scenario.userArticle.two.userId)
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
