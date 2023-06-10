import { useState, useEffect } from 'react'

import { Search2Icon } from '@chakra-ui/icons'
import { Icon } from '@chakra-ui/react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'

import { Link, routes, navigate } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import { getStatus, setStatus } from 'src/utils/storage'

import SquidwardLogo from '../../../public/squidward_logo_128.png'

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

const SignInSignUpLayout = ({ children }: NewsLayoutProps) => {
  // const [isHovered, setIsHovered] = useState(false)
  const isLargeScreen = useWindowWidth(768)
  const [nav, setNav] = useState(false)
  const { logOut } = useAuth()

  const status = getStatus()

  const signIn = () => {
    if (status === 0) {
      navigate(routes.login()) // Redirect to sign-in page
      handleNav()
    }
  }

  const handleNav = () => {
    setNav(!nav)
  }

  const handleLogout = () => {
    logOut()
    setStatus(0)
    handleNav()
    navigate(routes.home()) // Redirect to home page after signing out
  }

  useEffect(() => {
    if (isLargeScreen && nav) {
      setNav(false)
    }
  }, [isLargeScreen, nav])

  return (
    <>
      <header>
        <div className={'main pt-4 '}>
          <div className="flex h-48 items-center justify-center ">
            <div className="hidden w-full justify-center md:flex">
              <Link to={routes.home()}>
                <div className="main-logo-container flex flex-grow items-center">
                  <div className="main-header-text flex items-center">
                    <div className="main-logo-squidward mx-2 h-12 rounded-md bg-emerald-400 px-3 py-2 text-3xl font-extrabold text-white">
                      Squidward
                    </div>
                    <div className="main-logo-news text-5xl font-semibold">
                      News
                    </div>
                  </div>
                  <div className="squidward-logo">
                    <img
                      src={SquidwardLogo}
                      alt="Squidward Logo"
                      className="h-32 w-32" // Adjust the height and width to your desired size
                    />
                  </div>
                </div>
              </Link>
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
                  {status === 0 ? (
                    <Link to={routes.login()} onClick={signIn}>
                      <span className="flex justify-center">Sign In</span>
                    </Link>
                  ) : (
                    <Link to={routes.home()} onClick={handleLogout}>
                      <span className="flex justify-center">Sign Out</span>
                    </Link>
                  )}
                </li>
              </div>
            </ul>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  )
}

export default SignInSignUpLayout
