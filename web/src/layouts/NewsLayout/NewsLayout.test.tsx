import { render, screen, fireEvent } from '@redwoodjs/testing/web'

import { MemoryRouter, Route } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'

import NewsLayout from './NewsLayout'
import { routes } from '@redwoodjs/router'

describe('NewsLayout', () => {
  it('renders successfully', () => {
    render(
      <MemoryRouter initialEntries={[routes.home()]}>
        <Route path={routes.home()} element={<NewsLayout />} />
      </MemoryRouter>
    )

    // Main logo
    const logoLink = screen.getByText(/squidward/i)
    expect(logoLink).toBeInTheDocument()

    // Trending link
    expect(screen.getByText(/trending/i)).toBeInTheDocument()

    // Sign In / My Account
    const signInLink = screen.getByText(/sign in/i)
    expect(signInLink).toBeInTheDocument()

    // Mobile menu
    expect(screen.getByRole('button', { name: /mobile menu/i })).toBeInTheDocument()

    // Navigation items
    expect(screen.getByText(/home/i)).toBeInTheDocument()
    expect(screen.getByText(/business/i)).toBeInTheDocument()
    expect(screen.getByText(/entertainment/i)).toBeInTheDocument()
    expect(screen.getByText(/health/i)).toBeInTheDocument()
    expect(screen.getByText(/science/i)).toBeInTheDocument()
    expect(screen.getByText(/sports/i)).toBeInTheDocument()
    expect(screen.getByText(/technology/i)).toBeInTheDocument()
    expect(screen.getByText(/search/i)).toBeInTheDocument()

    // Footer
    expect(screen.getByText(/redwoodjs/i)).toBeInTheDocument()
  })

  it('navigates to the home page when logo is clicked', () => {
    render(
      <MemoryRouter initialEntries={[routes.home()]}>
        <Route path={routes.home()} element={<NewsLayout />} />
        <Route path={routes.home()} element={<div>Home Page</div>} />
      </MemoryRouter>
    )

    const logoLink = screen.getByText(/squidward/i)
    fireEvent.click(logoLink)
    expect(screen.getByText(/home page/i)).toBeInTheDocument()
  })

  it('navigates to the sign-in page when Sign In link is clicked', () => {
    render(
      <MemoryRouter initialEntries={[routes.home()]}>
        <Route path={routes.home()} element={<NewsLayout />} />
        <Route path={routes.signIn()} element={<div>Sign In Page</div>} />
      </MemoryRouter>
    )

    const signInLink = screen.getByText(/sign in/i)
    fireEvent.click(signInLink)
    expect(screen.getByText(/sign in page/i)).toBeInTheDocument()
  })

})
