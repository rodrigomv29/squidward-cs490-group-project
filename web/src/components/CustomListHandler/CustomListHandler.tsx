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
      articles {
        id
        sourceId
        sourceName
        author
        title
        description
        url
        urlToImage
        publishedAt
        content
        categoryId
        Category {
          name
        }
      }
    }
  }
`

export const CREATE_CUSTOM_LIST_MUTATION = gql`
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
export const CREATE_USER_ARTICLE_MUTATION = gql`
  mutation CreateUserArticleMutation($input: CreateUserArticleInput!) {
    createUserArticle(input: $input) {
      id
    }
  }
`

export const UPDATE_CUSTOM_LIST_MUTATION = gql`
  mutation UpdateCustomListMutation($id: Int!, $name: String!) {
    updateCustomList(id: $id, input: { name: $name }) {
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
