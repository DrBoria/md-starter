import React from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { BasicSection, Button, Input, Card, PageTitle, PlainText, ThemeProvider, Link } from '@md/native-components';
import styled from 'styled-components/native';
import { useQueryList } from '@md/api/graphql'; // Adjust the import according to your setup
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
    //     Alert.alert(
    //         "Alert Title", // Title
    //         JSON.stringify(data),
    //         [
    //             { text: "OK", onPress: () => console.log("OK Pressed") },
    //         ], // Array of button objects
    //     );
    // } else {
    //     Alert.alert(
    //         "No Data", // Title
    //         "Ha Ha",
    //         [
    //             { text: "OK", onPress: () => console.log("OK Pressed") },
    //         ], // Array of button objects
    //     );
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

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                contentContainerStyle={{ alignItems: 'center' }} // Center the content
                style={{}}
            >
                <View
                    style={{
                        width: '100%', // Ensure the View takes the full width
                    }}
                >

                    <BasicSection>
                        <FullWidthImage source={require('../assets/images/monster.png')} />
                        <CardBlaBla />
                        <Button>
                            Mega Бутон
                        </Button>
                        <Input name='idfd' />
                        <PlainText>And a plain text...</PlainText>
                        <Link onPress={() => navigation.navigate('Details')}>
                            Go to Details
                        </Link>
                    </BasicSection>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
