```jsx
const { Button } = require(".");
const { PlainText } = require("../Typography");
const ThemeProviderNative = require("../../ThemeProviderNative").default || require("../../ThemeProviderNative");

<ThemeProviderNative>
  <>
    <PlainText>Light Theme</PlainText>
    <Button $offsetBottom>Navigation Button</Button>
    <Button type="menu">Menu Button</Button>
  </>
</ThemeProviderNative>
```
