export const schema = gql`
  type Search {
    id: Int!
    search: String
    userID: Int
    User: User
  }

  type Query {
    searches: [Search!]! @requireAuth
    search(id: Int!): Search @requireAuth
  }

  input CreateSearchInput {
    search: String
    userID: Int
  }

  input UpdateSearchInput {
    search: String
    userID: Int
  }

  type Mutation {
    createSearch(input: CreateSearchInput!): Search! @requireAuth
    updateSearch(id: Int!, input: UpdateSearchInput!): Search! @requireAuth
    deleteSearch(id: Int!): Search! @requireAuth
  }
`
