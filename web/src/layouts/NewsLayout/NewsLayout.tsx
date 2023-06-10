import { useState, useEffect } from 'react'

import { Search2Icon, ArrowRightIcon, ChevronDownIcon } from '@chakra-ui/icons'
import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'

import { Link, routes, navigate } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import { getStatus, setStatus } from 'src/utils/storage'

import SquidwardLogo from '../../../public/squidward_logo.png'

type NewsLayoutProps = {
  children?: React.ReactNode
}

/*
  A useEffect to keep track of the current state of the screen for diffrent viewing size
*/
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
  const { isAuthenticated, currentUser, logOut } = useAuth()
  const currentUsername = isAuthenticated ? currentUser.email : null

  const status = getStatus()

  const signIn = () => {
    if (status === 0) {
      navigate(routes.login()) // Redirect to sign-in page
      handleNav()
    }
  }

  function signOut() {
    setStatus(0) // Set status as not logged in (0)
    navigate(routes.home()) // Redirect to home page after signing out
    handleNav()
  }

  const handleNav = () => {
    setNav(!nav)
  }

  const handleLogout = () => {
    logOut()
    setStatus(0)
    handleNav()
  }

  console.log(status)

  useEffect(() => {
    if (isLargeScreen && nav) {
      setNav(false)
    }
  }, [isLargeScreen, nav])

  return (
    <>
      <header>
        <div className={'main pt-4 '}>
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
                {status === 0 ? (
                  <Link to={routes.login()}>
                    <div className="sing-in-button mx-6 my-4 text-lg">
                      <Button onClick={signIn} variant="custom_light">
                        Sign In
                      </Button>
                    </div>
                  </Link>
                ) : (
                  <div className="my-account-menu mx-6 my-4 text-lg">
                    <Menu>
                      {({ isOpen }) => (
                        <>
                          <MenuButton
                            isActive={isOpen}
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                          >
                            {'My Account'}
                          </MenuButton>
                          <MenuList>
                            {isAuthenticated && (
                              <div>{`Logged in as: ${currentUsername}`}</div>
                            )}
                            <MenuItem>Settings</MenuItem>
                            <MenuItem onClick={handleLogout}>Sign out</MenuItem>
                          </MenuList>
                        </>
                      )}
                    </Menu>
                  </div>
                )}
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
                ? 'z-9999 fixed left-[-100%] top-0 h-[100%] duration-500 ease-in-out'
                : 'fixed left-0 top-0 z-50 h-[100%] w-1/5 flex-none border-r border-r-gray-300 bg-black bg-opacity-50 duration-500 ease-in-out'
            }
          >
            <ul className=" text-md h-[100%] bg-emerald-400 text-white">
              <div className="list-items px-3 py-5 uppercase">
                <li className="my-12 border-b transition-opacity hover:opacity-75 hover:shadow">
                  <Link to={routes.home()} onClick={handleNav}>
                    Home
                  </Link>
                </li>
                <li className="my-12 border-b transition-opacity duration-300  hover:opacity-75 hover:shadow">
                  <Link to={routes.home()} onClick={handleNav}>
                    World
                  </Link>
                </li>
                <li className="my-12 border-b transition-opacity duration-300  hover:opacity-75 hover:shadow">
                  <Link to={routes.home()} onClick={handleNav}>
                    Business
                  </Link>
                </li>
                <li className="my-12 border-b transition-opacity duration-300  hover:opacity-75 hover:shadow">
                  <Link to={routes.home()} onClick={handleNav}>
                    Tech
                  </Link>
                </li>
                <li className="transition-opacityy hover:shadowduration-300 my-2 border-b hover:opacity-75">
                  <Link to={routes.home()} onClick={handleNav}>
                    Life & Style
                  </Link>
                </li>
                <li className="my-12 border-b transition-opacity duration-300 hover:opacity-75  hover:shadow">
                  Search <Icon as={Search2Icon} boxSize={4} className="mx-2" />
                </li>
                <li className="transition-opacityy hover:shadowduration-300 my-12 border-b hover:opacity-75">
                  {status === 0 ? (
                    <Link to={routes.login()} onClick={signIn}>
                      <span className="flex justify-center">Sign In</span>
                    </Link>
                  ) : (
                    <Link to={routes.home()} onClick={signOut}>
                      <span className="flex justify-center">Sign Out</span>
                    </Link>
                  )}
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
