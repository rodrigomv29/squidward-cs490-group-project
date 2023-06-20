import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

const prisma = new PrismaClient()

async function populateDatabase() {
  // Fetch data from the API
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWSAPI_KEY}`
  )
  const data = await response.json()
  const articles = data.articles

  // Create categories and articles in the database
  for (const article of articles) {
    const {
      source,
      author,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
      content,
    } = article
    const categoryName = source.name

    // Check if the category already exists
    let category = await prisma.category.findUnique({
      where: { name: categoryName },
    })

    // If the category doesn't exist, create it
    if (!category) {
      category = await prisma.category.create({
        data: { name: categoryName },
      })
    }

    // Create the article and associate it with the category
    await prisma.article.create({
      data: {
        sourceName: source.name,
        author,
        title,
        description,
        url,
        urlToImage,
        publishedAt,
        content,
        categoryId: category.id,
      },
    })
  }

  console.log('Database population completed!')
}

populateDatabase()
  .catch((error) => {
    console.error('Error populating database:', error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
