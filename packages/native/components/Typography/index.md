### Typography:

```jsx
import ThemeProvider from "../../ThemeProviderNative";
import { PageContainer, BasicSection } from "../Containers";
import {
  PageTitle,
  Highlighted,
  SubTitle,
  SectionTitle,
  PlainText,
  Label,
} from ".";
import { dark } from "@md/styles/themes";

<ThemeProvider>
  <PageContainer>
    <BasicSection>
      <PageTitle>
        Page Title
        <Highlighted> Page Title Highlighted </Highlighted>
      </PageTitle>
      <br />
      <SectionTitle>Section Title</SectionTitle>
      <br />
      <SubTitle>
        Sub Title <Highlighted> Sub Title Highlighted </Highlighted>
      </SubTitle>
      <br />
      <PlainText>Plain Text</PlainText>
      <br />
      <Label>Label Text</Label>
    </BasicSection>

    <ThemeProvider theme={{ colors: dark }}>
      <BasicSection>
        <PageTitle>
          Page Title
          <Highlighted> Page Title Highlighted </Highlighted>
        </PageTitle>
        <br />
        <SectionTitle>Section Title</SectionTitle>
        <br />
        <SubTitle>
          Sub Title <Highlighted> Sub Title Highlighted </Highlighted>
        </SubTitle>
        <br />
        <PlainText>Plain Text</PlainText>
        <br />
        <Label>Label Text</Label>
      </BasicSection>
    </ThemeProvider>
  </PageContainer>
</ThemeProvider>;
```
