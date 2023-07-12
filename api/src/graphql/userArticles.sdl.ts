export const schema = gql`
  type UserArticle {
    id: Int!
    sourceId: String
    sourceName: String
    author: String
    title: String!
    description: String
    url: String!
    urlToImage: String
    publishedAt: DateTime!
    content: String
    categoryId: Int
    Category: Category
    customList: CustomList
    customListId: Int
    articleId: Int!
  }

  type Query {
    userArticles: [UserArticle!]! @requireAuth
    userArticle(id: Int!): UserArticle @requireAuth
  }

  input CreateUserArticleInput {
    sourceId: String
    sourceName: String
    author: String
    title: String!
    description: String
    url: String!
    urlToImage: String
    publishedAt: DateTime!
    content: String
    categoryId: Int
    customListId: Int
    articleId: Int!
  }

  input UpdateUserArticleInput {
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
    customListId: Int
    articleId: Int
  }

  type Mutation {
    createUserArticle(input: CreateUserArticleInput!): UserArticle! @requireAuth
    updateUserArticle(id: Int!, input: UpdateUserArticleInput!): UserArticle!
      @requireAuth
    deleteUserArticle(id: Int!): UserArticle! @requireAuth
  }
`
