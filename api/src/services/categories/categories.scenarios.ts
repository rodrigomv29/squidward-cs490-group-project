import type { Prisma, Category } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CategoryCreateArgs>({
  category: {
    one: { data: { name: 'String5139274' } },
    two: { data: { name: 'String100868' } },
  },
})

export type StandardScenario = ScenarioData<Category, 'category'>
