/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Alert, Dimensions } from 'react-native';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';
import { useQueryList } from '@md/api/graphql'; // Adjust the import according to your setup
import { BasicSection, Button, Card, Input, PageTitle, PlainText, ThemeProvider } from '@md/native-components';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@md/api/graphql'
import { dark, light } from '@md/styles/themes';

const ContentContainer = styled(ScrollView)`
  flex-grow: 1;
`;

function CardBlaBla() {
  const { data, loading, error } = useQueryList({
    listName: "Post",
    selectedFields: 'id name',
  });
  console.log('data id comming', data, error);
  // if (data) {
  //   Alert.alert(
  //     "Alert Title", // Title
  //     JSON.stringify(data),
  //     [
  //       { text: "OK", onPress: () => console.log("OK Pressed") },
  //     ], // Array of button objects
  //   );
  // } else {
  //   Alert.alert(
  //     "No Data", // Title
  //     "Ha Ha",
  //     [
  //       { text: "OK", onPress: () => console.log("OK Pressed") },
  //     ], // Array of button objects
  //   );
  // }
  return (
    <ThemeProvider theme={{ colors: dark }}>
      <ContentContainer contentContainerStyle={{ alignItems: 'center' }}>
        <Text>Magic here</Text>
        {data?.items.map((item) => (
          <Card
            key={item.id}
            title={item.name}
            description="A short description goes here." // Replace with actual description if available
          />
        ))}
      </ContentContainer>
    </ThemeProvider>
  );
}

const FullWidthImage = styled.Image`
  width: 100%;
  resize-mode: cover;
`;

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    // Safe area for devices with bangs
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ alignItems: 'center' }} // Center the content
        style={backgroundStyle}
      >
        <View
          style={{
            width: '100%', // Ensure the View takes the full width
          }}
        >
          <ApolloProvider client={apolloClient}>
            <ThemeProvider theme={{ colors: isDarkMode ? dark : light }}>
              <BasicSection>
                <PageTitle>Well Here is Page Title</PageTitle>
                <FullWidthImage source={require('./assets/images/monster.png')} />
                <CardBlaBla />
                <Button>
                  Mega Бутон
                </Button>
                <Input name='idfd' />
                <PlainText>And a plain text...</PlainText>
              </BasicSection>
            </ThemeProvider>
          </ApolloProvider>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
