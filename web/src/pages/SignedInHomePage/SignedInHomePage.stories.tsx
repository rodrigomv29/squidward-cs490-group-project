import type { ComponentMeta } from '@storybook/react'

import SignedInHomePage from './SignedInHomePage'

export const generated = () => {
  return <SignedInHomePage />
}

export default {
  title: 'Pages/SignedInHomePage',
  component: SignedInHomePage,
} as ComponentMeta<typeof SignedInHomePage>
