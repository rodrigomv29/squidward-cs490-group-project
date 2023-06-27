import { render } from '@redwoodjs/testing/web'

import SignedInHomePage from './SignedInHomePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SignedInHomePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SignedInHomePage />)
    }).not.toThrow()
  })
})
