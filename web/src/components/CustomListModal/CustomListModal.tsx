import React, { useContext, useEffect, useState } from 'react'

import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { gql } from 'graphql-tag'

import { useMutation, useQuery } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import CustomThemeContext from 'src/CustomThemeContext'
import { getStatus } from 'src/utils/storage'
interface CustomListPopupProps {
  onClose: () => void
}

const CustomListPopup: React.FC<CustomListPopupProps> = ({
  onClose: closePopup,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const { toggleTheme } = React.useContext(CustomThemeContext)

  const { theme } = useContext(CustomThemeContext)
  const handleTheme = (first, second) => {
    if (theme === 1) {
      return first
    }
    return second
  }

  const handleCurrentTheme = () => {
    setEnabled(!enabled)
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
    width: '70%',
    bgcolor: '#34D399',
    boxShadow: 24,
    borderRadius: 12,
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default CustomListPopup
