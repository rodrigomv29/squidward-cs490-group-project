import React, { useEffect, useState } from 'react'
import { useContext } from 'react'

import { IconButton } from '@chakra-ui/react'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, CircularProgress, Modal } from '@mui/material'

import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import {
  DELETE_USER_ARTICLE_MUTATION,
  useCustomList,
} from 'src/components/CustomListHandler/CustomListHandler'
import CustomThemeContext from 'src/CustomThemeContext'

function CustomListGrid({ currentList, refreshArticles }) {
  const articleIds = currentList?.articles
  const [deleteUserArticle] = useMutation(DELETE_USER_ARTICLE_MUTATION)
  const [refresh, setRefresh] = useState(false)
  const { refetchCustomListQuery } = useCustomList()
  const [userArticles, setUserArticles] = useState(currentList?.articles)
  const [getArticles, setGetArticles] = useState(false)
  const [currentListUser, setCurrentListUser] = useState(currentList)
  const [firstSwitch, setFirstSwitch] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [selectedArticleId, setSelectedArticleId] = useState(null)

  useEffect(() => {
    if (refresh) {
      refetchCustomListQuery().then((data) => {
        const list = data.data.customLists
        const updatedList = list.find(
          (eachList) => eachList.name === currentList.name
        )

        setTimeout(() => {
          setCurrentListUser(updatedList)
          setFirstSwitch(true)
        }, 1000)

        setTimeout(() => {
          setRefresh(false)
        }, 1000)

        if (updatedList && updatedList.articles) {
          setGetArticles(true)
        }
      })
    }
  }, [refresh, refetchCustomListQuery, currentList?.name])

  useEffect(() => {
    setUserArticles(currentList?.articles)
    setGetArticles(false)
  }, [getArticles, currentList])

  const handleDeleteList = async (id) => {
    try {
      setRefresh(true)
      await deleteUserArticle({
        variables: {
          id: id,
        },
      })
      setCurrentListUser((prevList) => ({
        articles: prevList?.articles?.filter((article) => article?.id !== id),
      }))
      toast.success(`Removed Article from List`)
    } catch (error) {
      console.log(error)
    }
  }

  const { theme } = useContext(CustomThemeContext)
  const handleTheme = (first, second) => {
    if (theme === 1) {
      return first
    }
    return second
  }

  if (refresh || refreshArticles) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: '100%',
          alignItems: 'center',
          color: '#34D399',
        }}
      >
        <CircularProgress size={200} sx={{ color: 'white' }} />
      </Box>
    )
  }

  if (
    (currentList != undefined &&
      currentList?.articles?.length === 0 &&
      currentList?.articles?.length === articleIds?.length) ||
    (currentListUser?.articles?.length === 0 &&
      currentListUser != undefined &&
      currentListUser?.articles?.length === articleIds?.length)
  ) {
    return (
      <div className="flex h-[100%] w-full flex-col items-center justify-center text-center">
        {currentList || currentListUser ? (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <span
              className={`py-2 text-lg font-bold ${handleTheme(
                'text-emerald-400',
                'text-black'
              )}`}
            >
              {currentList ? currentList?.name : currentListUser?.name}
            </span>
            <div className="flex flex-1 flex-col items-center justify-center ">
              <div className="w-full text-center">
                <span
                  className={`text-xl font-bold ${handleTheme(
                    'text-white',
                    'text-black'
                  )}`}
                >
                  You dont have any articles in this list
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    )
  } else if (currentList === undefined) {
    return (
      <div className="flex h-[100%] w-full flex-col items-center justify-center text-center">
        <div className="flex flex-1 flex-col items-center justify-center ">
          <div className="w-full text-center">
            <span
              className={`text-xl font-bold ${handleTheme(
                'text-white',
                'text-black'
              )}`}
            >
              You dont have any list,&nbsp;&nbsp;Add some by clicking add list
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={`grid-container h-[95%] w-full overflow-auto px-4 py-8`}>
        {handleTheme(
          <Toaster
            toastOptions={{
              duration: 1500,
              style: {
                background: '#1f2937',
                color: '#34D399',
                fontFamily: 'Arvo, sans-serif',
                fontSize: '22px',
              },
            }}
          />,
          <Toaster
            toastOptions={{
              duration: 1500,
              style: {
                background: '#FAF7F6',
                color: '#34D399',
                fontFamily: 'Arvo, sans-serif',
                fontSize: '22px',
              },
            }}
          />
        )}
        <div className="text-center">
          <p
            className={`pb-4 text-2xl font-bold ${handleTheme(
              'text-emerald-400',
              'text-black'
            )}`}
          >
            {currentList?.name}
          </p>
        </div>
        <div
          className={`category-grid ${handleTheme(
            'text-white',
            'text-gray-800'
          )} grid
          h-[75%]
          w-full
          max-w-full
          grid-cols-3 items-center justify-center
        gap-4`}
        >
          {userArticles?.length === articleIds?.length &&
          userArticles?.length != 0 &&
          currentList != null &&
          !firstSwitch ? (
            userArticles?.map((article, index) => (
              <div key={article?.id} className="font-bold">
                <a
                  href={article?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                  className="category-box lg:max-w-400 max-h-400 md:max-w-300 max-h-300 sm:max-w-200 max-h-200 flex flex-col items-center justify-start rounded-lg text-center"
                >
                  <div className="w-full">
                    <div className="container sm:h-[8rem] md:h-[10rem] lg:h-[12rem]">
                      <div className="image-container h-full w-full">
                        <img
                          src={article?.urlToImage}
                          alt={article?.title}
                          className="category-image h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="description-container my-2 h-[50%] max-w-full overflow-hidden px-2">
                    <p
                      className={`category-description text-md font-semibold transition-colors duration-200 hover:underline ${
                        theme === 1 ? 'text-white' : 'text-gray-800'
                      }  `}
                    >
                      {article?.description != ''
                        ? article?.description?.length > 110
                          ? article?.description?.slice(0, 110) + '...'
                          : article?.description
                          ? article?.description
                          : article?.content
                          ? article?.content
                          : 'This article does not have a description or content'
                        : ''}
                    </p>
                  </div>
                  <div className="category-source-info flex w-full max-w-full justify-center">
                    <div className="content-container flex w-full max-w-sm items-center justify-center space-x-6 py-2 sm:flex">
                      <span
                        className={`flex flex-row text-sm font-bold ${handleTheme(
                          'text-white',
                          'text-black'
                        )}`}
                      >
                        {article?.publishedAt?.slice(5, 7)}-
                        {article?.publishedAt?.slice(8, 10)}-
                        {article?.publishedAt?.slice(0, 4)}&nbsp;at&nbsp;
                        {article?.publishedAt?.slice(
                          article?.publishedAt?.indexOf('T') + 1,
                          article?.publishedAt?.length - 5
                        )}
                      </span>
                      <span
                        className={` font-bold ${
                          theme === 1 ? 'text-white' : 'text-gray-600'
                        }`}
                      >
                        {article?.sourceName}
                      </span>
                    </div>
                  </div>
                </a>
                <div className="flex w-full justify-end">
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-haspopup="true"
                    onClick={() => {
                      setSelectedArticleId(article.id)
                      setShowConfirmationModal(true)
                    }}
                    className="relative right-[-15px] top-[-35px]"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            ))
          ) : currentList?.articles?.length === 0 ? (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <div className="flex flex-1 flex-col items-center justify-center ">
                <div className="w-full text-center">
                  <span
                    className={`text-xl font-bold ${handleTheme(
                      'text-white',
                      'text-black'
                    )}`}
                  >
                    You dont have any articles in this list
                  </span>
                </div>
              </div>
            </div>
          ) : null}
          {userArticles?.length === 0 && currentList != null ? (
            <div className="flex h-[50%] w-full items-center  text-center">
              <div className={`w-full  text-center`}>
                <span
                  className={`text-xl font-bold ${handleTheme(
                    'text-white',
                    'text-black'
                  )}`}
                ></span>
              </div>
            </div>
          ) : currentListUser != undefined && firstSwitch ? (
            currentListUser.articles?.map((article, index) => (
              <div key={article?.id} className="font-bold">
                <a
                  href={article?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                  className="category-box lg:max-w-400 max-h-400 md:max-w-300 max-h-300 sm:max-w-200 max-h-200 flex flex-col items-center justify-start rounded-lg text-center"
                >
                  <div className="w-full">
                    <div className="container sm:h-[8rem] md:h-[10rem] lg:h-[12rem]">
                      <div className="image-container h-full w-full">
                        <img
                          src={article?.urlToImage}
                          alt={article?.title}
                          className="category-image h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="description-container my-2 h-[50%] max-w-full overflow-hidden px-2">
                    <p
                      className={`category-description text-md font-semibold transition-colors duration-200 hover:underline ${
                        theme === 1 ? 'text-white' : 'text-gray-800'
                      }  `}
                    >
                      {article?.description != ''
                        ? article?.description?.length > 110
                          ? article?.description?.slice(0, 110) + '...'
                          : article?.description
                          ? article?.description
                          : article?.content
                          ? article?.content
                          : 'This article does not have a description or content'
                        : ''}
                    </p>
                  </div>
                  <div className="category-source-info flex w-full max-w-full justify-center">
                    <div className="content-container flex w-full max-w-sm items-center justify-center space-x-6 py-2 sm:flex">
                      <span className="flex flex-row text-sm font-bold text-gray-400">
                        {article?.publishedAt?.slice(5, 7)}-
                        {article?.publishedAt?.slice(8, 10)}-
                        {article?.publishedAt?.slice(0, 4)}&nbsp;at&nbsp;
                        {article?.publishedAt?.slice(
                          article?.publishedAt?.indexOf('T') + 1,
                          article?.publishedAt?.length - 5
                        )}
                      </span>
                      <span
                        className={` font-bold ${
                          theme === 1 ? 'text-white' : 'text-gray-600'
                        }`}
                      >
                        {article?.sourceName}
                      </span>
                    </div>
                  </div>
                </a>
                <div className="flex w-full justify-end">
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-haspopup="true"
                    onClick={() => {
                      setSelectedArticleId(article.id)
                      setShowConfirmationModal(true)
                    }}
                    className="relative right-[-15px] top-[-35px]"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            ))
          ) : userArticles?.length === 0 && currentList != null ? (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <div className="flex flex-1 flex-col items-center justify-center ">
                <div className="w-full text-center">
                  <span
                    className={`text-xl font-bold ${handleTheme(
                      'text-white',
                      'text-black'
                    )}`}
                  >
                    You dont have any articles in this list
                  </span>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <Modal
          open={showConfirmationModal}
          onClose={() => setShowConfirmationModal(false)}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <h3 className="font-['Arvo'] text-lg font-bold">
              Are you sure you want to delete this article&nbsp;?
            </h3>
            <div className="flex justify-center space-x-2 py-4">
              <Button
                variant="contained"
                onClick={() => setShowConfirmationModal(false)}
                sx={{
                  backgroundColor: 'blue',
                  width: 100,
                  color: 'white',
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleDeleteList(selectedArticleId)
                  setShowConfirmationModal(false)
                }}
                sx={{
                  backgroundColor: 'red',
                  width: 100,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'lightcoral', // Replace with your desired lighter shade of red
                  },
                }}
              >
                Confirm
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  )
}

export default CustomListGrid
