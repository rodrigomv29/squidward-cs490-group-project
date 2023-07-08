import React, { useEffect } from 'react'

import { gql } from 'graphql-tag'

import { useMutation, useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const CUSTOM_LIST_QUERY = gql`
  query GetCustomListsQuery {
    customLists {
      id
      name
      userId
      articles {
        id
      }
    }
  }
`

const CREATE_CUSTOM_LIST_MUTATION = gql`
  mutation CreateCustomListMutation($input: CreateCustomListInput!) {
    createCustomList(input: $input) {
      id
      name
      userId
      articles {
        id
      }
    }
  }
`

const UPDATE_CUSTOM_LIST_MUTATION = gql`
  mutation UpdateCustomListMutation($id: Int!, $articleIds: [Int!]!) {
    updateCustomList(id: $id, input: { articleIds: $articleIds }) {
      id
      name
      userId
      articles {
        id
      }
    }
  }
`

const DELETE_CUSTOM_LIST_MUTATION = gql`
  mutation DeleteCustomListMutation($id: Int!) {
    deleteCustomList(id: $id) {
      id
      name
      userId
    }
  }
`

export function useCustomList() {
  const { currentUser } = useAuth()
  const {
    data: customListData,
    loading: customListLoading,
    refetch,
  } = useQuery(CUSTOM_LIST_QUERY)

  let filteredCustomLists = []
  if (!customListLoading) {
    const customLists = customListData?.customLists
    filteredCustomLists = customLists?.filter(
      (customList) => customList?.userId === currentUser?.id
    )
  }

  const getCustomListIdByName = (name: string) => {
    const customList = filteredCustomLists?.find(
      (customList) => customList.name === name
    )
    return customList?.id
  }

  return {
    filteredCustomLists,
    getCustomListIdByName,
    refetchCustomListQuery: refetch, // Add the refetch function to the hook's return value
  }
}

function CustomListHandler() {
  const [createCustomList] = useMutation(CREATE_CUSTOM_LIST_MUTATION)
  const [deleteCustomList] = useMutation(DELETE_CUSTOM_LIST_MUTATION)
  const [updateCustomList] = useMutation(UPDATE_CUSTOM_LIST_MUTATION)
  const { currentUser } = useAuth()
  const { filteredCustomLists, getCustomListIdByName, refetchCustomListQuery } =
    useCustomList()

  const handleNewList = async (name: string, articleIds?: number[]) => {
    const variables = {
      input: {
        name,
        userId: currentUser.id,
        articleIds,
      },
    }

    try {
      const { data } = await createCustomList({ variables })
      console.log('Created new list:', data.createCustomList)
      await refetchCustomListQuery()
    } catch (error) {
      if (
        error.graphQLErrors &&
        error.graphQLErrors.length > 0 &&
        error.graphQLErrors[0].extensions.originalError.message.includes(
          'Unique constraint failed on the fields: (`name`)'
        )
      ) {
        throw new Error('Custom list name already exists')
      } else {
        throw new Error('Something went wrong: ' + error)
      }
    }
  }

  const handleDeleteList = async (name: string) => {
    const customListId = getCustomListIdByName(name)
    console.log(customListId)
    if (!customListId) {
      console.log(`Custom list with name "${name}" not found`)
      return
    }

    try {
      await deleteCustomList({
        variables: {
          id: customListId,
        },
      })
      refetchCustomListQuery() // Refetch the custom list query after the mutation is completed
      console.log('Custom list deleted successfully')
    } catch (error) {
      console.error('Error deleting custom list:', error)
    }
  }

  const handleUpdateList = async (name: string, articleIds: number[]) => {
    const customListId = getCustomListIdByName(name)
    console.log(customListId)
    if (!customListId) {
      console.log(`Custom list with name "${name}" not found`)
      return
    }

    try {
      await updateCustomList({
        variables: {
          id: customListId,
          articleIds: articleIds,
        },
      })
      refetchCustomListQuery()
      console.log('Custom list updated successfully')
    } catch (error) {
      console.error('Error updating custom list:', error)
    }
  }

  useEffect(() => {
    console.log(filteredCustomLists)
  }, [filteredCustomLists])

  return (
    <div>
      <button
        onClick={() => {
          handleNewList('testList3', [1, 2])
        }}
        className="mx-32 my-32 h-[4rem] w-[10rem] bg-blue-600"
      >
        Make new list
      </button>

      <button
        onClick={() => {
          handleDeleteList('testList3')
        }}
        className="mx-32 my-32 h-[4rem] w-[10rem] bg-red-600"
      >
        Delete custom list
      </button>
      <button
        onClick={() => {
          const articleIds = [1, 2] // Replace with your desired article IDs
          handleUpdateList('testList3', articleIds)
        }}
        className="mx-32 my-32 h-[4rem] w-[10rem] bg-green-600"
      >
        Update custom list
      </button>
    </div>
  )
}

export default CustomListHandler
