import React from 'react'
import { useContext } from 'react'

import CurrentPageContext from 'src/CurrentPageContext'
import CustomThemeContext from 'src/CustomThemeContext'
import { sortArticlesByDate } from 'src/utils/storage'

import { useGetArticles } from '../ArticleDistrobutor/ArticleDistrobutor'

const processData = (categoryArticlesMap, currentPage) => {
  const category = currentPage === 'home' ? 'general' : currentPage
  const categoryArticles = categoryArticlesMap[category]
    .slice(10)
    .map((article) => ({
      id: article.id,
      title: article.title,
      description: article.description,
      author: article.author,
      urlToImage: article.urlToImage,
      url: article.url,
      publishedAt: article.publishedAt,
      sourceName: article.sourceName,
      category: article.category,
    }))
  return categoryArticles
}

function ArticleList() {
  const { theme } = useContext(CustomThemeContext)

  const { currentPage } = useContext(CurrentPageContext)
  const { categoryArticlesMap, loading } = useGetArticles()
  const handleTheme = (first, second) => {
    if (theme === 1) {
      return first
    }
    return second
  }

  let categoryArticles = []

  if (!loading) {
    categoryArticles = processData(categoryArticlesMap, currentPage)
  }

  sortArticlesByDate(categoryArticles)

  return (
    <>
      <div
        className={`grid-container overflow-auto px-4 py-8 sm:h-[60%] md:h-[65%] lg:h-[85%]`}
      >
        <div
          className={`category-grid ${handleTheme(
            'text-white',
            'text-gray-800'
          )} grid w-full
          max-w-full
          grid-cols-3
        gap-4`}
        >
          {categoryArticles != null
            ? categoryArticles.map((article, index) => (
                <div key={article.id} className="font-bold">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                    className="category-box lg:max-w-400 max-h-400 md:max-w-300 max-h-300 sm:max-w-200 max-h-200 flex flex-col items-center justify-start rounded-lg text-center"
                  >
                    <div className="w-full">
                      <div className="container sm:h-[8rem] md:h-[10rem] lg:h-[12rem]">
                        <div className="image-container h-full w-full">
                          <img
                            src={article.urlToImage}
                            alt={article.title}
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
                        {article.description != ''
                          ? article.description?.length > 110
                            ? article.description?.slice(0, 110) + '...'
                            : article.description
                            ? article.description
                            : article.content
                            ? article.content
                            : 'This article does not have a description or content'
                          : ''}
                      </p>
                    </div>
                    <div className="category-source-info flex w-full max-w-full justify-center">
                      <div className="content-container flex w-full max-w-sm items-center justify-center space-x-6 py-2 sm:flex">
                        <span className="flex flex-row text-sm font-bold text-gray-400">
                          {article.publishedAt.slice(5, 7)}-
                          {article.publishedAt.slice(8, 10)}-
                          {article.publishedAt.slice(0, 4)}&nbsp;at&nbsp;
                          {article.publishedAt.slice(
                            article.publishedAt.indexOf('T') + 1,
                            article.publishedAt.length - 5
                          )}
                        </span>
                        <span
                          className={` font-bold ${
                            theme === 1 ? 'text-white' : 'text-gray-600'
                          }`}
                        >
                          {article.sourceName}
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              ))
            : ''}
        </div>
      </div>
    </>
  )
}

export default ArticleList
