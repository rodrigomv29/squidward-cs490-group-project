import React, { useState, useContext } from 'react'

import AddIcon from '@mui/icons-material/Add'
import ListIcon from '@mui/icons-material/List'
import SummarizeIcon from '@mui/icons-material/Summarize'
import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'

import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import {
  CREATE_CUSTOM_LIST_MUTATION,
  useCustomList,
  CREATE_USER_ARTICLE_MUTATION,
  useArticleLength,
} from 'src/components/CustomListHandler/CustomListHandler'
import CustomThemeContext from 'src/CustomThemeContext'

function CustomListAdder({ article }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [nestedAnchorEl, setNestedAnchorEl] =
    React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { filteredCustomLists, refetchCustomListQuery } = useCustomList()
  const [listName, setListName] = useState('')
  const [showAddListModal, setShowAddListModal] = useState(false)
  const [createCustomList] = useMutation(CREATE_CUSTOM_LIST_MUTATION)
  const [createUserArticle] = useMutation(CREATE_USER_ARTICLE_MUTATION)
  const { currentUser } = useAuth()
  const { theme } = useContext(CustomThemeContext)
  const { increaseCount } = useArticleLength()

  const handleTheme = (first, second) => {
    if (theme === 1) {
      return first
    }
    return second
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleCreateList = () => {
    setShowAddListModal(true)
    handleClose()
  }

  const handleShowLists = (event: React.MouseEvent<HTMLElement>) => {
    setNestedAnchorEl(event.currentTarget)
  }

  const handleNestedClose = () => {
    setNestedAnchorEl(null)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListName(event.target.value)
  }

  const handleKeyPressAdd = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      if (listName.trim() !== '') {
        // Check if the input name is not empty or whitespace
        const regex = /^[^a-zA-Z]/
        if (listName.length < 4) {
          toast.error('List name must be at least 4 characters long')
        } else if (regex.test(listName)) {
          toast.error('List name should start with an alphabetic character')
        } else {
          try {
            await createCustomList({
              variables: {
                input: {
                  name: listName,
                  userId: currentUser?.id,
                },
              },
            })
            increaseCount()
            await refetchCustomListQuery()
            toast.success(`Created New List: "${listName}"`)
            setListName('')
            setShowAddListModal(false) // Close the modal
          } catch (error) {
            if (
              error.graphQLErrors &&
              error.graphQLErrors.length > 0 &&
              error.graphQLErrors[0].extensions.originalError.message.includes(
                'Unique constraint failed on the fields: (`name`)'
              )
            ) {
              toast.error('List name already exists')
            } else {
              toast.error('Something went wrong: ' + error)
            }
          }
        }
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleListSelection = async (list) => {
    try {
      await createUserArticle({
        variables: {
          input: {
            customListId: list?.id,
            sourceId: article?.sourceId,
            sourceName: article?.sourceName,
            categoryId: article?.category?.id,
            author: article?.author,
            content: article?.content,
            description: article?.description,
            articleId: article?.id,
            publishedAt: article?.publishedAt,
            title: article?.title,
            url: article?.url,
            urlToImage: article?.urlToImage,
            userId: currentUser?.id,
          },
        },
      })
      await refetchCustomListQuery()
      toast.success(`Added article to list`)
      setListName('')
      increaseCount()
      setShowAddListModal(false) // Close the modal
    } catch (error) {
      if (
        error.graphQLErrors &&
        error.graphQLErrors.length > 0 &&
        error.graphQLErrors[0].extensions.originalError.message.includes(
          'Unique constraint failed on the fields: (`customListId`,`articleId`)'
        )
      ) {
        toast.error('Article already exists in list')
      } else {
        toast.error('Something went wrong: ' + error)
      }
    }
  }

  const handleModalClose = () => {
    setListName('')
    setShowAddListModal(false)
  }

  return (
    <div>
      {handleTheme(
        <Toaster
          toastOptions={{
            duration: 3000,
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
            duration: 3000,
            style: {
              background: '#FAF7F6',
              color: '#34D399',
              fontFamily: 'Arvo, sans-serif',
              fontSize: '22px',
            },
          }}
        />
      )}
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AddIcon sx={{ fontSize: 25, color: handleTheme('white', null) }} />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleCreateList}>
          <AddIcon />
          Create a new list
        </MenuItem>
        <MenuItem onClick={handleShowLists}>
          <ListIcon />
          Add article to list
        </MenuItem>
      </Menu>

      <Menu
        id="nested-menu"
        anchorEl={nestedAnchorEl}
        open={Boolean(nestedAnchorEl)}
        onClose={handleNestedClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {filteredCustomLists?.map((list) => (
          <MenuItem
            key={list.id}
            onClick={() => handleListSelection(list)}
            sx={{ justifyContent: 'space-between' }}
          >
            {list.name}
            <AddIcon />
          </MenuItem>
        ))}
        {filteredCustomLists?.length === 0 && (
          <MenuItem disabled>No custom lists</MenuItem>
        )}
      </Menu>

      <Modal open={showAddListModal} onClose={handleModalClose}>
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
          <Box sx={{ '& > :not(style)': { m: 1 } }} className="flex flex-col">
            <TextField
              id=""
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SummarizeIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
              placeholder="Name of List"
              value={listName}
              onChange={handleInputChange}
              onKeyDown={handleKeyPressAdd}
            />
            <div className="flex w-full justify-center">
              <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>
                Press Enter to create a new list
              </p>
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default CustomListAdder
