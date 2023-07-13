import React, { useEffect, useState } from 'react'

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
      articles {
        id
      }
    }
  }
`
export const UPDATE_USER_ARTICLE_MUTATION = gql`
  mutation UpdateUserArticletMutation($id: Int!, $userId: Int!) {
    updateUserArticle(id: $id, input: { userId: $userId }) {
      id
      customList {
        id
      }
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

export const DELETE_USER_ARTICLE_MUTATION = gql`
  mutation DeleteUserArticleMutation($id: Int!) {
    deleteUserArticle(id: $id) {
      id
      customList {
        id
      }
    }
  }
`

export function useNumArticles(initialValue) {
  const [numArticles, setNumArticles] = useState(initialValue)

  const updateNumArticles = (newValue) => {
    setNumArticles(newValue)
  }

  return { numArticles, updateNumArticles }
}

export function useArticleLength() {
  const [articleCount, setArticleCount] = useState(0)

  const setCount = (count) => {
    setArticleCount(count)
  }

  console.log(articleCount, 'this is the current article count')

  const increaseCount = () => {
    setArticleCount(articleCount + 1)
    console.log('ran increase code')
  }

  const decreaseCount = () => {
    if (articleCount > 0) {
      setArticleCount(articleCount - 1)
      console.log('I was called')
    }
  }

  return {
    articleCount,
    setCount,
    increaseCount,
    decreaseCount,
  }
}

export function useCustomList() {
  const { currentUser } = useAuth()
  const {
    data: customListData,
    loading: customListLoading,
    refetch,
  } = useQuery(CUSTOM_LIST_QUERY)

  const [filteredCustomLists, setFilteredCustomLists] = useState([])

  useEffect(() => {
    if (!customListLoading) {
      const customLists = customListData?.customLists
      const filteredLists = customLists?.filter(
        (customList) => customList?.userId === currentUser?.id
      )
      setFilteredCustomLists(filteredLists)
    }
  }, [customListData, currentUser, customListLoading, refetch])

  const getCustomListIdByName = (name: string) => {
    const customList = filteredCustomLists?.find(
      (customList) => customList.name === name
    )
    return customList?.id
  }

  return {
    filteredCustomLists,
    getCustomListIdByName,
    refetchCustomListQuery: refetch,
  }
}

function CustomListHandler() {
  const { filteredCustomLists } = useCustomList()

  useEffect(() => {
    console.log(filteredCustomLists, 'filted articles')
  }, [filteredCustomLists])

  return <div></div>
}

export default CustomListHandler
