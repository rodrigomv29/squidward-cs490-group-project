import { render } from '@redwoodjs/testing/web'

import SignupPage from './SignupPage'
/**
 * insert a new testing function for sign up function
 */

describe('SignUpPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SignupPage />)
    }).not.toThrow()
  })
})
/**
describe('users service', () => {
  it('creates a user', async () => {
    const record = await createUser({ name: 'David' })

    expect(record.id).not.toBeNull()
    expect(record.name).toEqual('David')
  })
})
**/
