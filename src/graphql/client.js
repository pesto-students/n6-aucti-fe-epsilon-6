import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { grapqlURL } from '../redux/apis';

const client = new ApolloClient({
  link: new HttpLink({
    uri: grapqlURL,
  }),
  cache: new InMemoryCache(),
});

export default client;
