const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");
const bodyParser = require("body-parser");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    changeName(name: String!): String!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: (root, args, context) => "Hello world!"
  },
  Mutation: {
    changeName: (root, args) => args.name
  }
};

async function startApolloServer() {
  const app = express();

  app.use(bodyParser.json());
  app.use((req, res, next) => {
    console.log("Incoming Req. Body:", req.body);
    return next();
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true
  });
  await server.start();

  server.applyMiddleware({ app });

  await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

startApolloServer().then((x) => {
  console.log("Complete");
});
