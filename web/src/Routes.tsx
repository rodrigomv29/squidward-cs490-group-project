// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js' -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'

import NewsLayout from 'src/layouts/NewsLayout'
import ScaffoldLayout from 'src/layouts/ScaffoldLayout'
import SignInSignUpLayout from 'src/layouts/SignInSignUpLayout'
import SearchResultsPage from 'src/pages/SearchResultsPage/SearchResultsPage'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Set prerender>
        <Route path="/search-results" page={SearchResultsPage} name="searchResults" />
      </Set>

      <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
        <Set prerender>
          <Route path="/users/new" page={UserNewUserPage} name="newUser" />
          <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
          <Route path="/users" page={UserUsersPage} name="users" />
        </Set>
      </Set>
      <Set wrap={SignInSignUpLayout}>
        <Set prerender>
          <Route path="/login" page={LoginPage} name="login" />
          <Route path="/signup" page={SignupPage} name="signup" />
          <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
          <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
        </Set>
      </Set>
      <Set wrap={NewsLayout}>
        <Set prerender>
          <Route path="/" page={HomePage} name="home" />
          <Route path="/signed-in-home" page={SignedInHomePage} name="signedInHome" />
          <Route path="/category-page" page={CategoryPage} name="category" />
        </Set>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
