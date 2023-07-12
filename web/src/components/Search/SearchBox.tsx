import React, { useState } from 'react'

import { SearchIcon, CloseIcon } from '@chakra-ui/icons'
import { Icon, Input } from '@chakra-ui/react'
import {
  CreateSearchMutation,
  CreateSearchMutationVariables,
} from 'types/graphql'

import { FormSubmitHandler } from '@redwoodjs/forms'
import { navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const CREATE_SEARCH = gql`
  mutation CreateSearchMutation($input: CreateSearchInput!) {
    createSearch(input: $input) {
      id
      search
      userID
    }
  }
`

interface FormValues {
  search: string
}

const SearchBox = () => {
  const [isHovered, setHovered] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isInputVisible, setInputVisible] = useState(false)
  const { currentUser } = useAuth()
  const [create] = useMutation<
    CreateSearchMutation,
    CreateSearchMutationVariables
  >(CREATE_SEARCH)

  const onSubmit: FormSubmitHandler<FormValues> = (data) => {
    console.log(data)
  }

  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
  }

  const handleIconClick = () => {
    setInputVisible(true)
    if (inputValue.trim() !== '') {
      navigate(`/search-results?query=${encodeURIComponent(inputValue)}`)
    }
  }

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setInputValue(event.target.value)
  }

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      navigate(`/search-results?query=${encodeURIComponent(inputValue)}`)
    }
  }

  const handleExit = () => {
    setInputValue('')
    setInputVisible(false)
  }

  return (
    <form onClick={onSubmit}>
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
              name="search"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Search..."
              className="search-input"
              color="black"
            />
            <Input
              name="userID"
              type="hidden"
              value={currentUser.id}
              onKeyPress={handleKeyPress}
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
    </form>
  )
}

export default SearchBox
