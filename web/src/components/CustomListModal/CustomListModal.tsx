import React, { useContext, useEffect, useState } from 'react'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined'
import CloseIcon from '@mui/icons-material/Close'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import SummarizeIcon from '@mui/icons-material/Summarize'
import { Button, IconButton } from '@mui/material'
import { CircularProgress } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import InputAdornment from '@mui/material/InputAdornment'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'

import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import {
  useCustomList,
  CREATE_CUSTOM_LIST_MUTATION,
  DELETE_CUSTOM_LIST_MUTATION,
} from 'src/components/CustomListHandler/CustomListHandler'
import CustomThemeContext from 'src/CustomThemeContext'

import CustomListGrid from '../CustomListGrid/CustomListGrid'

interface CustomListPopupProps {
  onClose: () => void
}

interface SwitchListMenuProps {
  filteredCustomLists: CustomList[]
  selectedList: CustomList
  setSelectedList: (list: CustomList) => void
  setToggledList: (value: boolean) => void
}

const SwitchListMenu: React.FC<SwitchListMenuProps> = ({
  filteredCustomLists,
  selectedList,
  setSelectedList,
  setToggledList,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [isToggling, setIsToggling] = useState(true)
  const { theme } = useContext(CustomThemeContext)
  const handleTheme = (first, second) => {
    if (theme === 1) {
      return first
    }
    return second
  }

  const handleClickMenuList = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenuList = () => {
    setAnchorEl(null)
  }

  const handleListSelection = (list: CustomList) => {
    if (isToggling && list != selectedList) {
      setToggledList(true)
    }

    if (list != selectedList) {
      setSelectedList(list)
    }

    setTimeout(() => {
      setIsToggling(false)
      setToggledList(false)
    }, 500)

    setTimeout(() => {
      setIsToggling(true)
    }, 500)
    handleCloseMenuList()
  }

  const open = Boolean(anchorEl)

  return (
    <Box sx={{ overflow: 'auto' }}>
      <div>
        <span className={handleTheme('text-white', 'text-black')}>
          Switch List
        </span>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClickMenuList}
          sx={{ color: handleTheme('white', null) }}
        >
          <ArrowDropDownCircleOutlinedIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenuList}
        >
          {filteredCustomLists?.length > 0 ? (
            filteredCustomLists?.map((list) => (
              <MenuItem
                key={list.id}
                selected={list === selectedList}
                onClick={() => handleListSelection(list)}
              >
                {list.name}
              </MenuItem>
            ))
          ) : (
            <MenuItem>
              <span className="text-black">You have no list</span>
            </MenuItem>
          )}
        </Menu>
      </div>
    </Box>
  )
}

const AddListMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [listName, setListName] = useState('')
  const [createCustomList] = useMutation(CREATE_CUSTOM_LIST_MUTATION)
  const { refetchCustomListQuery } = useCustomList()
  const { currentUser } = useAuth()
  const { theme } = useContext(CustomThemeContext)
  const handleTheme = (first, second) => {
    if (theme === 1) {
      return first
    }
    return second
  }

  const handleClickMenuList = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenuList = () => {
    setAnchorEl(null)
  }

  const handleFormClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation() // Stop event propagation to prevent menu closure
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
            await refetchCustomListQuery()
            toast.success(`Created New List: "${listName}"`)
            setListName('')
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
  const open = Boolean(anchorEl)

  return (
    <Box sx={{ overflow: 'auto' }}>
      <div>
        <span className={handleTheme('text-white', 'text-black')}>
          Add List
        </span>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClickMenuList}
          sx={{ color: handleTheme('white', null) }}
        >
          <AddOutlinedIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenuList}
        >
          <MenuItem key={'Add List'} onClick={handleFormClick}>
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
            </Box>
          </MenuItem>
        </Menu>
      </div>
    </Box>
  )
}

interface Article {
  id: number
  name: string
}

interface CustomList {
  id: string
  name: string
  articles: Article[]
}
interface DeleteListMenuProps {
  filteredCustomLists: CustomList[]
  selectedList: CustomList
  refreshArticles: boolean
  setRefreshArticles: (value: boolean) => void
  setSelectedList: (list: CustomList) => void
  setToggledList: (value: boolean) => void
  getCustomListIdByName?: (name: string) => number
  refetchCustomListQuery?: (
    variables?: Partial<GraphQLOperationVariables>
  ) => Promise<unknown>
}

const DeleteListMenu: React.FC<DeleteListMenuProps> = ({
  filteredCustomLists,
  getCustomListIdByName,
  refetchCustomListQuery,
  setRefreshArticles,
  refreshArticles,
  setSelectedList,
  selectedList,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedListMenu, setSelectedListMenu] = useState<CustomList | null>(
    null
  )
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [deleteCustomList] = useMutation(DELETE_CUSTOM_LIST_MUTATION)
  const currentIndex = filteredCustomLists.findIndex(
    (list) => list.id === selectedList?.id
  )
  const previousIndex = currentIndex > 0 ? currentIndex - 1 : -1

  const previousElement =
    previousIndex >= 0 ? filteredCustomLists[previousIndex] : null
  const { theme } = useContext(CustomThemeContext)
  const handleTheme = (first, second) => {
    if (theme === 1) {
      return first
    }
    return second
  }
  const handleDeleteList = async () => {
    if (selectedListMenu) {
      const customListId = getCustomListIdByName(selectedListMenu.name)
      try {
        await deleteCustomList({
          variables: {
            id: customListId,
          },
        })
        await refetchCustomListQuery()
        if (selectedList.name === selectedListMenu.name) {
          setSelectedList(
            previousElement === null ? filteredCustomLists[1] : previousElement
          )
        }
        toast.success(`Deleted List: "${selectedListMenu.name}"`)
      } catch (error) {
        console.log(error)
      }
    }

    setShowConfirmationModal(false)
    setAnchorEl(null)
  }

  const handleClickMenuList = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenuList = () => {
    setSelectedListMenu(null)
    setAnchorEl(null)
  }

  useEffect(() => {
    setTimeout(() => {
      setRefreshArticles(false)
    }, 6000)
  }, [refreshArticles, setRefreshArticles])

  return (
    <Box sx={{ overflow: 'auto' }}>
      <div>
        <span className={handleTheme('text-white', 'text-black')}>
          Delete List
        </span>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={anchorEl ? 'long-menu' : undefined}
          aria-expanded={anchorEl ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClickMenuList}
          sx={{ color: handleTheme('white', null) }}
        >
          <DeleteOutlineOutlinedIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenuList}
        >
          {filteredCustomLists.length > 0 ? (
            filteredCustomLists.map((list) => (
              <MenuItem
                key={list.id}
                selected={list.name === 'Pyxis'}
                onClick={() => {
                  setSelectedListMenu(list)
                  setShowConfirmationModal(true)
                }}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{list.name}</span>
                <RemoveCircleOutlineOutlinedIcon
                  style={{ marginLeft: '8px', fontSize: 20 }}
                />
              </MenuItem>
            ))
          ) : (
            <MenuItem>
              <span className="text-black">You have no list</span>
            </MenuItem>
          )}
        </Menu>
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
            Are you sure you want to delete &quot;
            {selectedListMenu ? selectedListMenu.name : ''}
            &quot;?
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
                handleDeleteList()
                setRefreshArticles(true)
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
    </Box>
  )
}

const CustomListPopup: React.FC<CustomListPopupProps> = ({
  onClose: closePopup,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { filteredCustomLists, getCustomListIdByName, refetchCustomListQuery } =
    useCustomList()
  const [selectedList, setSelectedList] = useState(null)
  const [toggledList, setToggledList] = useState(false)
  const [intialOpen, setInitalOpen] = useState(true)
  const [refreshArticles, setRefreshArticles] = useState(false)

  const { theme } = useContext(CustomThemeContext)
  const handleTheme = (first, second) => {
    if (theme === 1) {
      return first
    }
    return second
  }

  useEffect(() => {
    setIsOpen(true)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    closePopup()
  }

  if (intialOpen) {
    setInitalOpen(false)
  }

  useEffect(() => {
    if (filteredCustomLists?.length === 0) {
      setSelectedList(undefined)
    }
  }, [filteredCustomLists])

  useEffect(() => {
    setSelectedList(
      selectedList === null || selectedList === undefined
        ? filteredCustomLists[0]
        : selectedList
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredCustomLists[0]])

  const light_style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: '#34D399',
    boxShadow: 24,
    borderRadius: 6,
    p: 4,
    height: '80%',
  }

  const dark_style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: '#1f2937',
    boxShadow: 24,
    borderRadius: 6,
    p: 4,
    height: '80%',
  }

  return (
    <>
      {handleTheme(
        <Toaster
          toastOptions={{
            className: 'my-toast',
            duration: 2000,
            style: {
              background: '#1f2937',
              color: '#34D399',
              fontFamily: 'Arvo, sans-seri',
              fontSize: '22px',
            },
          }}
        />,
        <Toaster
          toastOptions={{
            className: 'my-toast',
            duration: 2000,
            style: {
              background: '#FAF7F6',
              color: '#34D399',
              fontFamily: 'Arvo, sans-seri',
              fontSize: '22px',
            },
          }}
        />
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box
            sx={handleTheme(dark_style, light_style)}
            className="custom-modal"
          >
            <div className="h-full">
              <div className="flex justify-end">
                <IconButton onClick={handleClose}>
                  <CloseIcon
                    sx={{ fontSize: '30px', color: handleTheme('white', null) }}
                  />
                </IconButton>
              </div>
              <div className="flex items-center justify-center">
                <p
                  className={`font-Arvo text-2xl font-bold ${handleTheme(
                    'text-white',
                    'text-black'
                  )}`}
                >
                  My List
                </p>
              </div>
              <div className="flex flex-row justify-between px-10 pt-6">
                <SwitchListMenu
                  filteredCustomLists={filteredCustomLists}
                  selectedList={selectedList}
                  setSelectedList={setSelectedList}
                  setToggledList={setToggledList}
                />
                <AddListMenu />
                <DeleteListMenu
                  filteredCustomLists={Array.from(filteredCustomLists)}
                  setToggledList={setToggledList}
                  selectedList={selectedList}
                  getCustomListIdByName={getCustomListIdByName}
                  refetchCustomListQuery={refetchCustomListQuery}
                  setRefreshArticles={setRefreshArticles}
                  refreshArticles={refreshArticles}
                  setSelectedList={setSelectedList}
                />
              </div>
              {toggledList ? (
                <div className="flex h-[70%] w-full items-center justify-center">
                  <div>
                    <CircularProgress size={200} sx={{ color: 'white' }} />
                  </div>
                </div>
              ) : (
                <div className="custom-list-container flex h-[82%] w-full justify-center overflow-auto">
                  <CustomListGrid
                    currentList={selectedList}
                    refreshArticles={refreshArticles}
                  />
                </div>
              )}
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default CustomListPopup
