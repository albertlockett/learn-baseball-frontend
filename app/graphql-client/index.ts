import ApolloClient from 'apollo-boost';

const { host } = window.location;
const uri = host.startsWith('localhost')
    ? 'http://localhost/graphql'
    : `https://graphql.${host}/graphql`;

// eslint-disable-next-line no-console
console.log('graphQL URI: ' + uri);

const client = new ApolloClient({ uri });

export default client;
