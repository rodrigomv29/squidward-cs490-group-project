import type { ComponentMeta } from '@storybook/react'

import SignInPage from './SignInPage'

export const generated = () => {
  return <SignInPage />
}

export default {
  title: 'Pages/SignInPage',
  component: SignInPage,
} as ComponentMeta<typeof SignInPage>
