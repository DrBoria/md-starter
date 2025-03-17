import React from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { useQueryListItem } from '@md/api/graphql'; // Adjust the import based on your project structure
import { useParams } from 'react-router-native'; // Use useParams to get URL parameters
import type { Lists } from '@md/types';
import { PageTitle, PlainText, Section, TextContainer } from '@md/native/components';
import styled from 'styled-components/native';
import type { QueryResult} from '@apollo/client';
import { useQuery } from '@apollo/client';

// Styled components
const ContentContainer = styled(ScrollView)`
    min-height: 100%;
    background-color: ${({ theme }) => theme.colors.section};
    padding-top: ${({ theme }) => theme.offsets.section}px;
    flex-grow: 1;
`;

const PostPage = () => {
    const { id } = useParams(); // Extract the ID from the URL parameters

    // Fetch the specific post based on the ID from the URL
    const { data } = useQueryListItem<QueryResult<{ post: Lists.Post.Item }>>({
        listName: "Post",
        selectedFields: 'id name textContent', // Adjust fields as needed
        itemId: id, // Use the ID from the URL parameters
        useQuery
    });

    return (
        <SafeAreaView>
            <ContentContainer
                contentInsetAdjustmentBehavior="automatic"
                contentContainerStyle={{ alignItems: 'center' }}
            >
                <Section $sectionSize='full' $direction='vertical'>
                    <ScrollView>
                        {data?.post && (
                            <TextContainer>
                                <PageTitle>{data.post.name}</PageTitle>
                                <PlainText>{data.post.textContent}</PlainText>
                            </TextContainer>
                        )}
                    </ScrollView>
                </Section>
            </ContentContainer>
        </SafeAreaView>
    );
};

export default PostPage;
