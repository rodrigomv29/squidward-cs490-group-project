import React, { useEffect, useState, useContext } from 'react'

import { Box, Heading, Image, Text, Select } from '@chakra-ui/react'
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
  const [sortOrder, setSortOrder] = useState('latest')
  const [timeFilter, setTimeFilter] = useState('all')

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

  const handleSortChange = (event) => {
    setSortOrder(event.target.value)
  }

  const handleTimeFilterChange = (event) => {
    setTimeFilter(event.target.value)
  }

  toggleCurrentPage(null)

  const stripHtmlTags = (str) => {
    if (str === null || str === '') return false
    else str = str.toString()
    return str.replace(/<[^>]*>/g, '');
  }

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query')
    if (query) {
      const apiKey = 'e1d9b8e504f94c2aaccc50b3b6bba68f';
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        query
      )}&apiKey=${apiKey}`

      axios
        .get(url)
        .then((response) => {
          let articles = response.data.articles
          articles.sort(
            (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
          )
          if (timeFilter !== 'all') {
            const date = new Date();
            if (timeFilter === 'today') {
              date.setDate(date.getDate() - 1)
            } else if (timeFilter === 'week') {
              date.setDate(date.getDate() - 7)
            } else if (timeFilter === 'fortnight') {
              date.setDate(date.getDate() - 14)
            } else if (timeFilter === 'month') {
              date.setMonth(date.getMonth() - 1)
            }
            articles = articles.filter(
              (article) => new Date(article.publishedAt) > date
            )
          }
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
  }, [location.search, timeFilter])

  const sortedResults = searchResults.sort((a, b) => {
    if (sortOrder === 'latest') {
      return new Date(b.publishedAt) - new Date(a.publishedAt)
    } else if (sortOrder === 'oldest') {
      return new Date(a.publishedAt) - new Date(b.publishedAt)
    }
    return 0
  })

  return (
    <NewsLayout>
      <Box py={8} bgColor={handleMainTheme('gray.600', 'white')}>
        <Heading
          as="h1"
          fontSize="6xl"
          fontWeight="bold"
          mb={8}
          display="flex"
          justifyContent="center"
        >
          <span className={handleTheme('text-white', 'text-black')}>
            Search Results
          </span>
        </Heading>
        {isLoading ? (
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
              <p className="font-lg pt-2 font-bold ">Loading Search Results</p>
            </div>
          </Box>
        ) : (
          <>
            <Box mb={4} display="flex" justifyContent="center">
              <Box w="200px" mr="4">
                <Text mb="2" fontWeight="bold">
                  Sort
                </Text>
                <Select
                  value={sortOrder}
                  onChange={handleSortChange}
                  w="100%"
                  sx={{ appearance: 'none' }}
                >
                  <option value="latest">Latest</option>
                  <option value="oldest">Oldest</option>
                </Select>
              </Box>
              <Box w="200px" ml="4">
                <Text mb="2" fontWeight="bold">
                  Dates
                </Text>
                <Select
                  value={timeFilter}
                  onChange={handleTimeFilterChange}
                  w="100%"
                  sx={{ appearance: 'none' }}
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">Past 7 Days</option>
                  <option value="fortnight">Past 14 Days</option>
                  <option value="month">Past 30 Days</option>
                </Select>
              </Box>
            </Box>
            {searchResults.length === 0 ? (
              <Box
                h="screen"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  src="https://media1.tenor.com/images/2025c85773b942247e4565847e43a5d0/tenor.gif?itemid=7619217"
                  alt="No results found"
                  maxW={400}
                  mx="auto"
                  mb={8}
                />
                <Box textAlign="center">
                  <Heading as="h2" fontSize="4xl" fontWeight="bold" mb={4}>
                    No results found.
                  </Heading>
                  <Text fontSize="xl" mb={4}>
                    Please try a different search term.
                  </Text>
                </Box>
              </Box>
            ) : (
              <Box marginLeft={0} fontFamily="Arvo">
                {sortedResults.map((result, index) => (
                  <Box key={result.url} mb={4}>
                    <div className="items-cetner flex h-[300px] justify-center">
                      <div className="my-10 flex w-[75%] flex-row">
                        <div className="w-[30%]">
                          <img
                            src={result.urlToImage}
                            alt="News"
                            className="h-[200px] w-full rounded-lg object-cover"
                          />
                        </div>
                        <div className="ml-5 flex w-[70%] flex-col">
                          <h2 className="mb-2 truncate text-2xl font-bold">
                            {result.title}
                          </h2>
                          <p className="text-gray-400">
                            {new Date(result.publishedAt).toDateString()}
                          </p>
                          <div className="text-sm font-normal">
                            <p className="line-clamp-4">
                              {stripHtmlTags(result.description)}
                            </p>
                          </div>
                          <div className="mt-2">
                            <a
                              href={result.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-500 underline"
                            >
                              Read more
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Box>
                ))}
              </Box>
            )}
          </>
        )}
      </Box>
    </NewsLayout>
  )
}

export default SearchResultsPage
