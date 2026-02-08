```jsx
import { Button } from ".";
import { PlainText } from "../Typography";
import ThemeProviderNative from "../../ThemeProviderNative";

<ThemeProviderNative>
  <>
    <PlainText>Light Theme</PlainText>
    <Button $offsetBottom>Navigation Button</Button>
    <Button type="menu">Menu Button</Button>
  </>
</ThemeProviderNative>
```
