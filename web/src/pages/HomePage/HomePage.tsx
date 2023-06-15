import { MetaTags } from '@redwoodjs/web'

import { getStatus } from 'src/utils/storage'

import DefaultHomePage from '../DefaultHomePage/DefaultHomePage'

const HomePage = () => {
  const status = getStatus()

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      {status === 0 ? <DefaultHomePage /> : 'Logged in'}
    </>
  )
}

export default HomePage
