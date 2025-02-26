"use client";

import { Section } from '@md/components';
import { useEffect, useState } from 'react';
import { Loading } from '@md/components';
import { Posts } from '../sections/posts';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@md/api/graphql';

// Starts from center
export default function PostsPage() {
  // LOADING
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000)
  }, [])

  return (
    <Section $sectionSize='full' $direction='vertical'>
      {/* Pass the refreshKey to the Posts component to trigger a rerender */}
      <Loading hidden={!loading} />
      <ApolloProvider client={apolloClient}>
        {!loading && <Posts />}
      </ApolloProvider>

    </Section>
  );
}
