import type { Prisma, CustomList } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CustomListCreateArgs>({
  customList: {
    one: {
      data: {
        name: 'String6401978',
        user: {
          create: {
            email: 'String9262107',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        name: 'String5146504',
        user: {
          create: {
            email: 'String6228005',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<CustomList, 'customList'>
