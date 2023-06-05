import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const SignInPage = () => {
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
    </>
  )
}

export default SignInPage
