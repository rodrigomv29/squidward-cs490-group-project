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

interface SettingsPopupProps {
  onClose: () => void
  userId: number
}

const SettingsPopup: React.FC<SettingsPopupProps> = ({
  onClose: closePopup,
}) => {
  const [elements, setElements] = useState<
    { id: number; name: string; enabled: boolean }[]
  >([])

  const [isOpen, setIsOpen] = useState(false)

  const toggleElement = (id: number) => {
    setElements((prevElements) =>
      prevElements.map((element) =>
        element.id === id ? { ...element, enabled: !element.enabled } : element
      )
    )
  }

  useEffect(() => {
    setIsOpen(true) // Open the popup when the component is referenced
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    closePopup()
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
