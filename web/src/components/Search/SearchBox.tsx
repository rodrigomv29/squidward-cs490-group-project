import React, { useState } from 'react'

import { SearchIcon, CloseIcon } from '@chakra-ui/icons'
import { Icon, Input } from '@chakra-ui/react'

const SearchBox = () => {
  const [isHovered, setHovered] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isInputVisible, setInputVisible] = useState(false)

  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
  }

  const handleIconClick = () => {
    setInputVisible(true)
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleExit = () => {
    setInputValue('')
    setInputVisible(false)
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!isInputVisible && (
        <Icon
          as={SearchIcon}
          boxSize={6}
          className={`search-icon ${isHovered ? 'hidden' : ''}`}
          onClick={handleIconClick}
        />
      )}
      {isInputVisible && (
        <div className="search-input-container">
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search..."
            className="search-input"
            _placeholder={{ color: 'black' }}
            color="black"
          />
          <button
            aria-label="Exit"
            className="search-exit"
            onClick={handleExit}
          >
            <Icon as={CloseIcon} boxSize={4} />
          </button>
        </div>
      )}
    </div>
  )
}

export default SearchBox
