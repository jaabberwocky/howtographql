const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");

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
    description: "Google Search",
  },
];

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },
  // because this is a trivial implementation
  // the below resolver is not needed and is provided by default
  Link: {
    id: (parent) => parent.id + "<--- this is the id",
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  },
  Mutation: {
    post: (parent, args) => {
      let idCount = links.length;

      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };

      links.push(link);
      return link;
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
