import { Search2Icon } from '@chakra-ui/icons'
import { Button, Icon } from '@chakra-ui/react'

import { Link, routes } from '@redwoodjs/router'

import SquidwardLogo from '../../../public/squidward_logo.png'

type NewsLayoutProps = {
  children?: React.ReactNode
}

const NewsLayout = ({ children }: NewsLayoutProps) => {
  return (
    <>
      <header>
        <div className="main flex justify-between pt-3">
          <div className="trending mx-6 my-6 text-lg font-extrabold">
            Trending
          </div>
          <Link to={routes.home()}>
            <div className="main-logo-container flex">
              <div className="main-header-text flex items-center">
                <div className="main-logo-squidward mx-2 h-10 rounded-md bg-emerald-400 px-3 py-1.5 text-2xl font-extrabold text-white">
                  Squidward
                </div>
                <div className="main-logo-news text-4xl font-semibold">
                  News
                </div>
              </div>
              <div className="squidward-logo">
                <img
                  src={SquidwardLogo}
                  alt="Squidward Logo"
                  className="h-full w-full"
                />
              </div>
            </div>
          </Link>
          <div className="sing-in-button mx-6 my-4 text-lg">
            <Link to={routes.signIn()}>
              <Button variant="custom_light">Sign in</Button>
            </Link>
          </div>
        </div>
        <div className="navbar flex h-10 items-center bg-emerald-400">
          <div className="navbar-container mx-12 w-screen">
            <ul className="flex justify-between text-lg text-white">
              <li>
                <Link to={routes.home()}>Home</Link>
              </li>
              <li>
                <Link to={routes.home()}>World</Link>
              </li>
              <li>
                <Link to={routes.home()}>Business</Link>
              </li>
              <li>
                <Link to={routes.home()}>Tech</Link>
              </li>
              <li>
                <Link to={routes.home()}>Life & Style</Link>
              </li>
              <li>
                <Icon as={Search2Icon} boxSize={6} />
              </li>
            </ul>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  )
}

export default NewsLayout
