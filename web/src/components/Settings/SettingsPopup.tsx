import React, { useEffect, useState } from 'react'

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
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
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
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
            </div>
            <Button mt={4} onClick={handleSave}>
              Save
            </Button>
            <Button mt={4} onClick={handleClose}>
              Close
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SettingsPopup
