import * as React from 'react'
import { useState, useEffect, useContext } from 'react'

import { ArrowRightIcon } from '@chakra-ui/icons'
import { Icon } from '@chakra-ui/react'
import Button, { ButtonProps } from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { gql } from 'graphql-tag'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import AccountMenu from 'src/components/AccountMenu/AccountMenu'
import SearchBox from 'src/components/Search/SearchBox'
import { getStatus, setStatus } from 'src/utils/storage'

import SquidwardLogo from '../../../public/squidward_logo.png'
import CurrentPageContext from '../../CurrentPageContext'
import CustomThemeContext from '../../CustomThemeContext'

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
  borderRadius: '30px',
}))

const GET_USER_QUERY = gql`
  query GetUserQuery($id: Int!) {
    user(id: $id) {
      id
      general
      business
      entertainment
      health
      science
      sports
      technology
    }
  }
`

const NewsLayout = ({ children }: NewsLayoutProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const isLargeScreen = useWindowWidth(768)
  const [nav, setNav] = useState(false)
  const { currentUser, logOut } = useAuth()
  const currentUsername = currentUser != undefined ? currentUser.email : null

  const status = getStatus()
  const { theme, toggleTheme } = useContext(CustomThemeContext)
  const { currentPage, toggleCurrentPage } = useContext(CurrentPageContext)
  const handlePageChange = (page: string) => {
    toggleCurrentPage(page)
  }

  const userId = currentUser?.id || 0

  const { data, loading } = useQuery(GET_USER_QUERY, {
    variables: { id: userId },
  })

  const user = data?.user

  const [showOptions, setShowOptions] = useState({
    home: true,
    general: user?.general ?? true,
    business: user?.business ?? true,
    entertainment: user?.entertainment ?? true,
    health: user?.health ?? true,
    science: user?.science ?? true,
    sports: user?.sports ?? true,
    technology: user?.technology ?? true,
  })

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
    navigate(routes.home()) // Redirect to home page after signing out
    if (theme === 1) {
      toggleTheme()
    }
  }

  useEffect(() => {
    if (isLargeScreen && nav) {
      setNav(false)
    }

    const updatedShowOptions = {
      home: true,
      general: user?.general ?? true,
      business: user?.business ?? true,
      entertainment: user?.entertainment ?? true,
      health: user?.health ?? true,
      science: user?.science ?? true,
      sports: user?.sports ?? true,
      technology: user?.technology ?? true,
    }
    setShowOptions(updatedShowOptions)
  }, [isLargeScreen, nav, user])

  if (loading) {
    // Handle loading state
    return <div>Loading...</div>
  }

  const CustomLink = (props) => {
    const handleCategoryClick = (event) => {
      event.preventDefault()
      setShowOptions((prevShowOptions) => {
        return {
          ...prevShowOptions,
          [props.category]: !prevShowOptions[props.category],
        }
      })
    }

    return (
      <li className="mx-8 transition-opacity duration-300 hover:opacity-75 hover:shadow">
        {props.showOptions[props.category] && (
          <Link
            to={
              props.category === 'home'
                ? routes.home()
                : routes.category({ category: props.category })
            }
            onClick={() => {
              handlePageChange(props.category)
              handleCategoryClick(Event)
            }}
          >
            <div
              className={`${
                currentPage === props.category
                  ? `h-full w-full rounded-full px-4 transition-colors duration-200 ${
                      theme === 1
                        ? 'bg-emerald-400 text-white'
                        : 'bg-white text-emerald-400 '
                    }`
                  : ''
              }`}
            >
              <span className="uppercase">{props.category.slice(0, 1)}</span>
              <span className="">{props.category.slice(1)}</span>
            </div>
          </Link>
        )}
      </li>
    )
  }

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
              <Link
                to={routes.home()}
                onClick={() => {
                  handlePageChange('home')
                }}
              >
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
                {status === 0 && currentUser == null ? (
                  <Link to={routes.login()}>
                    <div className="sing-in-button mx-6 my-4 text-lg">
                      <SignInButton variant="contained">Sign In</SignInButton>
                    </div>
                  </Link>
                ) : (
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
                <li className="my-12 border-b text-xs transition-opacity  duration-300 hover:opacity-75 hover:shadow">
                  <Link to={routes.home()} onClick={handleNav}>
                    Home
                  </Link>
                </li>
                <li className="my-12 border-b text-xs transition-opacity  duration-300 hover:opacity-75 hover:shadow">
                  <Link
                    to={routes.category({ category: 'business' })}
                    onClick={handleNav}
                  >
                    Business
                  </Link>
                </li>
                <li className="my-12 border-b text-xs transition-opacity  duration-300 hover:opacity-75 hover:shadow">
                  <Link
                    to={routes.category({ category: 'entertainment' })}
                    onClick={handleNav}
                  >
                    Entertainment
                  </Link>
                </li>
                <li className="my-12 border-b text-xs transition-opacity  duration-300 hover:opacity-75 hover:shadow">
                  <Link
                    to={routes.category({ category: 'health' })}
                    onClick={handleNav}
                  >
                    Health
                  </Link>
                </li>
                <li className="transition-opacityy hover:shadowduration-300 my-2 border-b text-xs hover:opacity-75">
                  <Link
                    to={routes.category({ category: 'science' })}
                    onClick={handleNav}
                  >
                    Science
                  </Link>
                </li>
                <li className="transition-opacityy hover:shadowduration-300 my-12 border-b text-xs hover:opacity-75">
                  <Link
                    to={routes.category({ category: 'sports' })}
                    onClick={handleNav}
                  >
                    Sports
                  </Link>
                </li>
                <li className="transition-opacityy hover:shadowduration-300 my-12 border-b text-xs hover:opacity-75">
                  <Link
                    to={routes.category({ category: 'technology' })}
                    onClick={handleNav}
                  >
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
            className={`navbar hidden h-12 items-center md:block ${
              theme === 1 ? 'bg-gray-800' : 'bg-emerald-400'
            }`}
          >
            <div className="navbar-container mx-0 flex h-[100%] w-full items-center justify-center px-12">
              <ul
                className={`flex w-full justify-between text-lg ${
                  theme === 1 ? 'text-emerald-400' : 'text-white'
                }`}
              >
                {/* Display the link if the 'home' option is enabled */}
                {showOptions.home && (
                  <li className="mx-8 transition-opacity duration-300 hover:opacity-75 hover:shadow">
                    <Link
                      to={routes.home()}
                      onClick={() => handlePageChange('home')}
                    >
                      <div
                        className={`${
                          currentPage === 'home'
                            ? `h-full w-full rounded-full px-4 transition-colors duration-200 ${
                                theme === 1
                                  ? 'bg-emerald-400 text-white'
                                  : 'bg-white text-emerald-400 '
                              }`
                            : ''
                        }`}
                      >
                        <span className="uppercase">H</span>
                        <span>ome</span>
                      </div>
                    </Link>
                  </li>
                )}

                {/* Display the link if the 'general' option is enabled */}
                {showOptions.general && (
                  <CustomLink category="general" showOptions={showOptions} />
                )}

                {/* Display the link if the 'business' option is enabled */}
                {showOptions.business && (
                  <CustomLink category="business" showOptions={showOptions} />
                )}

                {/* Display the link if the 'entertainment' option is enabled */}
                {showOptions.entertainment && (
                  <CustomLink
                    category="entertainment"
                    showOptions={showOptions}
                  />
                )}

                {/* Display the link if the 'health' option is enabled */}
                {showOptions.health && (
                  <CustomLink category="health" showOptions={showOptions} />
                )}

                {/* Display the link if the 'science' option is enabled */}
                {showOptions.science && (
                  <CustomLink category="science" showOptions={showOptions} />
                )}

                {/* Display the link if the 'sports' option is enabled */}
                {showOptions.sports && (
                  <CustomLink category="sports" showOptions={showOptions} />
                )}

                {/* Display the link if the 'technology' option is enabled */}
                {showOptions.technology && (
                  <CustomLink category="technology" showOptions={showOptions} />
                )}
                <SearchBox></SearchBox>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <main className="h-screen">{children}</main>
    </>
  )
}

export default NewsLayout
