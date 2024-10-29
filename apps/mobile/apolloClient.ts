import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { MMKV } from 'react-native-mmkv';
let setCookieHeader: string | null;
const storage = new MMKV();
const domain = 'http://localhost:3000';

// Custom fetch function to handle 'Set-Cookie' headers
const customFetch: typeof fetch = async (uri, options) => {
    const response = await fetch(uri, options);

    // Check for 'Set-Cookie' headers
    setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
        await storage.set(`${domain}`, setCookieHeader);
    }

    return response;
};

// Define the HTTP link with the custom fetch
const httpLink = new HttpLink({ uri: 'http://localhost:3000/api/graphql', fetch: customFetch });

// Middleware to attach cookies from storage
const authLink = setContext(async (_, { headers }) => {
    const cookie = await storage.getString(domain)
    return {
        headers: {
            ...headers,
            cookie
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export { client };
