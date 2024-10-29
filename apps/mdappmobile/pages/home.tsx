import React from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { BasicSection, Button, Input, Card, PageTitle, PlainText, ThemeProvider, Link, LoadingSpinner } from '@md/native-components';
import styled from 'styled-components/native';
import { useQueryList } from '@md/api/graphql'; // Adjust the import according to your setup
import { dark } from '@md/styles/themes';
import Ouroboros from '../assets/images/ouroboros.svg';


const ContentContainer = styled(ScrollView)`
  flex-grow: 1;
`;

function CardBlaBla() {
    const { data, error } = useQueryList({
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
                        <LoadingSpinner>
                            <Ouroboros width={120} height={120} />
                        </LoadingSpinner>
                        <FullWidthImage source={require('../assets/images/monster.png')} />
                        <CardBlaBla />
                        <Link onPress={() => navigation.navigate('Details')}>
                            Go to Details
                        </Link>
                        <Input name='idfd' />
                        <Button>
                            Mega
                        </Button>
                        <PlainText>And a plain text...</PlainText>
                    </BasicSection>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
