import { render } from '@redwoodjs/testing/web'

import CategoryPage from './CategoryPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CategoryPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CategoryPage />)
    }).not.toThrow()
  })
})
