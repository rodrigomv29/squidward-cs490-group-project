import React from 'react'

import { Box, Heading, Link } from '@chakra-ui/react'

import NewsLayout from 'src/layouts/NewsLayout/NewsLayout'

const SearchResultsPage = () => {
  // Placeholder search results data
  const searchResults = [
    { id: 1, title: 'Article 1', url: '/article-1' },
    { id: 2, title: 'Article 2', url: '/article-2' },
    //placeholder search results
  ]

  return (
    <NewsLayout>
      <Box textAlign="center" py={8}>
        <Heading as="h1" fontSize="6xl" fontWeight="bold" mb={8}>
          Search Results
        </Heading>
        {/* Render your search results here */}
        <Box marginLeft={0}>
          {searchResults.map((result) => (
            <Box key={result.id} mb={4}>
              <Link href={result.url} fontWeight="bold" fontSize="xl">
                {result.title}
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
    </NewsLayout>
  )
}

export default SearchResultsPage
