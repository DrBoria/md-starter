import { ThemeProvider } from '@md/styles'
import { ApolloProvider } from '@apollo/client';
import  { apolloClient } from '@md/api/graphql'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  )
}
