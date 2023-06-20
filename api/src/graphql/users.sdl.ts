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
  }

  input UpdateUserInput {
    id: Int!
    general: Boolean
    business: Boolean
    entertainment: Boolean
    health: Boolean
    science: Boolean
    sports: Boolean
    technology: Boolean
  }

  type Query {
    user(id: Int!): User! @requireAuth
  }

  type Mutation {
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
  }
`
