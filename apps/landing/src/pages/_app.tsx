import { ThemeProvider } from '@md/styles'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (<ThemeProvider>
    <Component {...pageProps} />
  </ThemeProvider>)
}
