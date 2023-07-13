import type { Prisma, UserArticle } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserArticleCreateArgs>({
  userArticle: {
    one: {
      data: {
        title: 'String',
        url: 'String',
        publishedAt: '2023-07-13T07:20:22.467Z',
        articleId: 7884495,
        user: {
          create: {
            email: 'String9631025',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        title: 'String',
        url: 'String',
        publishedAt: '2023-07-13T07:20:22.467Z',
        articleId: 4944148,
        user: {
          create: {
            email: 'String6452125',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<UserArticle, 'userArticle'>
