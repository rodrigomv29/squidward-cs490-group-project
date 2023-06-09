import type { ComponentMeta } from '@storybook/react'

import SearchResultsPage from './SearchResultsPage'

export const generated = () => {
  return <SearchResultsPage />
}

export default {
  title: 'Pages/SearchResultsPage',
  component: SearchResultsPage,
} as ComponentMeta<typeof SearchResultsPage>
