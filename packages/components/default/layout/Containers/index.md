```jsx
const { PageContainer, BasicSection, HeadingContainer } = require(".");
const { PlainText, SectionTitle } = require("../../data-display/Typography");
const { dark } = require("@md/styles");

<PageContainer>
  Page Container (Viking Background)
  <BasicSection style={{ marginTop: 20 }}>
    <SectionTitle>Basic Section (Stone Slab)</SectionTitle>
    <PlainText>This section should have an inner shadow and stone borders in Viking theme.</PlainText>
    <div style={{ padding: 20, border: '1px solid rgba(255,255,255,0.1)', marginTop: 10 }}>
        Content inside section
    </div>
  </BasicSection>
</PageContainer>
```
