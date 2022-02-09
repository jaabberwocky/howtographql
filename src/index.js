const { ApolloServer } = require("apollo-server");

const typeDefs = `
    type Query {
        info: String!
        feed: [Link!]!
    }

    type Link {
        id: ID!
        description: String!
        url: String!
    }
`;

// initial data
let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
  {
      id: "link-1",
      url: "www.google.com",
      description: "Google Search"
  }
];

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },
//   Link: {
//     id: (parent) => parent.id + "<--- this is the id",
//     description: (parent) => parent.description,
//     url: (parent) => parent.url,
//   },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));