const { gql } = require("@apollo/client");

export const CREATE_USER = gql`
mutation createUser($user: UserInput!) {
  createUser(user: $user) {
    id
    username
    age
  }
}
`;