const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type User {
        id: ID
        username: String
        age: Int
    }
    
    input UserInput {
        username: String!
        age: Int!
        posts: [PostInput]
    }
    input PostInput {
        title: String!
        content: String!
    }

    type Query {
        getAllUsers: [User]
        getUser(id: ID): User
    }
    type Mutation {
        createUser(user: UserInput): User
    }
`);

module.exports = schema;