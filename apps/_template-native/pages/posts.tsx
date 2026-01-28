import React, { useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { Card } from '@md/native/components';
import styled from 'styled-components/native';
import { useQueryList } from '@md/api/graphql'; // Adjust the import according to your setup
import { Section } from '../../../packages/native/components/Containers';
import { useNavigate } from 'react-router-native';
import type { QueryResult} from '@apollo/client';
import { useQuery } from '@apollo/client';
import type { Lists } from '@md/types';

// Styled components
const ContentContainer = styled(ScrollView)`
    min-height: 100%;
    background-color: ${({ theme }) => theme.colors.section};
    padding-top: ${({ theme }) => theme.offsets.section}px;
    flex-grow: 1;
`;

function Posts() {
    const { data, refetch } = useQueryList<QueryResult<{ items: Lists.Post.Item[] }>>({
        listName: "Post",
        selectedFields: 'id name createdAt',
        useQuery
    });

    const navigate = useNavigate();

    useEffect(() => {
        void refetch();
    }, [])

    return (
        <Section $direction='vertical' $sectionSize='full'>
            {data?.items?.map((item) => (
                <Card
                    key={item.id}
                    title={item.name}
                    date={new Date(item.createdAt)?.toLocaleString()}
                    onPress={() => navigate(`/${item.id}`)} // Navigate to the item page
                />
            ))}
        </Section>
    );
}

const PostsScreen = () => {

    return (
        <SafeAreaView>
            <ContentContainer
                contentInsetAdjustmentBehavior="automatic"
                contentContainerStyle={{ alignItems: 'center' }} // Move alignItems here
            >
                <Posts />
            </ContentContainer>
        </SafeAreaView>
    );
};

export default PostsScreen;
