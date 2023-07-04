export const schema = gql`
  type Article {
    id: Int!
    sourceId: String!
    sourceName: String!
    author: String
    title: String!
    description: String!
    url: String!
    urlToImage: String
    publishedAt: DateTime!
    content: String
    Category: Category
    categoryId: Int
  }

  type Query {
    articles: [Article!]! @requireAuth
    article(id: Int!): Article @requireAuth
  }

  input CreateArticleInput {
    sourceId: String!
    sourceName: String!
    author: String
    title: String!
    description: String!
    url: String!
    urlToImage: String
    publishedAt: DateTime!
    content: String
    categoryId: Int
  }

  input UpdateArticleInput {
    sourceId: String
    sourceName: String
    author: String
    title: String
    description: String
    url: String
    urlToImage: String
    publishedAt: DateTime
    content: String
    categoryId: Int
  }

  type Mutation {
    createArticle(input: CreateArticleInput!): Article! @requireAuth
    updateArticle(id: Int!, input: UpdateArticleInput!): Article! @requireAuth
    deleteArticle(id: Int!): Article! @skipAuth
  }
`
