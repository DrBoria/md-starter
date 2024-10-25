/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
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
import {
  Colors,
  Header,
  LearnMoreLinks,
} from 'react-native/Libraries/NewAppScreen';
import { Card, ThemeProvider } from '@md/native-components';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@md/api/graphql'
import { dark } from '@md/styles/themes';

const ContentContainer = styled(ScrollView)`
  flex-grow: 1;
`;

function CardBlaBla() {
  const { data, loading, error } = useQueryList({
    listName: "Post",
    selectedFields: 'id name',
  });
  console.log('data id comming', data, error);
  if (data) {
    Alert.alert(
      "Alert Title", // Title
      JSON.stringify(data),
      [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ], // Array of button objects
    );
  } else {
    Alert.alert(
      "No Data", // Title
      "Ha Ha",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ], // Array of button objects
    );
  }
  return (
    <ThemeProvider theme={dark}>
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


type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
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
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            width: '100%', // Ensure the View takes the full width
          }}
        >
          <ApolloProvider client={apolloClient}>
            <Section title="Step One">
              <CardBlaBla />
              Edit <Text style={styles.highlight}>App.tsx</Text> to change this
              screen and then come back to see your edits.
            </Section>
            <Section title="Learn More">
              Read the docs to discover what to do next:
            </Section>
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
