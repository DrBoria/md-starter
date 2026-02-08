### Typography:

```jsx
const { PageContainer, BasicSection } = require("../../layout/Containers");
const { PageTitle, Highlighted, SubTitle, SectionTitle, PlainText, Label } = require(".");
const { dark } = require("@md/styles");

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
</PageContainer>
```
