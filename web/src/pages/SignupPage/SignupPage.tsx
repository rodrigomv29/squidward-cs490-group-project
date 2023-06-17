import { useRef, useState } from 'react'
import { useEffect } from 'react'

import {
  Form,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { Link, routes, navigate } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { setStatus } from 'src/utils/storage'

const SignupPage = () => {
  const { signUp } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [confirmPasswordError, setConfirmPasswordError] = useState(null)

  const signIn = () => {
    setStatus(1) // Set status as logged in (1)
    navigate(routes.home()) // Redirect to home page after signing in
  }

  // Validation function for username
  const validateUsername = (username: string) => {
    const trimmedUsername = username.trim()
    const isValid =
      trimmedUsername.length >= 8 && !trimmedUsername.includes(' ')

    // Set a custom error message for the username field
    setUsernameError(
      isValid
        ? null
        : 'The username must be at least 8 characters long and not include spaces.'
    )

    return isValid
  }

  // Validation function for password
  const validatePassword = (password: string) => {
    const trimmedPassword = password.trim()
    const hasUpperCase = /[A-Z]/.test(trimmedPassword)
    const hasLowerCase = /[a-z]/.test(trimmedPassword)
    const hasNonAlpha = /[^a-zA-Z]/.test(trimmedPassword)
    const isValid =
      trimmedPassword.length >= 8 &&
      !trimmedPassword.includes(' ') &&
      hasUpperCase &&
      hasLowerCase &&
      hasNonAlpha
    setPasswordError(
      isValid
        ? null
        : 'Password must be at least 8 characters long, not include spaces, and must contain at least one uppercase letter, one lowercase letter, and one non-letter character.'
    )
    return isValid
  }

  // Validation function for confirmation password
  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ) => {
    const isValid = password === confirmPassword
    setConfirmPasswordError(
      isValid
        ? null
        : 'The confirmation password must match the original password.'
    )
    return isValid
  }

  // focus on username box on page load
  const usernameRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await signUp({
      username: data.username,
      password: data.password,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      if (
        response.error.includes(
          'Unique constraint failed on the fields: (`username`)'
        )
      ) {
        toast.error(
          `Username ${username} is already taken. Please choose a different one.`
        )
      } else {
        toast.error(response.error)
        // toast.error('An error occurred. Please try again.')
      }
    } else {
      signIn()
    }
  }

  return (
    <>
      <MetaTags title="Signup" />
      <div className="sing-up-container mb-6 flex justify-center">
        <main className="rw-main signUp-page m-0 h-[20%] w-3/5 rounded-3xl py-0 bg-gradient-to-br from-white to-emerald-400">
          <span className="my-10 flex justify-center text-4xl font-bold">
            Sign Up
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
          <div className="rw-scaffold rw-login-container flex h-full w-[75%] justify-center rounded-3xl py-4">
            <div className="rw-segment-main flex h-1/2 w-full justify-center py-8">
              <div className="rw-segment-main flex w-full justify-center py-2">
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
                        required: 'Username is required',
                        validate: (value) => validateUsername(value),
                      }}
                      onChange={(event) => setUsername(event.target.value)}
                      placeholder="Username"
                    />
                    {usernameError ? (
                      <span className="text-xs font-semibold uppercase text-red-600">
                        {usernameError}
                      </span>
                    ) : (
                      <FieldError name="username" className="rw-field-error" />
                    )}

                    <PasswordField
                      name="password"
                      className="rw-input bg-gray-30 rounded-full border-none py-4 text-center"
                      errorClassName=""
                      autoComplete="current-password"
                      validation={{
                        required: 'Password is required',
                        validate: validatePassword,
                      }}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Password"
                    />
                    {passwordError ? (
                      <span className="text-xs font-semibold uppercase text-red-600">
                        {passwordError}
                      </span>
                    ) : (
                      <FieldError name="password" className="rw-field-error" />
                    )}

                    <PasswordField
                      name="confirmPassword"
                      className="rw-input bg-gray-30 rounded-full border-none py-4 text-center"
                      errorClassName=""
                      autoComplete=""
                      validation={{
                        required: 'Confirm password is required',
                        validate: (value) =>
                          validateConfirmPassword(password, value),
                      }}
                      placeholder="Confirm Password"
                    />
                    {confirmPasswordError ? (
                      <span className="text-xs font-semibold uppercase text-red-600">
                        {confirmPasswordError}
                      </span>
                    ) : (
                      <FieldError
                        name="confirmPassword"
                        className="rw-field-error"
                      />
                    )}

                    <div className="rw-button-group">
                      <Submit className="rw-button w-[70%] rounded-full bg-emerald-400 py-2 text-lg text-white">
                        Sign Up
                      </Submit>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
            <div className="rw-login-link">
              <span className="text-xl">Already have an account?</span>{' '}
              <Link
                to={routes.login()}
                className="text-lg text-emerald-400 underline transition-opacity hover:opacity-50"
              >
                Log in!
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default SignupPage
