import { render } from '@redwoodjs/testing/web'

import DefaultHomePage from './DefaultHomePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DefaultHomePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DefaultHomePage />)
    }).not.toThrow()
  })
})
