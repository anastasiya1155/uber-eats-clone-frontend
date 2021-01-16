module.exports = {
  client: {
    includes: ['./src/**/*.tsx'],
    tagName: 'gql',
    service: {
      name: 'uber-eats-clone-backend',
      url: 'http://localhost:4000/graphql',
    },
  },
};
