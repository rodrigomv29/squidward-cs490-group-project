export const schema = gql`
  type User {
    id: Int!
    username: String!
    hashedPassword: String!
    salt: String!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    username: String!
    hashedPassword: String!
    salt: String!
  }

  input UpdateUserInput {
    username: String
    hashedPassword: String
    salt: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
