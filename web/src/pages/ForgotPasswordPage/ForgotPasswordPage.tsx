import { useEffect, useRef } from 'react'

import { Form, TextField, Submit, FieldError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const usernameRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    usernameRef?.current?.focus()
  }, [])

  const onSubmit = async (data: { username: string }) => {
    const response = await forgotPassword(data.username)

    if (response.error) {
      toast.error(response.error)
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success(
        'A link to reset your password was sent to ' + response.email
      )
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Forgot Password" />
      <div className="forgot-pass-container mb-6 flex justify-center">
        <main className="rw-main m-0 h-[20%] w-3/5 rounded-3xl bg-emerald-400 py-0">
          <span className="my-10 flex justify-center text-4xl font-extrabold">
            Forgot Password ?
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
          <div className="rw-scaffold rw-login-container flex h-full w-[50%] justify-center rounded-3xl py-4">
            <div className="w-full">
              <div className="rw-segment-main flex w-full justify-center py-8">
                <div className="rw-form-wrapper">
                  <Form
                    onSubmit={onSubmit}
                    className="rw-form-wrapper w-2/4 py-10 text-xl"
                  >
                    <div className="">
                      <TextField
                        name="username"
                        className={`rw-input rounded-full border-2 border-gray-400 py-4 text-center`}
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
                    </div>

                    <div className="rw-button-group">
                      <Submit className="rw-button w-[70%] rounded-full bg-emerald-400 py-2 text-lg text-white">
                        Submit
                      </Submit>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default ForgotPasswordPage
