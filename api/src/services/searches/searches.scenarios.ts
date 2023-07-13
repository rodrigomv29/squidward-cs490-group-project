import type { Prisma, Search } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.SearchCreateArgs>({
  search: { one: { data: {} }, two: { data: {} } },
})

export type StandardScenario = ScenarioData<Search, 'search'>
