```jsx
import { PageContainer, BasicSection, HeadingContainer } from ".";
import { PlainText, SectionTitle } from "../Typography";
import ThemeProviderNative from "../../ThemeProviderNative";

import { dark } from "@md/styles/themes";

<ThemeProviderNative>
  <>
    <PageContainer>
      <PlainText>Page Container. Got offset equal to header height</PlainText>
      <BasicSection>
        <PlainText>Basic Section</PlainText>
        <SectionTitle>Section Title</SectionTitle>
        <PlainText>
          Plain text. Page container got offset from top for header
        </PlainText>
      </BasicSection>
    </PageContainer>
  </>
</ThemeProviderNative>
```
