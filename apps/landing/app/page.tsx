import { Section } from '@md/components';
import PostsPage from './posts';

// Starts from center
export default function Home() {
  return (
    <Section $sectionSize='full' $direction='vertical'>
      <PostsPage />
    </Section>
  );
}
