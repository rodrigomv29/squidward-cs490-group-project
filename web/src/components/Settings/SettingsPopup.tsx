import React, { useEffect, useState } from 'react'

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
import { gql } from 'graphql-tag'

import { useMutation, useQuery } from '@redwoodjs/web'

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
  const { data, loading } = useQuery(GET_USER_QUERY, {
    variables: { id: userId },
  })

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
    const updatedSettings = elements.reduce((acc, element) => {
      acc[element.name.toLowerCase()] = element.enabled
      return acc
    }, {})

    await updateUser({
      variables: { id: userId, input: updatedSettings },
    })

    handleClose()
  }

  return (
    <>
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
            w="20%"
          >
            <span>Settings</span>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            className="bg-emerald-400 bg-opacity-80"
            w="20%"
          >
            <div>
              <VStack spacing={4} align="start" fontSize="lg">
                {elements.map((element) => (
                  <div key={element.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={element.enabled}
                        onChange={() => toggleElement(element.id)}
                      />
                      {element.name}
                    </label>
                  </div>
                ))}
              </VStack>
              <Button bgColor="#ad902c" onClick={handleSave} mt={4} w="full">
                Save
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SettingsPopup
