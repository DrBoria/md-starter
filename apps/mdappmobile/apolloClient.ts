import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { MMKV } from 'react-native-mmkv';
import { GoogleSignin } from './authentication/oauth';

let setCookieHeader: string | null;
export const storage = new MMKV();
const domain = 'http://localhost:3000';

// Custom fetch function to handle 'Set-Cookie' headers
const customFetch: typeof fetch = async (uri, options) => {
    const response = await fetch(uri, options);
    const cookieHeader = response.headers.get('set-cookie');
    if (cookieHeader) {
        storage.set(`${domain}`, cookieHeader);
    }
    return response;
};


// Function to check if token has expired
const hasTokenExpired = (tokens) => {
    const { expirationTime } = tokens; // Assume tokens have an expiration time
    return expirationTime < Date.now(); // Compare with current time
};

// Function to refresh tokens
const refreshTokens = async () => {
    const { idToken, accessToken } = await GoogleSignin.signInSilently();
    return {
        idToken,
        accessToken,
        expirationTime: Date.now() + 60 * 60 * 1000, // Example: 1 hour expiration
    };
};

// Define the HTTP link with the custom fetch
const httpLink = new HttpLink({ uri: `${domain}/api/graphql`, fetch: customFetch });

// Middleware to attach cookies from storage
const authLink = setContext(async (_, { headers }) => {
    const cookie = storage.getString(domain);
    let tokens = await GoogleSignin.getTokens();
    console.log(tokens, 'hasTokenExpired? : ', hasTokenExpired(tokens))
    if (!tokens || hasTokenExpired(tokens)) {
        // Token is expired or doesn't exist, try to refresh
        try {
            tokens = await refreshTokens(); // Your custom function to refresh tokens
            console.error("GOT NEW TOKENS", tokens);
        } catch (error) {
            console.error("Error refreshing tokens:", error);
            // Handle token refresh error (e.g., sign out the user)
            await GoogleSignin.signOut();
            tokens = null; // Ensure no tokens are sent if refresh fails
        }
    }

    return {
        headers: {
            ...headers,
            // ...(tokens || {}), // add google tokens to response if exists
            cookie
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export { client };
