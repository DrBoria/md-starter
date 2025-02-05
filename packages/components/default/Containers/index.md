```jsx
import { ThemeProvider } from 'styled-components';

import { PageContainer, BasicSection, HeadingContainer } from '.';
import { PlainText, SectionTitle } from '../Typography';

import { dark } from '@md/styles';

<PageContainer>
  Page Container. Got offset equal to header height
  <BasicSection>
    Basic Section
    <SectionTitle>Section Title</SectionTitle>
    <PlainText>Plain text. Page container got offset from top for header</PlainText>
  </BasicSection>
  <ThemeProvider theme={{ colors: dark }}>
    <BasicSection>
      <PlainText>Basic Section Dark</PlainText>
      <HeadingContainer>
        <PlainText>Heading Container Dark</PlainText>
        <SectionTitle $offsetBottom>Section Title Dark</SectionTitle>
        <PlainText>Plain Text</PlainText>
      </HeadingContainer>
    </BasicSection>
  </ThemeProvider>
</PageContainer>;
```
