import { Button } from '@chakra-ui/react'

import { Link, routes, navigate } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { setStatus } from 'src/utils/storage'

const SignInPage = () => {
  const signIn = () => {
    setStatus(1) // Set status as logged in (1)
    navigate(routes.home()) // Redirect to home page after signing in
  }

  return (
    <>
      <MetaTags title="SignIn" description="SignIn page" />

      <h1>SignInPage</h1>
      <p>
        Find me in <code>./web/src/pages/SignInPage/SignInPage.tsx</code>
      </p>
      <p>
        My default route is named <code>signIn</code>, link to me with `
        <Link to={routes.signIn()}>SignIn</Link>`
      </p>

      <Button onClick={signIn}>Sign In</Button>
    </>
  )
}

export default SignInPage
