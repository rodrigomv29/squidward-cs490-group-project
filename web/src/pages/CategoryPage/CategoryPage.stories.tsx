import type { ComponentMeta } from '@storybook/react'

import CategoryPage from './CategoryPage'

export const generated = () => {
  return <CategoryPage />
}

export default {
  title: 'Pages/CategoryPage',
  component: CategoryPage,
} as ComponentMeta<typeof CategoryPage>
