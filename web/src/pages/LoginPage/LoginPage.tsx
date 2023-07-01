import { useContext, useRef } from 'react'
import { useEffect } from 'react'

import {
  Form,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import CurrentPageContext from 'src/CurrentPageContext'
import { setStatus } from 'src/utils/storage'

const LoginPage = () => {
  const { logIn } = useAuth()
  const { toggleCurrentPage } = useContext(CurrentPageContext)
  const usernameRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  const handlePageChange = (page) => {
    toggleCurrentPage(page)
  }

  const onSubmit = async (data: Record<string, string>) => {
    const response = await logIn({
      username: data.username,
      password: data.password,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      await toast.promise(
        new Promise((resolve) => {
          setTimeout(resolve, 2000) // Adjust the delay to your desired duration
        }),
        {
          loading: `Welcome back ${data.username}!`,
          success: 'Loading..',
          error: 'Error',
        }
      )

      handlePageChange('home')
      signIn()
    }
  }

  const signIn = () => {
    setStatus(1) // Set status as logged in (1)
    navigate(routes.home()) // Redirect to home page after signing in
  }

  return (
    <>
      <MetaTags title="Login" />
      <div className={`login-container flex h-[86.9vh] justify-center`}>
        <main
          className={`rw-main login-page m-0 my-16 w-3/5 rounded-3xl bg-gradient-to-br from-white to-emerald-400`}
        >
          <span className="my-16 flex justify-center text-4xl font-extrabold text-black">
            Login
          </span>
          <Toaster
            toastOptions={{
              className: 'my-toast',
              duration: 3000,
              style: {
                background: '#FAF7F6',
                color: '#34D399',
                fontFamily: 'Arvo, sans-seri',
                fontSize: '22px',
              },
            }}
          />
          <div className="rw-login-container my-0 flex h-[80%] w-[75%] justify-center rounded-3xl py-0">
            <div className="flex h-full w-full flex-col justify-center rounded-lg px-2 py-2">
              <div className="rw-form-wrapper">
                <Form
                  onSubmit={onSubmit}
                  className="rw-form-wrapper w-2/4 py-10 text-xl"
                >
                  <TextField
                    name="username"
                    className="rw-input bg-gray-30 rounded-full border-none py-4 text-center"
                    errorClassName=""
                    ref={usernameRef}
                    validation={{
                      required: {
                        value: true,
                        message: 'Username is required',
                      },
                    }}
                    placeholder="Username"
                  />

                  <FieldError name="username" className="rw-field-error" />

                  <PasswordField
                    name="password"
                    className="rw-input bg-gray-30 mt-7 rounded-full border-none py-4 text-center"
                    errorClassName=""
                    autoComplete="current-password"
                    validation={{
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                    }}
                    placeholder="Password"
                  />

                  <div className="rw-forgot-link">
                    <Link
                      to={routes.forgotPassword()}
                      className="rw-forgot-link text-whtie"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <FieldError name="password" className="rw-field-error" />

                  <div className="rw-button-group">
                    <Submit className="rw-button w-[70%] rounded-full bg-emerald-400 py-2 text-lg text-white">
                      Login
                    </Submit>
                  </div>
                </Form>
              </div>
              <div className="home-forgot-pass-container flex flex-col items-center py-2">
                <Link to={routes.home()}>
                  <div className="home-link bg-off flex w-[40%] justify-center px-4 py-2 text-lg text-white">
                    Home
                  </div>
                </Link>
                <div className="rw-login-link">
                  <span className="mx-2 text-xl text-black">
                    Don&apos;t have an account?
                  </span>{' '}
                  <Link
                    to={routes.signup()}
                    className="text-lg text-white transition-opacity hover:opacity-50"
                  >
                    Sign up!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default LoginPage
