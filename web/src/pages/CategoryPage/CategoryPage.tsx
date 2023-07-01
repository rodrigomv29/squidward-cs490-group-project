// import { Link, routes } from '@redwoodjs/router'

import React, { useEffect, useState, useContext } from 'react'

// import { Link, routes } from '@redwoodjs/router'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Box, IconButton } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

import { MetaTags } from '@redwoodjs/web'

import Footer from 'src/components/Footer/Footer'
import TopNewsByCategory from 'src/components/TopNewsByCategory/TopNewsByCategory'
import CurrentPageContext from 'src/CurrentPageContext'
import CustomThemeContext from 'src/CustomThemeContext'
import { getArticles, getLatest, isHomePage } from 'src/utils/storage'

import ArticleGrid from '../../components/ArticleGrid/ArticleGrid'
import SlidingPanel from '../../components/SlidingPanel/SlidingPanel'

const CategoryPage = (categoryObject) => {
  const { toggleCurrentPage } = useContext(CurrentPageContext)
  toggleCurrentPage(categoryObject.category)
  isHomePage(0)
  async function fetchArticles(category) {
    try {
      const articles = await getArticles(category)
      return articles
    } catch (error) {
      console.log('Error fetching description article for categories:', error)
      throw error
    }
  }

  async function fetchLatest(category) {
    try {
      const articles = await getLatest(category)
      return articles
    } catch (error) {
      console.log('Error fetching description article for categories:', error)
      throw error
    }
  }

  const category = categoryObject.category
  localStorage.setItem('currentPage', category)

  const [articles, setArticles] = useState([])
  const [latest, setLatest] = useState([])
  const [refreshToggle, setRefreshToggle] = useState(true)

  const { theme } = useContext(CustomThemeContext)

  const handleTheme = (firstArg, secondArg) => {
    return theme === 1 ? firstArg : secondArg
  }

  const handleRefreshClick = () => {
    setRefreshToggle(false)
    setTimeout(() => {
      setRefreshToggle(true)
    }, 800)
  }

  // Use effect to control api fetching
  useEffect(() => {
    fetchArticles(category)
      .then((articles) => {
        setArticles(articles)
      })
      .catch((error) => {
        console.log('Error fetching descriptions:', error)
      })

    const interval = setInterval(() => {
      fetchArticles(category)
        .then((articles) => {
          setArticles(articles)
        })
        .catch((error) => {
          console.log('Error fetching descriptions:', error)
        })
    }, 3600000) // 1 hour in milliseconds

    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchLatest(category)
      .then((articles) => {
        setLatest(articles)
      })
      .catch((error) => {
        console.log('Error fetching descriptions:', error)
      })

    const interval = setInterval(() => {
      fetchLatest(category)
        .then((articles) => {
          setLatest(articles)
        })
        .catch((error) => {
          console.log('Error fetching descriptions:', error)
        })
    }, 3600000) // 1 hour in milliseconds

    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])

  // Test Data to use if the api is not working

  // const fillerData = [
  //   {
  //     id: 1,
  //     title:
  //       'Item 1 fhdasufhiusdbifubsdiugfiusdhfoihsdohguhsdifhosdihfoiusdhiofhsdoifhusdhoushdpifhgosfdu',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //     image:
  //       'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  //     sourceName: 'CNN',
  //     publishedAt: '2023-06-01',
  //     category: 'Category 1',
  //   },
  //   {
  //     id: 2,
  //     title: 'Item 2',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //     image:
  //       'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  //     sourceName: 'CNN',
  //     publishedAt: '2023-06-01',
  //     category: 'Category 2',
  //   },
  //   {
  //     id: 3,
  //     title: 'Item 3',
  //     description:
  //       'Pellentesque commodo arcu ac libero consequat efficitur.;fugfbuifdhbgudg  dfiughdfbguibdf gdifhgd fgnouihfid gfdihgduong fdhignmbnbmnbmnbmnbmbnmbnmbn',
  //     image:
  //       'https://images.unsplash.com/photo-1536782376847-5c9d14d97cc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJlZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  //     sourceName: 'CNN',
  //     publishedAt: '2023-06-02',
  //     category: 'Category 3',
  //   },
  //   {
  //     id: 4,
  //     title: 'Item 4',
  //     description: 'Pellentesque commodo arcu ac libero consequat efficitur.',
  //     image:
  //       'https://media.istockphoto.com/id/1439993254/photo/happy-little-african-american-girl-blowing-a-flower-in-outside-cheerful-child-having-fun.webp?b=1&s=170667a&w=0&k=20&c=T6mLJamQQg1Myb96cGs5XSbegGYGUjysSxBld9vsY00=',
  //     sourceName: 'CNN',
  //     publishedAt: '2023-06-02',
  //     category: 'Category 4',
  //   },
  //   {
  //     id: 5,
  //     title: 'Item 5',
  //     description:
  //       'Pellentesque commodo arcu ac libero consequat efficitur. fdhuigb sd n fiobdsiub foidsif oisdhuifhsidhgiusfhjpdiwsgfojdopshofinsdpohfodsm[opfjhoisdnfpowshouf',
  //     image:
  //       'https://images.unsplash.com/photo-1453060590797-2d5f419b54cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZyZWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  //     sourceName: 'CNN',
  //     publishedAt: '2023-06-02',
  //     category: 'Category 5',
  //   },
  //   {
  //     id: 6,
  //     title: 'Item 6',
  //     description:
  //       'Pellentesque commodo arcu ac libero consequat efficitur. fhuisdgvidsfiydn ;osgfinsbiuf bsodihgfilun;saog;dfjsi ohfdosdbuibsdgufbsou',
  //     image:
  //       'https://media.istockphoto.com/id/1439993254/photo/happy-little-african-american-girl-blowing-a-flower-in-outside-cheerful-child-having-fun.webp?b=1&s=170667a&w=0&k=20&c=T6mLJamQQg1Myb96cGs5XSbegGYGUjysSxBld9vsY00=',
  //     sourceName: 'CNN',
  //     publishedAt: '2023-06-02',
  //     category: 'Category 6',
  //   },
  //   {
  //     id: 7,
  //     title: 'Item 7',
  //     description: 'Pellentesque commodo arcu ac libero consequat efficitur.',
  //     image:
  //       'https://media.istockphoto.com/id/1439993254/photo/happy-little-african-american-girl-blowing-a-flower-in-outside-cheerful-child-having-fun.webp?b=1&s=170667a&w=0&k=20&c=T6mLJamQQg1Myb96cGs5XSbegGYGUjysSxBld9vsY00=',
  //     sourceName: 'CNN',
  //     publishedAt: '2023-06-02',
  //     category: 'Category 8',
  //   },
  //   {
  //     id: 8,
  //     title: 'Item 8',
  //     description: 'Pellentesque commodo arcu ac libero consequat efficitur.',
  //     image:
  //       'https://images.unsplash.com/photo-1453060590797-2d5f419b54cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZyZWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  //     sourceName: 'CNN',
  //     publishedAt: '2023-06-02',
  //     category: 'Category 8',
  //   },
  //   {
  //     id: 9,
  //     title: 'Item 9',
  //     description: 'Pellentesque commodo arcu ac libero consequat efficitur.',
  //     image:
  //       'https://images.unsplash.com/photo-1504194104404-433180773017?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZyZWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  //     sourceName: 'CNN',
  //     publishedAt: '2023-06-02',
  //     category: 'Category 9',
  //   },
  //   {
  //     id: 10,
  //     title: 'Item 10',
  //     description: 'Pellentesque commodo arcu ac libero consequat efficitur.',
  //     image:
  //       'https://images.unsplash.com/photo-1504194104404-433180773017?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZyZWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  //     sourceName: 'CNN',
  //     publishedAt: '2023-06-02',
  //     category: 'Category 10',
  //   },
  //   {
  //     id: 11,
  //     title: 'Item 11',
  //     description: 'Pellentesque commodo arcu ac libero consequat efficitur.',
  //     image:
  //       'https://media.istockphoto.com/id/1410940641/photo/summer-the-official-happy-season.webp?b=1&s=170667a&w=0&k=20&c=81J-RLgv_mEB6OXohMvSQGH6loSmUt_armRRfHY5S2M=',
  //     sourceName: 'CNN',
  //     publishedAt: '2023-06-02',
  //     category: 'Category 11',
  //   },
  //   {
  //     id: 12,
  //     title: 'Item 12',
  //     description: 'Pellentesque commodo arcu ac libero consequat efficitur.',
  //     image:
  //       'https://images.unsplash.com/photo-1504194104404-433180773017?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZyZWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  //     sourceName: 'CNN',
  //     publishedAt: '2023-06-02',
  //     category: 'Category 12',
  //   },
  //   {
  //     id: 13,
  //     title: 'Item 13',
  //     description: 'Pellentesque commodo arcu ac libero consequat efficitur.',
  //     image:
  //       'https://images.unsplash.com/photo-1453060590797-2d5f419b54cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZyZWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  //     sourceName: 'CNN',
  //     publishedAt: '2023-06-02',
  //     category: 'Category 13',
  //   },
  //   {
  //     id: 14,
  //     title: 'Item 14',
  //     description: 'Pellentesque commodo arcu ac libero consequat efficitur.',
  //     image:
  //       'https://media.istockphoto.com/id/1410940641/photo/summer-the-official-happy-season.webp?b=1&s=170667a&w=0&k=20&c=81J-RLgv_mEB6OXohMvSQGH6loSmUt_armRRfHY5S2M=',
  //     sourceName: 'CNN',
  //     publishedAt: '2023-06-02',
  //     category: 'Category 14',
  //   },
  //   {
  //     id: 15,
  //     title: 'Item 15',
  //     description: 'Pellentesque commodo arcu ac libero consequat efficitur.',
  //     image:
  //       'https://media.istockphoto.com/id/1408141366/photo/young-woman-hand-reaching-for-the-mountains-during-sunset-and-beautiful-landscape.webp?b=1&s=170667a&w=0&k=20&c=cotKEKYAJTUCOqghQ7UbBmU4XlAEXTSzI6qvdzPdrF4=',
  //     sourceName: 'CNN',
  //     publishedAt: '2023-06-02',
  //     category: 'Category 15',
  //   },
  //   {
  //     id: 16,
  //     title: 'Item 16',
  //     description: 'Pellentesque commodo arcu ac libero consequat efficitur.',
  //     image:
  //       'https://media.istockphoto.com/id/1408141366/photo/young-woman-hand-reaching-for-the-mountains-during-sunset-and-beautiful-landscape.webp?b=1&s=170667a&w=0&k=20&c=cotKEKYAJTUCOqghQ7UbBmU4XlAEXTSzI6qvdzPdrF4=',
  //     sourceName: 'CNN',
  //     publishedAt: '2023-06-02',
  //     category: 'Category 16',
  //   },
  //   {
  //     id: 17,
  //     title: 'Item 17',
  //     description: 'Pellentesque commodo arcu ac libero consequat efficitur.',
  //     image:
  //       'https://media.istockphoto.com/id/1410940641/photo/summer-the-official-happy-season.webp?b=1&s=170667a&w=0&k=20&c=81J-RLgv_mEB6OXohMvSQGH6loSmUt_armRRfHY5S2M=',
  //     sourceName: 'CNN',
  //     publishedAt: '2023-06-02',
  //     category: 'Category 17',
  //   },
  //   {
  //     id: 18,
  //     title: 'Item 18',
  //     description: 'Pellentesque commodo arcu ac libero consequat efficitur.',
  //     image:
  //       'https://media.istockphoto.com/id/1408141366/photo/young-woman-hand-reaching-for-the-mountains-during-sunset-and-beautiful-landscape.webp?b=1&s=170667a&w=0&k=20&c=cotKEKYAJTUCOqghQ7UbBmU4XlAEXTSzI6qvdzPdrF4=',
  //     sourceName: 'CNN',
  //     publishedAt: '2023-06-02',
  //     category: 'Category 18',
  //   },
  //   //, Add more items with respective properties...
  // ]

  return (
    <>
      <MetaTags
        title={category.slice(0, 1).toUpperCase() + category.slice(1)}
        description="Category page"
      />
      <div
        className={`main-container h-screen max-h-screen w-full max-w-full transition-colors duration-300 ${handleTheme(
          'bg-gray-700',
          'bg-white'
        )}`}
      >
        <div className="main-header-contianer flex h-2/3 justify-center">
          <div className="slding-pannel-containe my-10  w-2/3">
            <p
              className={`flex justify-center px-4 text-4xl font-extrabold uppercase ${handleTheme(
                'text-white',
                'text-black'
              )}`}
            >
              top 10 today
            </p>
            <SlidingPanel />
          </div>
          <div className="top-news-container mx-4 w-1/3  justify-center">
            <div
              className={`Header my-6 flex w-full justify-center rounded-lg py-2 text-2xl font-semibold uppercase transition-colors duration-200 ${handleTheme(
                'bg-gray-900 text-white',
                'bg-emerald-400 text-black'
              )}`}
            >
              {category}
            </div>
            <div className="category-list-container max-h-1/3 flex h-[79.9%] flex-col justify-start overflow-auto">
              <TopNewsByCategory articles={articles} />
            </div>
          </div>
        </div>
        <div
          className={`main-content colors flex h-[90%] w-full pb-10 transition duration-200 ${handleTheme(
            'bg-gray-700',
            'bg-white'
          )}`}
          style={{ marginTop: '-50px' }}
        >
          <div className="latest-news-container w-[100%]">
            <div className="h-full w-full px-10">
              <div className="title-refresh-container flex justify-between">
                <h2
                  className={`flex items-center text-4xl font-bold ${handleTheme(
                    'text-emerald-400',
                    'text-black'
                  )}`}
                >
                  Latest News in&nbsp;
                  <span className="uppercase">{category.slice(0, 1)}</span>
                  {category.slice(1)}
                </h2>
                <span style={{ cursor: 'not-allowed' }}>
                  <div className="mt-8 flex items-center">
                    <span
                      className={`text-xl font-bold ${handleTheme(
                        'text-white',
                        'text-gray-500'
                      )}`}
                    >
                      Refresh Articles
                    </span>
                    {handleTheme(
                      <IconButton
                        aria-label="delete"
                        size="large"
                        sx={{
                          width: 70,
                          height: 70,
                          color: 'white',
                        }}
                        onClick={handleRefreshClick}
                      >
                        <RefreshIcon fontSize="inherit" />
                      </IconButton>,
                      <IconButton
                        aria-label="delete"
                        size="large"
                        sx={{
                          width: 70,
                          height: 70,
                          color: 'black',
                        }}
                        onClick={handleRefreshClick}
                      >
                        <RefreshIcon fontSize="inherit" />
                      </IconButton>
                    )}
                  </div>
                </span>
              </div>
              <div className="category-grid-container h-[90%]">
                {refreshToggle ? (
                  <ArticleGrid items={latest} itemsPerPage={6} />
                ) : (
                  <div className="h-[80%]">
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '100%',
                        alignItems: 'center',
                        color: '#34D399',
                      }}
                    >
                      <CircularProgress size={300} sx={{ color: '#34D399' }} />
                    </Box>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default CategoryPage
