import * as React from 'react'
import { useState, useEffect, useContext } from 'react'

import { Search2Icon, ArrowRightIcon } from '@chakra-ui/icons'
import { Icon } from '@chakra-ui/react'
import Button, { ButtonProps } from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'

import { Link, routes, navigate } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import AccountMenu from 'src/components/AccountMenu/AccountMenu'
import ArticleCell from 'src/components/ArticleCell/'
import { getStatus, setStatus } from 'src/utils/storage'

import SquidwardLogo from '../../../public/squidward_logo.png'
import SettingsPopup from '../../components/Settings/SettingsPopup'
import CustomThemeContext from '../../CustomThemeContext'

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

const SignInButton = styled(Button)<ButtonProps>(() => ({
  color: '#FFFFFF',
  backgroundColor: '#34d399',
  '&:hover': {
    backgroundColor: '#059669',
  },
  fontWeight: 'bold',
  width: 175,
  height: 60,
  fontSize: '1.3rem',
  borderRadius: '30px', // Set the border radius to make it more rounded
}))

const NewsLayout = ({ children }: NewsLayoutProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const isLargeScreen = useWindowWidth(768)
  const [nav, setNav] = useState(false)
  const { currentUser, logOut } = useAuth()
  const currentUsername = currentUser != undefined ? currentUser.email : null
  const [settingsOpen, setSettingsOpen] = useState(false)

  const status = getStatus()

  const { theme, toggleTheme } = useContext(CustomThemeContext)

  const signIn = () => {
    if (status === 0) {
      navigate(routes.login()) // Redirect to sign-in page
      handleNav()
    }
  }

  const handleNav = () => {
    setNav(!nav)
  }
  const handleOpenSettings = () => {
    setSettingsOpen(true)
  }

  const handleLogout = () => {
    logOut()
    setStatus(0)
    navigate(routes.home()) // Redirect to home page after signing out
    if (theme === 1) {
      toggleTheme()
    }
  }

  useEffect(() => {
    if (isLargeScreen && nav) {
      setNav(false)
    }
  }, [isLargeScreen, nav])

  return (
    <>
      <header>
        <div
          className={`main pt-2 transition-colors duration-300 ${
            theme === 1 && status === 1 ? 'bg-gray-700' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="hidden w-full justify-between md:flex">
              {/* Trending Link */}
              <div className="left-container hidden w-1/3 md:block">
                <div
                  className={`trending delay-50 transition-color mx-6 my-6 text-lg font-extrabold transition duration-150 ease-in-out hover:underline ${
                    theme === 1 && status === 1 ? 'text-white' : ''
                  }`}
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
              {/* Main Logo */}
              <Link to={routes.home()}>
                <div className="main-logo-container flex flex-grow items-center justify-center">
                  <div className="main-header-text flex items-center">
                    <div className="main-logo-squidward mx-2 h-10 rounded-md bg-emerald-400 px-3 py-1.5 text-2xl font-extrabold text-white">
                      Squidward
                    </div>
                    <div
                      className={`main-logo-news text-4xl font-semibold transition-colors duration-300 ${
                        theme === 1 && status === 1 ? 'text-white' : ''
                      }`}
                    >
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
              {/* Sign in container */}
              <div className="sing-in-my-account-container mx-6 flex w-1/3 items-center justify-end text-lg">
                {status === 0 ? (
                  <Link to={routes.login()}>
                    <div className="sing-in-button mx-6 my-4 text-lg">
                      <SignInButton variant="contained">Sign In</SignInButton>
                    </div>
                  </Link>
                ) : (
                  <div className="my-account-menu mx-6 my-4">
                    <Menu>
                      {({ isOpen }) => (
                        <>
                          <MenuButton
                            isActive={isOpen}
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                            variant="custom_light_menu"
                          >
                            {'My Account'}
                          </MenuButton>

                          <MenuList className="bg-yello-200 mt-0 flex w-96 flex-col items-center justify-center font-semibold">
                            {isAuthenticated && (
                              <div className="mt-0 flex w-full justify-center py-4">
                                Signed In:&nbsp;{`${currentUsername}`}
                              </div>
                            )}
                            <MenuItem
                              className="mt-2 flex justify-between"
                              onClick={handleOpenSettings}
                            >
                              Settings&nbsp;
                              <SettingsIcon className="" />
                            </MenuItem>
                            {settingsOpen && (
                              <SettingsPopup
                                onClose={() => setSettingsOpen(false)}
                                userId={currentUser?.id}
                              />
                            )}
                            <MenuItem
                              onClick={handleLogout}
                              className="mt-2 flex justify-between"
                            >
                              Sign out
                              <FontAwesomeIcon
                                icon={faRightToBracket}
                                style={{ color: '#080808' }}
                              />
                            </MenuItem>
                          </MenuList>
                        </>
                      )}
                    </Menu>
                  </div>
                  <AccountMenu />
                )}
              </div>
            </div>
            {/* Mobile Menu container */}
            <div className="mobile-menu-container flex w-full justify-between md:hidden">
              <Link to={routes.home()} className="flex-grow">
                <div className="main-logo-container ml-8 flex items-center justify-center">
                  <div className="main-header-text flex items-center">
                    <div className="main-logo-squidward mx-2 h-10 rounded-md bg-emerald-400 px-3 py-1.5 text-2xl font-extrabold text-white">
                      Squidward
                    </div>
                    <div
                      className={`main-logo-news transition-color text-4xl font-semibold duration-200 ${
                        theme === 1 && status === 1 ? 'text-white' : ''
                      }`}
                    >
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
                  theme === 1 && status === 1 ? (
                    <AiOutlineMenu size={30} color={'white'} />
                  ) : (
                    <AiOutlineMenu size={30} />
                  )
                ) : theme === 1 && status === 1 ? (
                  <AiOutlineClose size={30} color={'white'} />
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
            <ul className=" text-md h-[100%] bg-emerald-400 bg-opacity-70 text-white">
              <div className="list-items px-3 py-5 uppercase">
                <li className="my-12 border-b text-xs transition-opacity hover:opacity-75 hover:shadow">
                  <Link to={routes.home()} onClick={handleNav}>
                    Home
                  </Link>
                </li>
                <li className="my-12 border-b text-xs transition-opacity  duration-300 hover:opacity-75 hover:shadow">
                  <Link to={routes.home()} onClick={handleNav}>
                    Business
                  </Link>
                </li>
                <li className="my-12 border-b text-xs transition-opacity  duration-300 hover:opacity-75 hover:shadow">
                  <Link to={routes.home()} onClick={handleNav}>
                    Entertainment
                  </Link>
                </li>
                <li className="my-12 border-b text-xs transition-opacity  duration-300 hover:opacity-75 hover:shadow">
                  <Link to={routes.home()} onClick={handleNav}>
                    Health
                  </Link>
                </li>
                <li className="transition-opacityy hover:shadowduration-300 my-2 border-b text-xs hover:opacity-75">
                  <Link to={routes.home()} onClick={handleNav}>
                    Science
                  </Link>
                </li>
                <li className="transition-opacityy hover:shadowduration-300 my-12 border-b text-xs hover:opacity-75">
                  <Link to={routes.home()} onClick={handleNav}>
                    Sports
                  </Link>
                </li>
                <li className="transition-opacityy hover:shadowduration-300 my-12 border-b text-xs hover:opacity-75">
                  <Link to={routes.home()} onClick={handleNav}>
                    Technology
                  </Link>
                </li>
                <li className="transition-opacityy hover:shadowduration-300 my-12 border-b text-xs hover:opacity-75">
                  {status === 0 ? (
                    <Link to={routes.login()} onClick={signIn}>
                      <span className="">Sign In</span>
                    </Link>
                  ) : (
                    <Link to={routes.home()} onClick={handleLogout}>
                      <span className="">Sign Out</span>
                    </Link>
                  )}
                </li>
                {currentUser && (
                  <div className="mt-0 flex w-full justify-center py-4">
                    {`${currentUsername}`}
                  </div>
                )}
              </div>
            </ul>
          </div>
          {/* Main Navbar*/}
          <div
            className={`navbar hidden h-12 items-center py-2 md:block ${
              theme === 1 ? 'bg-gray-800' : 'bg-emerald-400'
            }`}
          >
            <div className="navbar-container mx-0 w-full">
              <ul
                className={`flex justify-between text-lg ${
                  theme === 1 ? 'text-emerald-400' : 'text-white'
                }`}
              >
                <li className="mx-8 transition-opacity duration-300 hover:opacity-75 hover:shadow">
                  <Link to={routes.home()}>Home</Link>
                </li>
                <li className="transition-opacity duration-300 hover:opacity-75 hover:shadow">
                  <Link to={routes.home()}>Business</Link>
                </li>
                <li className="transition-opacity duration-300 hover:opacity-75 hover:shadow">
                  <Link to={routes.home()}>Entertainment</Link>
                </li>
                <li className="transition-opacity duration-300 hover:opacity-75 hover:shadow">
                  <Link to={routes.home()}>Health</Link>
                </li>
                <li className="transition-opacityy hover:shadowduration-300 hover:opacity-75">
                  <Link to={routes.home()}>Science</Link>
                </li>
                <li className="transition-opacityy hover:shadowduration-300 hover:opacity-75">
                  <Link to={routes.home()}>Sports</Link>
                </li>
                <li className="transition-opacityy hover:shadowduration-300 hover:opacity-75">
                  <Link to={routes.home()}>Technology</Link>
                </li>
                <li className="mx-8 transition-opacity duration-300 hover:opacity-75 hover:shadow">
                  <Icon as={Search2Icon} boxSize={6} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      <main className="h-screen">{children}</main>
      <ArticleCell category="Technology" />
    </>
  )
}

export default NewsLayout
