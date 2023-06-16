import type { Prisma, Article } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ArticleCreateArgs>({
  article: {
    one: {
      data: {
        author: 'String',
        title: 'String',
        description: 'String',
        url: 'String',
        urlToImage: 'String',
        publishedAt: 'String',
        content: 'String',
      },
    },
    two: {
      data: {
        author: 'String',
        title: 'String',
        description: 'String',
        url: 'String',
        urlToImage: 'String',
        publishedAt: 'String',
        content: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Article, 'article'>
