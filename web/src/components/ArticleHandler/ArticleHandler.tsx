import React, { useEffect, useState } from 'react'

import { gql } from 'graphql-tag'

import { useQuery, useMutation } from '@redwoodjs/web'

const GET_ALL_ARTICLE_IDS_QUERY = gql`
  query GetAllArticleIds {
    articles {
      id
    }
  }
`

const DELETE_ARTICLE_MUTATION = gql`
  mutation DeleteArticle($id: Int!) {
    deleteArticle(id: $id) {
      id
      title
    }
  }
`

const GET_ARTICLES_QUERY = gql`
  query FindArticleQuery($category: String!) {
    article: getArticles(category: $category) {
      articles {
        author
        title
        description
      }
    }
  }
`

function useGetArticlesById() {
  const { data, loading } = useQuery(GET_ALL_ARTICLE_IDS_QUERY)

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (!loading) {
        return data
      }
    }

    fetchData()
  }, [data, loading])
  return { data, loading }
}

const isFirstLoad = sessionStorage.getItem('isFirstLoad')
const fetchArticles = sessionStorage.getItem('fetchArticles')

const FetchArticles = () => {
  const [shouldFetchArticles, setShouldFetchArticles] = useState(true)
  const category = 'general'
  const { loading } = useQuery(GET_ARTICLES_QUERY, {
    variables: { category },
    skip: !shouldFetchArticles,
  })

  useEffect(() => {
    if (shouldFetchArticles && !loading) {
      sessionStorage.setItem('fetchArticles', 'true')
      setShouldFetchArticles(false)
    }
  }, [loading, shouldFetchArticles])

  return null
}

const useDeleteArticle = () => {
  const [deleteArticle] = useMutation(DELETE_ARTICLE_MUTATION)

  const deleteOneArticle = async (inputID) => {
    try {
      const { data } = await deleteArticle({ variables: { id: inputID } })
      console.log('Deleted article:', data.deleteArticle)
    } catch (error) {
      console.error('Error deleting article:', error)
    }
  }

  return deleteOneArticle
}

// A fucntion for deleting all the articles in the db. Atm reserved for furture use
export const useHandleDeleteArticles = async () => {
  const deleteArticle = useDeleteArticle()
  const { data, loading } = useGetArticlesById()

  console.log('Deleting Articles...')

  if (data.articles.length > 0 && !loading) {
    for (const article of data.articles) {
      await deleteArticle(article.id)
    }
  } else {
    console.log('Cannot delete articles because articles are empty')
  }
}

function ArticleHandler() {
  useEffect(() => {
    if (isFirstLoad === null) {
      // Flag variable doesn't exist in sessionStorage, indicating the first load
      console.log('Retrieving Articles')

      // Set the flag variable in sessionStorage to indicate the code has already run
      sessionStorage.setItem('isFirstLoad', 'true')
    }
  }, [])

  return <div>{fetchArticles === null && <FetchArticles />}</div>
}

export default ArticleHandler
