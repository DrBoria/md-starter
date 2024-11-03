/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { HamburgerMenu, LoadingSpinner, ThemeProvider } from '@md/native-components';
import { ApolloProvider } from '@apollo/client';
import { dark, light } from '@md/styles/themes';
import { NativeRouter, Route, Routes } from 'react-router-native';
import PostsScreen from './pages/posts';
import IdPostPage from './pages/[id]';
import LoginScreen from './pages/login';
import { client } from './apolloClient';
import Ouroboros from './assets/images/ouroboros.svg';
import styled from 'styled-components/native';

// Debug for reactotron
if (__DEV__) {
  require("./ReactotronConfig");
}


const SpinnerContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.section};
  justify-content: center;
  align-items: center;
  flex: 1;
`;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [loading, setLoading] = useState(true);

  // Set a timeout to stop loading after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={{ colors: isDarkMode ? dark : light }}>
        <NativeRouter>
          {loading ? (
            <SpinnerContainer>
              <LoadingSpinner>
                <Ouroboros width={120} height={120} />
              </LoadingSpinner>
            </SpinnerContainer>
          ) : (
            <>
              <HamburgerMenu />
              <Routes>
                <Route path="/" element={<PostsScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/:id" element={<IdPostPage />} />
              </Routes>
            </>)}
        </NativeRouter>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
