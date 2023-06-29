import * as React from 'react'
import { useState } from 'react'

import { Switch } from '@chakra-ui/react'
import Logout from '@mui/icons-material/Logout'
import Settings from '@mui/icons-material/Settings'
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material'

import { navigate, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import { setStatus, getStatus } from 'src/utils/storage'

import CustomThemeContext from '../../CustomThemeContext'
import SettingsPopup from '../Settings/SettingsPopup'

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [enabled, setEnabled] = useState(false)
  const { currentUser, logOut } = useAuth()
  const open = Boolean(anchorEl)
  const status = getStatus()
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const [settingsOpen, setSettingsOpen] = useState(false)

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    const clickedInsideMenu = Boolean(
      anchorEl?.contains(event.target as HTMLElement)
    )
    if (!clickedInsideMenu) {
      setAnchorEl(null)
    }
  }

  const { theme, toggleTheme } = React.useContext(CustomThemeContext)

  const handleLogout = (event: React.MouseEvent<HTMLElement>) => {
    logOut()
    setStatus(0)
    navigate(routes.home()) // Redirect to home page after signing out
    handleClose(event)
    if (theme === 1) {
      toggleTheme()
    }
  }

  const handleOpenSettings = () => {
    if (!settingsOpen) {
      setSettingsOpen(true)
    }
  }

  const handleTheme = () => {
    setEnabled(!enabled)
    toggleTheme()
  }

  const backgroundColor = theme === 1 ? '#4b5563' : '#FFFFFF'
  const themeColor = theme === 1 ? '#FFFFFF' : '#000000'
  const iconColor = theme === 1 ? '#111827' : '#34d399'

  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {theme === 1 ? (
          <Typography sx={{ minWidth: 100, color: 'white' }}>
            <span className="font-['Arvo'] text-xl">My Account</span>
          </Typography>
        ) : (
          <Typography sx={{ minWidth: 100, color: 'black' }}>
            <span className="font-['Arvo'] text-xl">My Account</span>
          </Typography>
        )}
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2, 'font-family': 'Arvo' }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              sx={{ width: 64, height: 64, bgcolor: iconColor }}
              className="uppercase"
            >
              {currentUser && currentUser.email[0]}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            backgroundColor: { backgroundColor },
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 170,
              height: 160,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <div className="flex items-center justify-center">
          <div className="">
            <Avatar sx={{ bgcolor: iconColor }} className="uppercase">
              <span className="font-['Arvo'] text-3xl font-bold">
                {currentUser && currentUser.email[0]}
              </span>
            </Avatar>
          </div>
          <span
            className={`px-6 font-['Arvo'] text-3xl font-bold transition-colors duration-200 ${
              theme === 1 ? 'text-white' : 'text-black'
            }`}
          >
            {currentUser && currentUser.email}
          </span>{' '}
        </div>
        <div className="theme-switch flex items-center justify-center px-4 py-4">
          <span
            className={`mx-8 text-xl font-bold shadow transition-colors duration-200 ${
              theme === 1 ? 'text-white' : 'text-black'
            }`}
          >
            {theme === 1 && status === 1 ? 'Dark Theme' : 'Light Theme'}
          </span>
          <Switch
            checked={true}
            onChange={handleTheme}
            className={`${
              theme === 1 && status === 1 ? 'bg-emerald-400' : 'bg-gray-200'
            } transition-color relative mx-6 inline-flex h-6 w-11 items-center rounded-full duration-200`}
          >
            <span
              className={`${
                theme === 1 ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
        <div className="flex justify-center">
          <MenuItem onClick={handleOpenSettings} className="w-full">
            <ListItemIcon>
              <Settings fontSize="small" sx={{ color: themeColor }} />
            </ListItemIcon>
            <span
              className={`py-2 font-['Arvo'] text-xl font-bold transition-colors duration-200 ${
                theme === 1 ? 'text-white' : 'text-black'
              }`}
            >
              Settings
            </span>
          </MenuItem>
        </div>
        <div className="flex justify-center">
          <MenuItem onClick={handleLogout} className="w-full">
            <ListItemIcon>
              <Logout fontSize="small" sx={{ color: themeColor }} />
            </ListItemIcon>
            <span
              className={`py-2 font-['Arvo'] text-xl font-bold transition-colors duration-200 ${
                theme === 1 ? 'text-white' : 'text-black'
              }`}
            >
              Logout
            </span>
          </MenuItem>
        </div>
      </Menu>
      {settingsOpen && (
        <SettingsPopup
          onClose={() => setSettingsOpen(false)}
          userId={currentUser?.id}
        />
      )}
    </React.Fragment>
  )
}
