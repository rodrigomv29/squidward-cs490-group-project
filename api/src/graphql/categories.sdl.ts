export const schema = gql`
  type Category {
    id: Int!
    name: String!
    articles: [Article!]!
  }

  type Query {
    getArticles(category: String!): Category! @skipAuth
    categories: [Category!]! @requireAuth
    category(id: Int!): Category @requireAuth
    articles: [Article!]!
  }

  input CreateCategoryInput {
    name: String!
  }

  input UpdateCategoryInput {
    name: String
  }

  type Mutation {
    createCategory(input: CreateCategoryInput!): Category! @requireAuth
    updateCategory(id: Int!, input: UpdateCategoryInput!): Category! @skipAuth
    deleteCategory(id: Int!): Category! @skipAuth
  }
`
