import axios from 'axios'

export const setStatus = (status: number) => {
  localStorage.setItem('status', String(status))
}

export const getFirstRender = () => {
  const status = localStorage.getItem('first_render')
  return status ? parseInt(status, 10) : null
}

// Get the status from local storage
export const getStatus = () => {
  const status = localStorage.getItem('status')
  return status ? parseInt(status, 10) : null
}

// Set the status in local storage
export const setFirstRender = () => {
  const isFirstRender = getFirstRender()

  if (isFirstRender === null) {
    localStorage.setItem('first_render', '1')
    return true
  } else {
    return false
  }
}

export const isHomePage = (status: number) => {
  localStorage.setItem('isHomePage', String(status))
  console.log(`Is Currently Home Page: ${getIsHomePage()}`)
}

export const getIsHomePage = () => {
  const isHomePage = parseInt(localStorage.getItem('isHomePage'), 10)
  console.log(`Value of home page ${isHomePage}`)
  if (isHomePage === 1) {
    return true
  } else {
    return false
  }
}

export function getCurrentMilitaryTime(): {
  hours: string
  minutes: string
  militaryTime: string
} {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')

  const militaryTime = `${hours}:${minutes}`
  return { hours, minutes, militaryTime }
}

export function getTimeSincePublication(publishedAt) {
  const dateTimeString = publishedAt
  const regex = /T(\d{2}):(\d{2})/
  const matches = regex.exec(dateTimeString)

  let hours = 0
  let minutes = 0

  const currentTime = getCurrentMilitaryTime()

  if (matches && matches.length > 2) {
    hours = parseInt(matches[1], 10)
    minutes = parseInt(matches[2], 10)
  }

  hours = Math.abs(parseInt(currentTime.hours) - hours)
  minutes = Math.abs(parseInt(currentTime.minutes) - minutes)

  return { hours, minutes }
}

export async function getTopTen(category: string) {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWSAPI_KEY}`
    )
    const articles = response.data.articles

    const filteredArticles = articles.filter((article) => {
      return article.urlToImage && article.description
    })

    const topTenArticles = filteredArticles.slice(0, 10)
    console.log('called top 10')
    return topTenArticles
  } catch (error) {
    console.log('Something went wrong', error)
    throw error
  }
}

export async function getDescription(category: string) {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWSAPI_KEY}`
    )
    const data = response.data.articles

    const filteredArticles = data.filter((article) => {
      return article.description
    })

    const articles = filteredArticles.slice(0, 1)
    return articles
  } catch (error) {
    console.log('Something went wrong', error)
    throw error
  }
}

export async function getLatest(category: string) {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWSAPI_KEY}`
    )
    const data = response.data.articles

    const filteredArticles = data.filter((article) => {
      return article.urlToImage
    })

    const articles = filteredArticles
      .slice(10, filteredArticles.length - 1)
      .map((article) => ({
        title: article.title,
        description: article.description,
        image: article.urlToImage,
        sourceId: article.source.id,
        sourceName: article.source.name,
        publishedAt: article.publishedAt,
      }))

    return articles
  } catch (error) {
    console.log('Something went wrong', error)
    throw error
  }
}

export async function getArticles(category: string) {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWSAPI_KEY}`
    )
    const data = response.data.articles

    const filteredArticles = data.filter((article) => {
      return article.description && article.urlToImage
    })
    return filteredArticles
  } catch (error) {
    console.log('Something went wrong', error)
    throw error
  }
}
