### Typography:

```jsx
// import { PageContainer, BasicSection } from "../Containers";
// import {
//   PageTitle,
//   Highlighted,
//   SubTitle,
//   SectionTitle,
//   PlainText,
//   Label,
// } from ".";
const { dark } = require("@md/styles/themes");
const ThemeProviderNative = require("../../ThemeProviderNative").default || require("../../ThemeProviderNative");

<ThemeProviderNative>
  <>
    <PageContainer>
      <BasicSection>
        <PageTitle>
          Page Title
          <Highlighted> Page Title Highlighted </Highlighted>
        </PageTitle>
        <SectionTitle>Section Title</SectionTitle>
        <SubTitle>
          Sub Title <Highlighted> Sub Title Highlighted </Highlighted>
        </SubTitle>
        <PlainText>Plain Text</PlainText>
        <Label>Label Text</Label>
      </BasicSection>
    </PageContainer>
  </>
</ThemeProviderNative>
```
