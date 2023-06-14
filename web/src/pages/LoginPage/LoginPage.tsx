import { useRef } from 'react'
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
import { setStatus } from 'src/utils/storage'

const LoginPage = () => {
  const { logIn } = useAuth()

  const usernameRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

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
      toast.success('Welcome back!')
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
      <div className="login-container flex justify-center pb-0">
        <main className="rw-main login-page m-0 w-3/5 rounded-3xl bg-emerald-400 py-0">
          <span className="my-8 flex justify-center text-4xl font-extrabold">
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
          <div className="rw-login-container flex w-[75%] justify-center rounded-3xl py-4">
            <div className="flex w-full w-full flex-col justify-center justify-center rounded-lg bg-white px-2 py-8">
              <div className="rw-form-wrapper">
                <Form
                  onSubmit={onSubmit}
                  className="rw-form-wrapper w-2/4 py-10 text-xl"
                >
                  <TextField
                    name="username"
                    className="rw-input bg-gray-30 rounded-full border-gray-400 py-4 text-center"
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
                    className="rw-input bg-gray-30 mt-7 rounded-full border-gray-400 py-4 text-center"
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
                      className="rw-forgot-link text-emerald-400"
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
                  <div className="home-link bg-off flex w-[40%] justify-center px-4 py-2 text-lg text-emerald-400">
                    Home
                  </div>
                </Link>
                <div className="rw-login-link">
                  <span className="text-xl">Don&apos;t have an account?</span>{' '}
                  <Link
                    to={routes.signup()}
                    className="text-lg text-emerald-400 transition-opacity hover:opacity-50"
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
