import type { Search } from '@prisma/client'

import {
  searches,
  search,
  createSearch,
  updateSearch,
  deleteSearch,
} from './searches'
import type { StandardScenario } from './searches.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('searches', () => {
  scenario('returns all searches', async (scenario: StandardScenario) => {
    const result = await searches()

    expect(result.length).toEqual(Object.keys(scenario.search).length)
  })

  scenario('returns a single search', async (scenario: StandardScenario) => {
    const result = await search({ id: scenario.search.one.id })

    expect(result).toEqual(scenario.search.one)
  })

  scenario('deletes a search', async (scenario: StandardScenario) => {
    const original = (await deleteSearch({
      id: scenario.search.one.id,
    })) as Search
    const result = await search({ id: original.id })

    expect(result).toEqual(null)
  })
})
