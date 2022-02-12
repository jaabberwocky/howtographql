const resolvers = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`,
      feed: async (parent, args, context, info) => {
        let allLinks = context.prisma.link.findMany();
        return allLinks;
      },
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
      id: (parent) => parent.id,
      description: (parent) => parent.description,
      url: (parent) => parent.url,
    },
    Mutation: {
      post: (parent, args) => {
        let idCount = utils.getLastID(links);
  
        const link = {
          id: `link-${idCount + 1}`,
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
        });
        return selectedLink;
      },
  
      deleteLink: (parent, args) => {
        let selectedLink;
  
        links = links.filter((link) => {
          if (link.id === args.id) {
            selectedLink = link;
            return false;
          }
          return true;
        });
  
        return selectedLink;
      },
    },
  };

module.exports = {
    resolvers: resolvers,
}