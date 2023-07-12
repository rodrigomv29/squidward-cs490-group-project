import type { CustomList } from '@prisma/client'

import {
  customLists,
  customList,
  createCustomList,
  updateCustomList,
  deleteCustomList,
} from './customLists'
import type { StandardScenario } from './customLists.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('customLists', () => {
  scenario('returns all customLists', async (scenario: StandardScenario) => {
    const result = await customLists()

    expect(result.length).toEqual(Object.keys(scenario.customList).length)
  })

  scenario(
    'returns a single customList',
    async (scenario: StandardScenario) => {
      const result = await customList({ id: scenario.customList.one.id })

      expect(result).toEqual(scenario.customList.one)
    }
  )

  scenario('creates a customList', async (scenario: StandardScenario) => {
    const result = await createCustomList({
      input: {
        name: 'String7446906',
        userId: scenario.customList.two.userId,
        articles: 7012961,
      },
    })

    expect(result.name).toEqual('String7446906')
    expect(result.userId).toEqual(scenario.customList.two.userId)
    expect(result.articles).toEqual(7012961)
  })

  scenario('updates a customList', async (scenario: StandardScenario) => {
    const original = (await customList({
      id: scenario.customList.one.id,
    })) as CustomList
    const result = await updateCustomList({
      id: original.id,
      input: { name: 'String52085202' },
    })

    expect(result.name).toEqual('String52085202')
  })

  scenario('deletes a customList', async (scenario: StandardScenario) => {
    const original = (await deleteCustomList({
      id: scenario.customList.one.id,
    })) as CustomList
    const result = await customList({ id: original.id })

    expect(result).toEqual(null)
  })
})
