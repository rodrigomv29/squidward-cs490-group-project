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
          <div className="trending mx-4 text-lg font-extrabold">Trending</div>
          <Link to={routes.home()}>
            <div className="main-logo-container flex">
              <div className="main-header-text flex items-center">
                <div className="main-logo-squidward mx-2 h-10 rounded-md bg-emerald-400 px-3 py-1.5 text-2xl text-white">
                  Squidward
                </div>
                <div className="main-logo-news text-4xl">News</div>
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
          <div className="sing-in-button mx-6 text-lg">
            <Link to={routes.signIn()}>Sign In</Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  )
}

export default NewsLayout
