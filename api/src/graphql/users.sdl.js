export const schema = gql`
  type User {
    id: Int!
    username: String!
    password: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @skipAuth
  }

input CreateUserInput {
  username: String!
  password: String!
}
`
