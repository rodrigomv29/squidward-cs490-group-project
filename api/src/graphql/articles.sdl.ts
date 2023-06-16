export const schema = gql`
  type Article {
    id: Int!
    category: String!
    author: String!
    title: String!
    description: String!
    url: String!
    urlToImage: String!
    publishedAt: String!
    content: String!
  }

  type Query {
    articles: [Article!]! @requireAuth
    article(id: Int!): Article @requireAuth
  }

  input CreateArticleInput {
    category: String!
    author: String!
    title: String!
    description: String!
    url: String!
    urlToImage: String!
    publishedAt: String!
    content: String!
  }

  input UpdateArticleInput {
    category: String
    author: String
    title: String
    description: String
    url: String
    urlToImage: String
    publishedAt: String
    content: String
  }

  type Mutation {
    createArticle(input: CreateArticleInput!): Article! @requireAuth
    updateArticle(id: Int!, input: UpdateArticleInput!): Article! @requireAuth
    deleteArticle(id: Int!): Article! @requireAuth
  }
`
