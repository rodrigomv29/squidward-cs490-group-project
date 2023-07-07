import React, { useContext, useEffect, useState } from 'react'

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
} from '@chakra-ui/react'
import { Switch } from '@chakra-ui/react'
import { gql } from 'graphql-tag'

import { useMutation, useQuery } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import CustomThemeContext from 'src/CustomThemeContext'
import { getStatus } from 'src/utils/storage'

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      general
      business
      entertainment
      health
      science
      sports
      technology
    }
  }
`

const GET_USER_QUERY = gql`
  query GetUserQuery($id: Int!) {
    user(id: $id) {
      id
      general
      business
      entertainment
      health
      science
      sports
      technology
    }
  }
`

interface SettingsPopupProps {
  onClose: () => void
  userId: number
}

const SettingsPopup: React.FC<SettingsPopupProps> = ({
  onClose: closePopup,
  userId,
}) => {
  const [elements, setElements] = useState<
    { id: number; name: string; enabled: boolean }[]
  >([])
  const [isOpen, setIsOpen] = useState(false)
  const [updateUser] = useMutation(UPDATE_USER_MUTATION)
  const [enabled, setEnabled] = useState(false)
  const { toggleTheme } = React.useContext(CustomThemeContext)
  const { data, loading } = useQuery(GET_USER_QUERY, {
    variables: { id: userId },
  })

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
    if (!loading && data && data.user) {
      const {
        general,
        business,
        entertainment,
        health,
        science,
        sports,
        technology,
      } = data.user
      setElements([
        { id: 1, name: 'General', enabled: general },
        { id: 2, name: 'Business', enabled: business },
        { id: 3, name: 'Entertainment', enabled: entertainment },
        { id: 4, name: 'Health', enabled: health },
        { id: 5, name: 'Science', enabled: science },
        { id: 6, name: 'Sports', enabled: sports },
        { id: 7, name: 'Technology', enabled: technology },
      ])
    }
    setIsOpen(true)
  }, [data, loading])

  const toggleElement = (id: number) => {
    setElements((prevElements) =>
      prevElements.map((element) =>
        element.id === id ? { ...element, enabled: !element.enabled } : element
      )
    )
  }

  const handleClose = () => {
    setIsOpen(false)
    closePopup()
  }

  const handleSave = async () => {
    const noElementsSelected = elements.every((element) => !element.enabled)
    if (noElementsSelected) {
      toast.error('At least one category needs to be selected.')
    } else {
      const updatedSettings = elements.reduce((acc, element) => {
        acc[element.name.toLowerCase()] = element.enabled
        return acc
      }, {})

      await updateUser({
        variables: { id: userId, input: updatedSettings },
      })

      handleClose()
    }
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
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyItems="center"
          alignSelf="center"
          justifySelf="center"
          //className="bg-emerald-400 bg-opacity-70"
          w="full"
          bg="rgba(0, 0, 0, 0.5)" // Semi-transparent background
          backdropFilter="blur(5px)" // Blur effect
          h="full"
          justifyContent="center"
          fontFamily="Arvo"
        >
          <ModalHeader
            fontSize="xl"
            bg="#ad902c"
            py={2}
            textAlign="center"
            //color="white"
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            w="35%"
          >
            <div className="flex w-full flex-row justify-between px-10">
              <div className="">
                <span className="text-lg font-bold">Settings</span>
              </div>
              <div className="flex items-center">
                <ModalCloseButton size={'md'} />
              </div>
            </div>
          </ModalHeader>
          <ModalBody
            display="flex"
            flexDirection="column"
            justifyContent="center"
            className="bg-emerald-400 bg-opacity-80"
            w="35%"
          >
            <div>
              <VStack
                spacing={6}
                align="start"
                fontSize="md"
                fontWeight=""
                padding={4}
              >
                {elements.map((element) => (
                  <div key={element.id}>
                    <label htmlFor={`checkbox-${element.id}`}>
                      <div className="flex flex-row px-4">
                        <div className="px-2">
                          <input
                            type="checkbox"
                            checked={element.enabled}
                            onChange={() => toggleElement(element.id)}
                          />
                        </div>
                        <div className="text-lg font-semibold text-gray-800">
                          {element.name}
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </VStack>
              <div className="theme-switch flex items-center justify-center px-4 py-4">
                <span
                  className={`mx-8 text-xl font-bold shadow transition-colors duration-200 ${
                    theme === 1 ? 'text-white' : 'text-black'
                  }`}
                >
                  {theme === 1 && status === 1 ? 'Dark Theme' : 'Light Theme'}
                </span>
                {theme === 1 && status === 1 ? (
                  <Switch
                    checked={true}
                    bgColor={'gray'}
                    onChange={handleCurrentTheme}
                    className={`relative mx-6 inline-flex h-6 w-11 items-center rounded-full duration-200`}
                  >
                    <span
                      className={`${
                        theme === 1 ? 'translate-x-6' : 'translate-x-1'
                      } flex h-3 w-4 transform items-center rounded-full bg-white transition`}
                    />
                  </Switch>
                ) : (
                  <Switch
                    checked={true}
                    bgColor={'white'}
                    onChange={handleCurrentTheme}
                    className={`relative mx-6 inline-flex h-6 w-11 items-center rounded-full duration-200`}
                  >
                    <span
                      className={`${
                        theme === 1 ? 'translate-x-6' : 'translate-x-1'
                      } flex h-3 w-4 transform items-center rounded-full bg-emerald-400 transition`}
                    />
                  </Switch>
                )}
              </div>
              <Button
                bgColor="#ad902c"
                onClick={handleSave}
                mt={4}
                w="full"
                h={10}
              >
                <span className="text-md font-semibold">Save</span>
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SettingsPopup
