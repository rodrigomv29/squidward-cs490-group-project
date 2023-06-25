import React from 'react'

import { Box, Heading, Link, Image, Text } from '@chakra-ui/react'

import NewsLayout from 'src/layouts/NewsLayout/NewsLayout'

const SearchResultsPage = () => {
  // Placeholder search results data
  /*
  const searchResults = [
    { id: 1, title: 'Article 1', url: '/article-1' },
    { id: 2, title: 'Article 2', url: '/article-2' },
    { id: 3, title: 'Article 3', url: '/article-3' },
  ]
*/
  //To test the no results feature use an empty array for now

  const searchResults = []

  return (
    <NewsLayout>
      <Box textAlign="center" py={8}>
        <Heading as="h1" fontSize="6xl" fontWeight="bold" mb={8}>
          Search Results
        </Heading>
        {searchResults.length === 0 ? (
          <Box>
            <Image
              src="https://media1.tenor.com/images/2025c85773b942247e4565847e43a5d0/tenor.gif?itemid=7619217"
              alt="No results found"
              maxW={400}
              mx="auto"
              mb={8}
            />
            <Heading as="h2" fontSize="4xl" fontWeight="bold" mb={4}>
              No results found.
            </Heading>
            <Text fontSize="xl" mb={4}>
              Please try a different search term.
            </Text>
          </Box>
        ) : (
          <Box marginLeft={0}>
            {searchResults.map((result) => (
              <Box key={result.id} mb={4}>
                <Link href={result.url} fontWeight="bold" fontSize="xl">
                  {result.title}
                </Link>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </NewsLayout>
  )
}

export default SearchResultsPage
