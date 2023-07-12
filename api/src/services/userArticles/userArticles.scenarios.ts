import type { Prisma, UserArticle } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserArticleCreateArgs>({
  userArticle: {
    one: {
      data: {
        title: 'String',
        url: 'String',
        publishedAt: '2023-07-12T22:59:43.241Z',
        articleId: 6790910,
      },
    },
    two: {
      data: {
        title: 'String',
        url: 'String',
        publishedAt: '2023-07-12T22:59:43.241Z',
        articleId: 4348510,
      },
    },
  },
})

export type StandardScenario = ScenarioData<UserArticle, 'userArticle'>
