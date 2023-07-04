export const schema = gql`
  type Category {
    id: Int!
    name: String!
    articles: [Article!]!
  }

  type Query {
    getArticles(category: String): Category! @skipAuth
    getArticlesByCategory(category: String!): Category! @skipAuth
    categories: [Category!]! @skipAuth
    category(id: Int!): Category @skipAuth
    articles: [Article!]!
  }

  input CreateCategoryInput {
    name: String!
  }

  input UpdateCategoryInput {
    name: String
  }

  type Mutation {
    createCategory(input: CreateCategoryInput!): Category! @skipAuth
    updateCategory(id: Int!, input: UpdateCategoryInput!): Category! @skipAuth
    deleteCategory(id: Int!): Category! @skipAuth
  }
`
