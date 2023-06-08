import { useState, useEffect } from 'react'

import { Search2Icon, ArrowRightIcon } from '@chakra-ui/icons'
import { Button, Icon } from '@chakra-ui/react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'

import { Link, routes } from '@redwoodjs/router'

import SquidwardLogo from '../../../public/squidward_logo.png'

type NewsLayoutProps = {
  children?: React.ReactNode
}

const useWindowWidth = (threshold: number) => {
  const [isLargeScreen, setIsLargeScreen] = useState(
    window.innerWidth > threshold
  )

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > threshold)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [threshold])

  return isLargeScreen
}

const NewsLayout = ({ children }: NewsLayoutProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const isLargeScreen = useWindowWidth(768)
  const [nav, setNav] = useState(false)

  const handleNav = () => {
    setNav(!nav)
  }

  useEffect(() => {
    if (isLargeScreen && nav) {
      setNav(false)
    }
  }, [isLargeScreen, nav])

  return (
    <>
      <header>
        <div className="main pt-4">
          <div className="flex items-center justify-between">
            <div className="hidden w-full justify-between md:flex">
              <div className="left-container hidden w-1/3 md:block">
                <div
                  className="trending delay-50 mx-6 my-6 text-lg font-extrabold transition duration-150 ease-in-out hover:underline"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Link to={routes.home()}>
                    Trending
                    {isHovered && (
                      <Icon as={ArrowRightIcon} boxSize={4} className="mx-1" />
                    )}
                  </Link>
                </div>
              </div>
              <Link to={routes.home()}>
                <div className="main-logo-container flex flex-grow items-center justify-center">
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
              <div className="sing-in-button mx-6 flex w-1/3 items-center justify-end text-lg">
                <Link to={routes.signIn()}>
                  <Button variant="custom_light">Sign in</Button>
                </Link>
              </div>
            </div>
            <div className="mobile-menu-container flex w-full justify-between md:hidden">
              <Link to={routes.home()} className="flex-grow">
                <div className="main-logo-container ml-8 flex items-center justify-center">
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
              <div
                role="button"
                tabIndex={0}
                onClick={handleNav}
                onKeyDown={(event) => {
                  if (event.key === ' ') {
                    handleNav()
                  }
                }}
                className={'mx-4 flex items-center justify-end'}
              >
                {!nav ? (
                  <AiOutlineMenu size={30} />
                ) : (
                  <AiOutlineClose size={30} />
                )}
              </div>
            </div>
          </div>
          <div
            className={
              !nav
                ? 'fixed left-[-100%] top-0 h-[100%] duration-500 ease-in-out'
                : 'fixed left-0 top-0 h-[100%] w-1/5 flex-none border-r border-r-gray-300 duration-500 ease-in-out'
            }
          >
            <ul className=" text-md h-[100%] bg-emerald-400 text-white">
              <div className="list-items px-3 py-5 uppercase">
                <li className="my-12 border-b transition-opacity hover:opacity-75 hover:shadow">
                  <Link to={routes.home()}>Home</Link>
                </li>
                <li className="my-12 border-b transition-opacity duration-300  hover:opacity-75 hover:shadow">
                  <Link to={routes.home()}>World</Link>
                </li>
                <li className="my-12 border-b transition-opacity duration-300  hover:opacity-75 hover:shadow">
                  <Link to={routes.home()}>Business</Link>
                </li>
                <li className="my-12 border-b transition-opacity duration-300  hover:opacity-75 hover:shadow">
                  <Link to={routes.home()}>Tech</Link>
                </li>
                <li className="transition-opacityy hover:shadowduration-300 my-2 border-b hover:opacity-75">
                  <Link to={routes.home()}>Life & Style</Link>
                </li>
                <li className="my-12 border-b transition-opacity duration-300 hover:opacity-75  hover:shadow">
                  Search <Icon as={Search2Icon} boxSize={4} className="mx-2" />
                </li>
                <li className="transition-opacityy hover:shadowduration-300 my-12 border-b hover:opacity-75">
                  <Link to={routes.signIn()}>Sign in</Link>
                </li>
              </div>
            </ul>
          </div>
        </div>
        <div className="navbar hidden h-10 items-center bg-emerald-400 py-2 md:block">
          <div className="navbar-container mx-0 w-full">
            <ul className="flex justify-between text-lg text-white">
              <li className="mx-16 transition-opacity duration-300 hover:opacity-75 hover:shadow">
                <Link to={routes.home()}>Home</Link>
              </li>
              <li className="transition-opacity duration-300 hover:opacity-75 hover:shadow">
                <Link to={routes.home()}>World</Link>
              </li>
              <li className="transition-opacity duration-300 hover:opacity-75 hover:shadow">
                <Link to={routes.home()}>Business</Link>
              </li>
              <li className="transition-opacity duration-300 hover:opacity-75 hover:shadow">
                <Link to={routes.home()}>Tech</Link>
              </li>
              <li className="transition-opacityy hover:shadowduration-300 hover:opacity-75">
                <Link to={routes.home()}>Life & Style</Link>
              </li>
              <li className="mx-16 transition-opacity duration-300 hover:opacity-75 hover:shadow">
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
