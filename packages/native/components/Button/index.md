```jsx
import React from "react";
import ThemeProvider from "../../ThemeProviderNative";
import { Button } from ".";
import { dark } from "@md/styles/themes";
import { BasicSection } from "../Containers";

<ThemeProvider>
  Light Theme
  <Button $offsetBottom>Navigation Button</Button>
  <Button type="menu">Menu Button</Button>
  Dark theme
  <ThemeProvider theme={{ colors: dark }}>
    <BasicSection>
      <Button $offsetBottom>Navigation Button</Button>
      <Button type="menu">Menu Button</Button>
    </BasicSection>
  </ThemeProvider>
</ThemeProvider>;
```
