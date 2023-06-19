import React, { useEffect, useState } from 'react'

import {
  useDisclosure,
  Button,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { PrismaClient } from '@prisma/client'

import { toast } from '@redwoodjs/web/toast'

interface SettingsPopupProps {
  onClose: () => void
  userId: number
  prisma: PrismaClient
}

const SettingsPopup: React.FC<SettingsPopupProps> = ({ userId, prisma }) => {
  const [elements, setElements] = useState<
    { id: number; name: string; enabled: boolean }[]
  >([])

  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const userData = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            general: true,
            business: true,
            entertainment: true,
            health: true,
            science: true,
            sports: true,
            technology: true,
          },
        })

        const elementsData = [
          { id: 1, name: 'General', enabled: userData.general },
          { id: 2, name: 'Business', enabled: userData.business },
          { id: 3, name: 'Entertainment', enabled: userData.entertainment },
          { id: 4, name: 'Health', enabled: userData.health },
          { id: 5, name: 'Science', enabled: userData.science },
          { id: 6, name: 'Sports', enabled: userData.sports },
          { id: 7, name: 'Technology', enabled: userData.technology },
        ]

        setElements(elementsData)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    fetchElements()
  }, [prisma.user, userId])

  const toggleElement = async (id: number) => {
    const element = elements.find((el) => el.id === id)
    const updatedElements = elements.map((el) => {
      if (el.id === id) {
        return { ...el, enabled: !el.enabled }
      }
      return el
    })
    setElements(updatedElements)

    try {
      await prisma.user.update({
        where: { id: userId },
        data: { [element.name.toLowerCase()]: !element.enabled },
      })
      toast.success(`${element.name} updated`)
    } catch (error) {
      console.error(`Error updating ${element.name}:`, error)
      toast.error(`Error updating ${element.name}. Please try again.`)
    }
  }

  return (
    <>
      <Button onClick={onOpen}>Open Settings</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings Popup</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>This is the settings popup content.</p>
            <div>
              {elements.map((element) => (
                <div key={element.id}>
                  <label>
                    <Checkbox
                      isChecked={element.enabled}
                      onChange={() => toggleElement(element.id)}
                    />
                    {element.name}
                  </label>
                </div>
              ))}
            </div>
            <Button mt={4} onClick={onClose}>
              Close
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SettingsPopup
