import { Card, Section } from '@md/components'
import { useQueryList } from '@md/api/graphql'
import type { Lists } from '@md/types';
import { useEffect } from 'react';

const Posts = () => {
    const { data, refetch } = useQueryList<{ items: Lists.Post.Item[] }>({
        listName: "Post",
        selectedFields: 'id name createdAt',
    });

    useEffect(() => {
        void refetch();
    }, []);

    return (
        <Section $sectionSize='full' $direction='horizontal' style={{justifyContent: 'center'}}>
            {data?.items.map((item) => (
                <Card
                    offsetBottom
                    offsetRight 
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
