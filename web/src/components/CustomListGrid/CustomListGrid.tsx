import React from 'react'
import { useContext } from 'react'

import { useQuery } from '@redwoodjs/web'

import CustomThemeContext from 'src/CustomThemeContext'

const GET_ARTICLE_QUERY = gql`
  query GetArticleById($id: Int!) {
    article(id: $id) {
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
      Category {
        id
        name
      }
    }
  }
`

function GetArticle(id: number) {
  const { data, loading } = useQuery(GET_ARTICLE_QUERY, {
    variables: { id: id },
  })

  if (!loading) {
    return data?.article
  }
}

function CustomListGrid({ currentList }) {
  const articleIds = currentList?.articles

  const { theme } = useContext(CustomThemeContext)
  const userArticles = []

  if (currentList != null) {
    Object.values(articleIds).forEach((articleId: number) => {
      userArticles.push(GetArticle(articleId))
    })
  }

  const handleTheme = (first, second) => {
    if (theme === 1) {
      return first + ' transitions-colors duration-200 '
    }
    return second + ' transitions-colors duration-200 '
  }

  return (
    <>
      <div className={`grid-container h-[100%] w-full overflow-auto px-4 py-8`}>
        <div className="text-center">
          <p className="pb-4 text-2xl font-bold">{currentList?.name}</p>
        </div>
        <div
          className={`category-grid ${handleTheme(
            'text-white',
            'text-gray-800'
          )} grid
          h-[75%]
          w-full
          max-w-full
          grid-cols-3 items-center justify-center
        gap-4`}
        >
          {userArticles?.length === articleIds?.length &&
          userArticles?.length != 0 &&
          currentList != null ? (
            userArticles?.map((article, index) => (
              <div key={article?.id} className="font-bold">
                <a
                  href={article?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                  className="category-box lg:max-w-400 max-h-400 md:max-w-300 max-h-300 sm:max-w-200 max-h-200 flex flex-col items-center justify-start rounded-lg text-center"
                >
                  <div className="w-full">
                    <div className="container sm:h-[8rem] md:h-[10rem] lg:h-[12rem]">
                      <div className="image-container h-full w-full">
                        <img
                          src={article?.urlToImage}
                          alt={article?.title}
                          className="category-image h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="description-container my-2 h-[50%] max-w-full overflow-hidden px-2">
                    <p
                      className={`category-description text-md font-semibold transition-colors duration-200 hover:underline ${
                        theme === 1 ? 'text-white' : 'text-gray-800'
                      }  `}
                    >
                      {article?.description != ''
                        ? article?.description?.length > 110
                          ? article?.description?.slice(0, 110) + '...'
                          : article?.description
                          ? article?.description
                          : article?.content
                          ? article?.content
                          : 'This article does not have a description or content'
                        : ''}
                    </p>
                  </div>
                  <div className="category-source-info flex w-full max-w-full justify-center">
                    <div className="content-container flex w-full max-w-sm items-center justify-center space-x-6 py-2 sm:flex">
                      <span className="flex flex-row text-sm font-bold text-gray-400">
                        {article?.publishedAt?.slice(5, 7)}-
                        {article?.publishedAt?.slice(8, 10)}-
                        {article?.publishedAt?.slice(0, 4)}&nbsp;at&nbsp;
                        {article?.publishedAt?.slice(
                          article?.publishedAt?.indexOf('T') + 1,
                          article?.publishedAt?.length - 5
                        )}
                      </span>
                      <span
                        className={` font-bold ${
                          theme === 1 ? 'text-white' : 'text-gray-600'
                        }`}
                      >
                        {article?.sourceName}
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            ))
          ) : userArticles?.length === 0 ? (
            <div className=""></div>
          ) : null}
          {userArticles?.length === 0 && currentList != null ? (
            <div className="flex h-[50%] w-full items-center  text-center">
              <div className={`w-full  text-center`}>
                <span
                  className={`text-xl font-bold ${handleTheme(
                    'text-white',
                    'text-black'
                  )}`}
                >
                  You dont have any articles
                </span>
              </div>
            </div>
          ) : currentList === undefined ? (
            <div className="flex h-[50%] w-full items-center  text-center">
              <div className={`w-full  text-center`}>
                <span
                  className={`text-xl font-bold ${handleTheme(
                    'text-white',
                    'text-black'
                  )}`}
                >
                  You dont have any list, Add some by clicking add list
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default CustomListGrid
