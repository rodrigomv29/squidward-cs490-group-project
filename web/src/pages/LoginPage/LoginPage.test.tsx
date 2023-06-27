import { render } from '@redwoodjs/testing/web'

import LoginPage from './LoginPage'
/**
 * insert a new test page for login function
 */

describe('LoginPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoginPage />)
    }).not.toThrow()
  })
})
