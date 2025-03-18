import React from 'react';
import { Card, Section } from '@md/components'
import { useQueryList } from '@md/api/graphql'
import type { Lists } from '@md/types';
import { useEffect } from 'react';
import type { QueryResult} from '@apollo/client';
import { useQuery } from '@apollo/client';

const Posts = () => {
    const { data, refetch } = useQueryList<QueryResult<{ items: Lists.Post.Item[] }>>({
        listName: "Post",
        selectedFields: 'id name createdAt',
        useQuery
    });

    useEffect(() => {
        void refetch();
    }, []);

    return (
        <Section $sectionSize='full' $direction='horizontal' style={{justifyContent: 'center', flexWrap: 'wrap'}}>
            {data?.items.map((item) => (
                <Card
                    $offsetBottom
                    $offsetRight 
                    key={item.id}
                    title={item.name}
                    date={new Date(item.createdAt)?.toLocaleTimeString()}
                    description="A short description goes here." // Replace with actual description if available
                    link={`/${item.id}`}
                />
            ))}
        </Section>
    )
}

export { Posts };
