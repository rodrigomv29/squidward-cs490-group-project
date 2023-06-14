import type { ComponentMeta, ComponentStory } from '@storybook/react'

import SignInSignUpLayout from './SignInSignUpLayout'

export const generated: ComponentStory<typeof SignInSignUpLayout> = (args) => {
  return <SignInSignUpLayout {...args} />
}

export default {
  title: 'Layouts/SignInSignUpLayout',
  component: SignInSignUpLayout,
} as ComponentMeta<typeof SignInSignUpLayout>
