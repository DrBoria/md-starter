```jsx
import { ThemeProvider } from 'styled-components';

import Tabs from '.';
import { dark } from '@md/styles';
const tabs = [{ title: 'Tab 1' }, { title: 'Tab 2' }, { title: 'Tab 3' }];
<>
  <ThemeProvider theme={{}}>
    <Tabs tabs={tabs} onActiveTabSet={console.log} />
    <ThemeProvider theme={{ colors: dark }}>
      <Tabs tabs={tabs} onActiveTabSet={console.log} />
    </ThemeProvider>
  </ThemeProvider>
</>;
```
