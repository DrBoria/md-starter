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
import { viking } from "@md/styles/themes";
import ThemeProviderNative from "../../ThemeProviderNative";

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
