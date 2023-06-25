import React from 'react'

import { Link } from '@redwoodjs/router'

import SearchResultLayout from 'src/layouts/SearchResultsLayout/SearchResultsLayout'

const SearchResultsPage = () => {
  // Placeholder search results data
  const searchResults = [
    { id: 1, title: 'Article 1', url: '/article-1' },
    { id: 2, title: 'Article 2', url: '/article-2' },
    // Add more placeholder search results as needed
  ]

  return (
    <SearchResultLayout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold my-4">Search Results</h1>
        {/* Render your search results here */}
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>
              <Link to={result.url}>{result.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </SearchResultLayout>
  )
}

export default SearchResultsPage
