/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  useColorScheme,
} from 'react-native';
import { ThemeProvider } from '@md/native-components';
import { ApolloProvider } from '@apollo/client';
import { dark, light } from '@md/styles/themes';
import HomeScreen from './pages/home';
import DetailsScreen from './pages/details';
import { client } from './apolloClient';

// Debug for reactotron
if (__DEV__) {
  require("./ReactotronConfig");
}

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <ThemeProvider theme={{ colors: isDarkMode ? dark : light }}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Navigator>
        </ThemeProvider>
      </ApolloProvider>
    </NavigationContainer>
  );
}

export default App;
