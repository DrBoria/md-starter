```jsx
// import { PageContainer, BasicSection, HeadingContainer } from ".";
const { PlainText, SectionTitle } = require("../Typography");
const ThemeProviderNative = require("../../ThemeProviderNative").default || require("../../ThemeProviderNative");
const { dark } = require("@md/styles/themes");

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
