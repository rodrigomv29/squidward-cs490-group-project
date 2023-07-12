import React, { useEffect, useState, useContext } from 'react'

import { Box, Heading, Image, Text } from '@chakra-ui/react'
import { CircularProgress } from '@mui/material'
import axios from 'axios'

import { useLocation } from '@redwoodjs/router'

import CurrentPageContext from 'src/CurrentPageContext'
import CustomThemeContext from 'src/CustomThemeContext'
import NewsLayout from 'src/layouts/NewsLayout/NewsLayout'

const SearchResultsPage = () => {
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()
  const { toggleCurrentPage } = useContext(CurrentPageContext)
  const { theme } = useContext(CustomThemeContext)

  const handleTheme = (first, second) => {
    if (theme === 1) {
      return `transition-colors duration-200 ${first}`
    }
    return `transition-colors duration-200 ${second}`
  }

  const handleMainTheme = (first, second) => {
    if (theme === 1) {
      return first
    }
    return second
  }

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
      {handleMainTheme(
        <Box py={8} bgColor={'gray.600'}>
          <Heading
            as="h1"
            fontSize="6xl"
            fontWeight="bold"
            mb={8}
            display={'flex'}
            justifyContent={'center'}
          >
            <span className={`${handleTheme('text-white', 'text-black')}`}>
              Search Results
            </span>
          </Heading>
          {isLoading ? (
            <div className="h-screen">
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative',
                  height: '100%',
                  color: '#34D399',
                  alignItems: 'center',
                }}
                className="flex flex-col"
              >
                <div className="mb-96">
                  <CircularProgress size={150} sx={{ color: '#34D399' }} />
                  <p className="font-lg pt-2 font-bold ">
                    Loading Search Results
                  </p>
                </div>
              </Box>
            </div>
          ) : searchResults.length === 0 ? (
            <Box h={'screen'}>
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
            <Box marginLeft={0} fontFamily="Arvo">
              {searchResults.map((result) => (
                <Box key={result.url} mb={4}>
                  <div className="items-cetner flex h-[300px] justify-center">
                    <div className="my-10 flex w-[75%] flex-row">
                      <div className="w-[30%] ">
                        <img
                          src={result.urlToImage}
                          alt=""
                          className="h-full w-full"
                        />
                      </div>
                      <div className="flex w-[70%] flex-col p-8">
                        <span
                          className={`mb-8 text-lg font-bold hover:underline ${handleTheme(
                            'text-white',
                            'text-black'
                          )}`}
                        >
                          <a
                            href={result.url}
                            key={result.id}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {result?.title}
                          </a>
                        </span>
                        <span className="">
                          <span className="font-semibold text-emerald-400">
                            Description:&nbsp;
                          </span>
                          <span
                            className={`${handleTheme(
                              'text-white',
                              'text-black'
                            )}`}
                          >
                            {result?.description}
                          </span>
                        </span>
                        <div className="bg-green- flex flex-row justify-between px-4 py-4">
                          <Text
                            fontSize="md"
                            color="gray.800"
                            fontWeight="bold"
                          >
                            <span
                              className={`${handleTheme(
                                'text-white',
                                'text-black'
                              )}`}
                            >
                              Published on{' '}
                              {new Date(
                                result.publishedAt
                              ).toLocaleDateString()}
                            </span>
                          </Text>
                          <div
                            className={`font-bold ${handleTheme(
                              'text-emerald-400',
                              'text-black'
                            )}`}
                          >
                            {result.source.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>
              ))}
            </Box>
          )}
        </Box>,
        <Box py={8} bgColor={'white'}>
          <Heading
            as="h1"
            fontSize="6xl"
            fontWeight="bold"
            mb={8}
            display={'flex'}
            justifyContent={'center'}
          >
            <span className={`${handleTheme('text-white', 'text-black')}`}>
              Search Results
            </span>
          </Heading>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : searchResults.length === 0 ? (
            <Box h={'screen'}>
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
            <Box marginLeft={0} fontFamily="Arvo">
              {searchResults.map((result) => (
                <Box key={result.url} mb={4}>
                  <div className="items-cetner flex h-[300px] justify-center">
                    <div className="my-10 flex w-[75%] flex-row">
                      <div className="w-[30%] ">
                        <img
                          src={result.urlToImage}
                          alt=""
                          className="h-full w-full"
                        />
                      </div>
                      <div className="flex w-[70%] flex-col p-8">
                        <span
                          className={`mb-8 text-lg font-bold hover:underline ${handleTheme(
                            'text-white',
                            'text-black'
                          )}`}
                        >
                          <a
                            href={result.url}
                            key={result.id}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {result?.title}
                          </a>
                        </span>
                        <span className="">
                          <span className="font-semibold text-emerald-400">
                            Description:&nbsp;
                          </span>
                          <span
                            className={`${handleTheme(
                              'text-white',
                              'text-black'
                            )}`}
                          >
                            {result?.description}
                          </span>
                        </span>
                        <div className="bg-green- flex flex-row justify-between px-4 py-4">
                          <Text
                            fontSize="md"
                            color="gray.800"
                            fontWeight="bold"
                          >
                            <span
                              className={`${handleTheme(
                                'text-white',
                                'text-black'
                              )}`}
                            >
                              Published on{' '}
                              {new Date(
                                result.publishedAt
                              ).toLocaleDateString()}
                            </span>
                          </Text>
                          <div
                            className={`font-bold ${handleTheme(
                              'text-emerald-400',
                              'text-black'
                            )}`}
                          >
                            {result.source.name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      )}
    </NewsLayout>
  )
}

export default SearchResultsPage
