import ApolloClient from 'apollo-boost';

const { host } = window.location;
const uri = host.startsWith('localhost')
    ? 'http://localhost/graphql'
    : `http://graphql.${host}/graphql`;

const client = new ApolloClient({ uri });

export default client;
