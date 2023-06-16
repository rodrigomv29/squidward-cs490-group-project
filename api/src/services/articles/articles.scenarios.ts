import type { Prisma, Article } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ArticleCreateArgs>({
  article: {
    one: {
      data: {
        sourceId: 'String8389167',
        sourceName: 'String',
        title: 'String',
        description: 'String',
        url: 'String',
        publishedAt: '2023-06-16T22:02:41.869Z',
      },
    },
    two: {
      data: {
        sourceId: 'String7298795',
        sourceName: 'String',
        title: 'String',
        description: 'String',
        url: 'String',
        publishedAt: '2023-06-16T22:02:41.869Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Article, 'article'>
