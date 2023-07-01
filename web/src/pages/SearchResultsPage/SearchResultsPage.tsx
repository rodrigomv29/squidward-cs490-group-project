import React, { useEffect, useState, useContext } from 'react'

import { Box, Heading, Link, Image, Text } from '@chakra-ui/react'
import axios from 'axios'

import { useLocation } from '@redwoodjs/router'

import CurrentPageContext from 'src/CurrentPageContext'
import NewsLayout from 'src/layouts/NewsLayout/NewsLayout'

const SearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const { toggleCurrentPage } = useContext(CurrentPageContext)
  toggleCurrentPage(null)

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query')
    if (query) {
      const apiKey = 'e1d9b8e504f94c2aaccc50b3b6bba68f'
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        query
      )}&apiKey=${apiKey}`

      axios
        .get(url)
        .then((response) => {
          const articles = response.data.articles
          articles.sort(
            (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
          )
          setSearchResults(articles)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error(error)
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }, [location.search])

  return (
    <NewsLayout>
      <Box textAlign="center" py={8}>
        <Heading as="h1" fontSize="6xl" fontWeight="bold" mb={8}>
          Search Results
        </Heading>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : searchResults.length === 0 ? (
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
              <Box key={result.url} mb={4}>
                <Link href={result.url} fontWeight="bold" fontSize="xl">
                  {result.title}
                </Link>
                <Text fontSize="md" color="gray.500">
                  Published on{' '}
                  {new Date(result.publishedAt).toLocaleDateString()}
                </Text>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </NewsLayout>
  )
}

export default SearchResultsPage
