import type { Prisma, CustomList } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CustomListCreateArgs>({
  customList: {
    one: {
      data: {
        name: 'String3138286',
        articles: 7015587,
        user: {
          create: {
            email: 'String5759780',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        name: 'String9386026',
        articles: 230333,
        user: {
          create: {
            email: 'String8688941',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<CustomList, 'customList'>
