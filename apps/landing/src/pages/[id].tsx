import { useQueryListItem } from '@md/api/graphql'; // Import your hook here
import { useRouter } from 'next/router'; // Import useRouter
import type { Lists } from '@md/types';
import { PageTitle, PlainText, Section, TextContainer } from '@md/components';
import { useQuery } from '@apollo/client';

export default function PostPage() {
    const router = useRouter(); // Initialize the router

    // Fetch the specific post based on the ID from the URL
    const { data } = useQueryListItem({
        listName: "Post",
        selectedFields: 'id name textContent', // Adjust fields as needed
        itemId: router.query.id as string, // Get the ID from the URL
        useQuery
    });

    return (
        <Section $sectionSize='full' $direction='vertical'>
            {
                data?.post && (
                    <TextContainer>
                        <PageTitle>{data.post.name}</PageTitle>
                        <PlainText dangerouslySetInnerHTML={{ __html: data.post.textContent }} />
                    </TextContainer>
                )
            }
        </Section>

    );
}
