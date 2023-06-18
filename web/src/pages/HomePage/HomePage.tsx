import { MetaTags } from '@redwoodjs/web'

import { getStatus } from 'src/utils/storage'

import DefaultHomePage from '../DefaultHomePage/DefaultHomePage'
import SignedInHomePage from '../SignedInHomePage/SignedInHomePage'

const HomePage = () => {
  const status = getStatus()
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      {status === 0 ? <DefaultHomePage /> : <SignedInHomePage />}
    </>
  )
}

export default HomePage
