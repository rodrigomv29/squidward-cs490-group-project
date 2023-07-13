import { render, screen } from '@redwoodjs/testing/web'

import SearchResultsPage from './SearchResultsPage'

describe('SearchResultsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SearchResultsPage />)
    }).not.toThrow()
  })

  it('displays the search results', () => {
    render(<SearchResultsPage />)
    expect(screen.getByText('Search Results')).toBeInTheDocument()
  })

  it('displays no results message', () => {
    render(<SearchResultsPage />)
    expect(
      screen.getByText('No results found for your search.')
    ).toBeInTheDocument()
  })

  it('allows sorting the search results', () => {
    render(<SearchResultsPage />)
    expect(screen.getByText('Sort')).toBeInTheDocument()
    expect(screen.getByText('Latest')).toBeInTheDocument()
    expect(screen.getByText('Oldest')).toBeInTheDocument()
  })

  it('allows filtering the search results by dates', () => {
    render(<SearchResultsPage />)
    expect(screen.getByText('Dates')).toBeInTheDocument()
    expect(screen.getByText('All Time')).toBeInTheDocument()
    expect(screen.getByText('Today')).toBeInTheDocument()
    expect(screen.getByText('Past 7 Days')).toBeInTheDocument()
    expect(screen.getByText('Past 14 Days')).toBeInTheDocument()
    expect(screen.getByText('Past 30 Days')).toBeInTheDocument()
  })
})
