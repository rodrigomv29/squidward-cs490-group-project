import type { ComponentMeta } from '@storybook/react'

import DefaultHomePage from './DefaultHomePage'

export const generated = () => {
  return <DefaultHomePage />
}

export default {
  title: 'Pages/DefaultHomePage',
  component: DefaultHomePage,
} as ComponentMeta<typeof DefaultHomePage>
