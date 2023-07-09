import React, { useContext, useEffect, useState } from 'react'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined'
import CloseIcon from '@mui/icons-material/Close'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import SummarizeIcon from '@mui/icons-material/Summarize'
import { Button, IconButton } from '@mui/material'
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

interface CustomListPopupProps {
  onClose: () => void
}

const SwitchListMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const { filteredCustomLists } = useCustomList()
  const handleClickMenuList = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenuList = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)

  return (
    <Box sx={{ overflow: 'auto' }}>
      <div>
        <span className="">Switch List</span>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClickMenuList}
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
          {filteredCustomLists.map((list) => (
            <MenuItem
              key={list.id}
              selected={list.name === 'Pyxis'}
              onClick={handleCloseMenuList}
            >
              {list.name}
            </MenuItem>
          ))}
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
        try {
          await createCustomList({
            variables: {
              input: {
                name: listName,
                userId: currentUser?.id,
                articleIds: [],
              },
            },
          })
          await refetchCustomListQuery()
          toast.success(`Created New List: "${listName}"`)
          setListName('')
          handleCloseMenuList()
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
  const open = Boolean(anchorEl)

  return (
    <Box sx={{ overflow: 'auto' }}>
      <div>
        <span className="">Add List</span>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClickMenuList}
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

interface CustomList {
  id: string
  name: string
}
interface DeleteListMenuProps {
  filteredCustomLists: CustomList[]
  getCustomListIdByName?: (name: string) => number
  refetchCustomListQuery?: (
    variables?: Partial<GraphQLOperationVariables>
  ) => Promise<unknown>
}

const DeleteListMenu: React.FC<DeleteListMenuProps> = ({
  filteredCustomLists,
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedList, setSelectedList] = useState(null)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [deleteCustomList] = useMutation(DELETE_CUSTOM_LIST_MUTATION)

  const { getCustomListIdByName, refetchCustomListQuery } = useCustomList() // Move the hook call here

  const handleDeleteList = async () => {
    const customListId = getCustomListIdByName(selectedList.name)
    try {
      await deleteCustomList({
        variables: {
          id: customListId,
        },
      })
      await refetchCustomListQuery()
      console.log('Deleting list:', selectedList)
      toast.success(`Deleted List: "${selectedList.name}"`)
      handleCloseMenuList()
    } catch (error) {
      console.log(error)
    }
    setShowConfirmationModal(false)
    setAnchorEl(null)
  }

  const handleClickMenuList = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenuList = () => {
    setSelectedList(null)
    setAnchorEl(null)
  }

  return (
    <Box sx={{ overflow: 'auto' }}>
      <div>
        <span className="">Delete List</span>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={anchorEl ? 'long-menu' : undefined}
          aria-expanded={anchorEl ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClickMenuList}
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
          {filteredCustomLists.map((list) => (
            <MenuItem
              key={list.id}
              selected={list.name === 'Pyxis'}
              onClick={() => {
                setSelectedList(list)
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
          ))}
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
            {selectedList ? selectedList.name : ''}&quot;&nbsp;?
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
  const { filteredCustomLists } = useCustomList()

  const { toggleTheme } = useContext(CustomThemeContext)
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

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: '#34D399',
    boxShadow: 24,
    borderRadius: 6,
    p: 4,
  }

  return (
    <>
      {handleTheme(
        <Toaster
          toastOptions={{
            className: 'my-toast',
            duration: 3000,
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
            duration: 3000,
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
          <Box sx={style}>
            <div className="flex justify-end">
              <IconButton onClick={handleClose}>
                <CloseIcon sx={{ fontSize: '30px' }} />
              </IconButton>
            </div>
            <div className="flex items-center justify-center">
              <p className="font-['Arvo'] text-2xl font-bold">My List</p>
            </div>
            <div className="flex flex-row justify-between bg-blue-500 px-10">
              <SwitchListMenu />
              <AddListMenu />
              <DeleteListMenu
                filteredCustomLists={Array.from(filteredCustomLists)}
              />
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default CustomListPopup
