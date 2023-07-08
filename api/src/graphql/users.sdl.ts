export const schema = gql`
  type User {
    id: Int!
    email: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    general: Boolean!
    business: Boolean!
    entertainment: Boolean!
    health: Boolean!
    science: Boolean!
    sports: Boolean!
    technology: Boolean!
    customLists: [CustomList!]
  }

  type CustomList {
    id: Int!
    name: String!
    userId: Int!
    user: User!
  }

  type Query {
    users: [User!]! @skipAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    hashedPassword: String!
    salt: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    general: Boolean!
    business: Boolean!
    entertainment: Boolean!
    health: Boolean!
    science: Boolean!
    sports: Boolean!
    technology: Boolean!
  }

  input UpdateUserInput {
    email: String
    hashedPassword: String
    salt: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    general: Boolean
    business: Boolean
    entertainment: Boolean
    health: Boolean
    science: Boolean
    sports: Boolean
    technology: Boolean
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
