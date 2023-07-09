import React, { useContext, useEffect, useState } from 'react'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined'
import CloseIcon from '@mui/icons-material/Close'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import SummarizeIcon from '@mui/icons-material/Summarize'
import { IconButton } from '@mui/material'
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
} from 'src/components/CustomListHandler/CustomListHandler'
import CustomThemeContext from 'src/CustomThemeContext'
import { getStatus } from 'src/utils/storage'

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

const DeleteListMenu = () => {
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
        <span className="">Delete List</span>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
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
          open={open}
          onClose={handleCloseMenuList}
        >
          {filteredCustomLists.map((list) => (
            <MenuItem
              key={list.id}
              selected={list.name === 'Pyxis'}
              onClick={handleCloseMenuList}
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
    </Box>
  )
}

const CustomListPopup: React.FC<CustomListPopupProps> = ({
  onClose: closePopup,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const { toggleTheme } = useContext(CustomThemeContext)
  const { theme } = useContext(CustomThemeContext)
  const handleTheme = (first, second) => {
    if (theme === 1) {
      return first
    }
    return second
  }

  const handleCurrentTheme = () => {
    toggleTheme()
  }
  const status = getStatus()

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
            <div className="bg-blue-500 flex flex-row justify-between px-10">
              <SwitchListMenu />
              <AddListMenu />
              <DeleteListMenu />
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default CustomListPopup
