import type { ComponentMeta, ComponentStory } from '@storybook/react'

import NewsLayout from './NewsLayout'

export const generated: ComponentStory<typeof NewsLayout> = (args) => {
  return <NewsLayout {...args} />
}

export default {
  title: 'Layouts/NewsLayout',
  component: NewsLayout,
} as ComponentMeta<typeof NewsLayout>
