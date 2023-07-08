import type { Prisma, CustomList } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CustomListCreateArgs>({
  customList: {
    one: {
      data: {
        name: 'String',
        user: {
          create: {
            email: 'String2186343',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        name: 'String',
        user: {
          create: {
            email: 'String1987644',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<CustomList, 'customList'>
