import { useRef, useState } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
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

      <main className="rw-main">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="rw-scaffold rw-login-container w-1/3">
          <div className="rw-segment">
            <header className="rw-segment-header">
              <h2 className="rw-heading rw-heading-secondary">Signup</h2>
            </header>

            <div className="rw-segment-main">
              <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} className="rw-form-wrapper">
                  <Label
                    name="username"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Username
                  </Label>
                  <TextField
                    name="username"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    ref={usernameRef}
                    validation={{
                      required: 'Username is required',
                      validate: (value) => validateUsername(value),
                    }}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                  {usernameError ? (
                    <span className="text-xs font-semibold uppercase text-red-700">
                      {usernameError}
                    </span>
                  ) : (
                    <FieldError name="username" className="rw-field-error" />
                  )}

                  <Label
                    name="password"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Password
                  </Label>
                  <PasswordField
                    name="password"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    autoComplete="current-password"
                    validation={{
                      required: 'Password is required',
                      validate: validatePassword,
                    }}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  {passwordError ? (
                    <span className="text-xs font-semibold uppercase text-red-700">
                      {passwordError}
                    </span>
                  ) : (
                    <FieldError name="password" className="rw-field-error" />
                  )}

                  <Label
                    name="confirmPassword"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Confirm Password
                  </Label>
                  <PasswordField
                    name="confirmPassword"
                    className="rw-input"
                    errorClassName="rw-input rw-input-error"
                    autoComplete=""
                    validation={{
                      required: 'Confirm password is required',
                      validate: (value) =>
                        validateConfirmPassword(password, value),
                    }}
                  />
                  {confirmPasswordError ? (
                    <span className="text-xs font-semibold uppercase text-red-700">
                      {confirmPasswordError}
                    </span>
                  ) : (
                    <FieldError
                      name="confirmPassword"
                      className="rw-field-error"
                    />
                  )}

                  <div className="rw-button-group">
                    <Submit className="rw-button rw-button-blue">
                      Sign Up
                    </Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className="rw-login-link">
            <span>Already have an account?</span>{' '}
            <Link to={routes.login()} className="rw-link">
              Log in!
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default SignupPage
