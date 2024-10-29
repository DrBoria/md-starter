import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

// Create Apollo Client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    // Check this for more info https://stackoverflow.com/questions/33704130/react-native-android-fetch-failing-on-connection-to-local-api
    // This is the fix for android developer tools
    uri: 'http://localhost:3000/api/graphql',
    credentials: 'include', // Allows cookies to be sent with each request

  }),
});

export {
  client
};
