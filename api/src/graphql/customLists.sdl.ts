export const schema = gql`
  type CustomList {
    id: Int!
    name: String!
    userId: Int!
    user: User!
    articles: [UserArticle]!
  }

  type Query {
    customLists: [CustomList!]! @requireAuth
    customList(id: Int!): CustomList @requireAuth
  }

  input CreateCustomListInput {
    name: String!
    userId: Int!
  }

  input UpdateCustomListInput {
    name: String
    userId: Int
  }

  type Mutation {
    createCustomList(input: CreateCustomListInput!): CustomList! @requireAuth
    updateCustomList(id: Int!, input: UpdateCustomListInput!): CustomList!
      @requireAuth
    deleteCustomList(id: Int!): CustomList! @requireAuth
  }
`
