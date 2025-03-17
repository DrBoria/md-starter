import React from 'react';
import { Section } from '@md/components';
import { useEffect, useState } from 'react';
import { Loading } from '@md/components';
import { Posts } from '@/sections/posts';

// Starts from center
export default function Home() {
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
      {!loading && <Posts />}
    </Section>
  );
}
