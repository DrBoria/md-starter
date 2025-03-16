```jsx
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
</PageContainer>;
```
