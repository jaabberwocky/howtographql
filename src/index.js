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
    link: (parent, args) => {
      let selectedLink;

      links.forEach((link) => {
        if (link.id === args.id) {
          selectedLink = link;
        }
      });
      return selectedLink;
    },
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

    updateLink: (parent, args) => {
        let selectedLink;

        links = links.map((link) => {
            if (link.id === args.id) {
                if (args.description) {
                    link.description = args.description;
                }
                if (args.url) {
                    link.url = args.url;
                }
                selectedLink = link;
            } 
            return link;
        })
        return selectedLink;
    }
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
