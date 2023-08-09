const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const schema = require("./schma.js");
const users = [{ id: 1123, username: "Vasia", age: 23 }];

const app = express();

app.use(cors());

const root = {
    getAllUsers: () => {
        return users;
    },

    getUser: ({ id }) => {
        return users.find(user => user.id == id);
    },

    createUser: ({ user }) => {
        const newUser = {
            id: Date.now(),
            ...user
        };

        users.push(newUser);
        return newUser;
    }
};

app.use("/graphql", graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
}));

app.listen(5000, () => console.log("server starts"));