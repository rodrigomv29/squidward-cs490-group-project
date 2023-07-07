import React from 'react'
import { useContext } from 'react'

import { useGetArticles } from 'src/components/ArticleDistrobutor/ArticleDistrobutor'
import CurrentPageContext from 'src/CurrentPageContext'
import CustomThemeContext from 'src/CustomThemeContext'

const processData = (categoryArticlesMap, currentPage) => {
  const category = currentPage === 'home' ? 'general' : currentPage
  const categoryArticles = categoryArticlesMap[category]?.map((article) => ({
    title: article.title,
    description: article.description,
    url: article.url,
    publishedAt: article.publishedAt,
    content: article.content,
    category: article.category,
  }))
  return categoryArticles
}

function TopNewsByCategory() {
  const { theme } = useContext(CustomThemeContext)
  const { currentPage } = useContext(CurrentPageContext)
  const { categoryArticlesMap, loading } = useGetArticles()

  let categoryArticles = []

  if (!loading) {
    categoryArticles = processData(categoryArticlesMap, currentPage)
  }

  const articles =
    categoryArticles?.length > 0 ? categoryArticles?.slice(10, 15) : []

  return (
    <div className="flex max-h-full flex-col">
      <div className="categories-container flex h-full flex-grow flex-col justify-between px-4 py-8">
        <div className="items-controller  max-h-full">
          <div className="main-container overflow-auto ">
            {articles &&
              articles.map((article, index) => (
                <div key={article.title} className="mb-2 flex flex-wrap">
                  <span
                    className={`relative flex w-1/5 flex-col items-center justify-center text-3xl font-bold transition-colors duration-200 ${
                      theme === 1 ? 'text-white' : 'text-black'
                    }`}
                  >
                    {index + 1}
                    <span className="mt-1 w-[25%] border-b-4 border-emerald-400"></span>
                  </span>

                  <div className="category-container flex w-4/5 flex-col items-center justify-center py-2">
                    <span className="mb-1 flex justify-center text-left font-bold text-emerald-400">
                      {article.title.slice(0, 90) + '...'}
                    </span>
                    <a
                      href={article?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="flex justify-center px-4">
                        <span
                          className={`text-sm transition-colors duration-200 hover:underline ${
                            theme === 1 ? 'text-white' : 'text-black'
                          }`}
                        >
                          {article && article.description?.length > 200
                            ? article.description?.slice(0, 200) + '...'
                            : article.description
                            ? article.description
                            : article.content
                            ? article.content
                            : 'This article doesnt have a description or content'}
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopNewsByCategory
