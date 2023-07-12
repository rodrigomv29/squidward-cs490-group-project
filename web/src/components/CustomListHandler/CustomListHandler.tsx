import React, { useEffect } from 'react'

import { gql } from 'graphql-tag'

import { useQuery } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

export const CUSTOM_LIST_QUERY = gql`
  query GetCustomListsQuery {
    customLists {
      id
      name
      userId
      articles
    }
  }
`

export const CREATE_CUSTOM_LIST_MUTATION = gql`
  mutation CreateCustomListMutation($input: CreateCustomListInput!) {
    createCustomList(input: $input) {
      id
      name
      userId
      articles
    }
  }
`

export const UPDATE_CUSTOM_LIST_MUTATION = gql`
  mutation UpdateCustomListMutation($id: Int!, $articleIds: [Int!]!) {
    updateCustomList(id: $id, input: { articles: $articleIds }) {
      id
      name
    }
  }
`

export const DELETE_CUSTOM_LIST_MUTATION = gql`
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
  const { filteredCustomLists } = useCustomList()

  useEffect(() => {
    console.log(filteredCustomLists)
  }, [filteredCustomLists])

  return <div></div>
}

export default CustomListHandler
