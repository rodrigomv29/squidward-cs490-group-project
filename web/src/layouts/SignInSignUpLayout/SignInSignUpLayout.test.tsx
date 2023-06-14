import { render } from '@redwoodjs/testing/web'

import SignInSignUpLayout from './SignInSignUpLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SignInSignUpLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SignInSignUpLayout />)
    }).not.toThrow()
  })
})
