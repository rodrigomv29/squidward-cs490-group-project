import React, { useContext } from 'react'

import CustomThemeContext from 'src/CustomThemeContext'

import { useGetArticles } from '../ArticleDistrobutor/ArticleDistrobutor'

const processData = (categoryArticlesMap) => {
  const categories = [
    'general',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology',
  ]

  const allArticles = []

  for (const category of categories) {
    const categoryArticles = categoryArticlesMap[category]
      .slice(0, 1)
      .map((article) => ({
        title: article.title,
        description: article.description,
        author: article.author,
        urlToImage: article.urlToImage,
        url: article.url,
        publishedAt: article.publishedAt,
        content: article.content,
        category: article.category,
      }))

    allArticles.push(...categoryArticles)
  }

  return allArticles
}

function CategoryListItems() {
  const { theme } = useContext(CustomThemeContext)
  const { categoryArticlesMap, loading } = useGetArticles()

  let categoryArticles = []

  if (!loading) {
    categoryArticles = processData(categoryArticlesMap)
  }

  return (
    <div className="flex max-h-full flex-col">
      <div className="categories-container flex h-full flex-grow flex-col justify-between px-4 py-8">
        <div className="items-controller  max-h-full">
          <div className="main-container overflow-auto ">
            {categoryArticles.map((article, index) => (
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
                  <div className="flex flex-row">
                    <span className="flex justify-center text-left font-bold uppercase text-emerald-400">
                      {article.category.slice(0, 1)}
                    </span>
                    <span className="flex justify-center text-left font-bold text-emerald-400">
                      {article.category.slice(1)}
                    </span>
                  </div>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="flex justify-center px-4">
                      <span
                        className={`text-sm transition-colors duration-200 hover:underline ${
                          theme === 1 ? 'text-white' : 'text-black'
                        }`}
                      >
                        {article.description?.length > 200
                          ? article.description?.slice(0, 200) + '...'
                          : article.description
                          ? article.description
                          : article.content}
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

export default CategoryListItems
