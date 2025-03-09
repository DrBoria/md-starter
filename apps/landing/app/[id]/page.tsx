"use client";

import { useQueryListItem } from '@md/api/graphql'; // Import your hook here
import { useParams } from 'next/navigation';
import type { Lists } from '@md/types';
import { PageTitle, PlainText, Section, TextContainer } from '@md/components';
import { useQuery } from '@apollo/client';

export default function PostPage() {
  const params = useParams();
  const { id } = params; // Извлекаем параметр id из маршрута

  // Fetch the specific post based on the ID from the URL
  const { data } = useQueryListItem<{ post: Lists.Post.Item }>({
    listName: "Post",
    selectedFields: 'id name textContent', // Adjust fields as needed
    itemId: id as string, // Используем id, полученный через useParams
    useQuery,
  });

  return (
    <Section $sectionSize='full' $direction='vertical'>
      {data?.post && (
        <TextContainer>
          <PageTitle>{data.post.name}</PageTitle>
          <PlainText dangerouslySetInnerHTML={{ __html: data.post.textContent }} />
        </TextContainer>
      )}
    </Section>
  );
}
