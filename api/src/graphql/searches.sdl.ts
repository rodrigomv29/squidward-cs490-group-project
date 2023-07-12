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
    createSearch(input: CreateSearchInput!): Search! @skipAuth
  }
`
