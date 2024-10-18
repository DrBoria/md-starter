```jsx
import { ThemeProvider } from 'styled-components';

import Calendar from '.';
import { dark } from '@md/styles';
const tabs = [{ title: 'Tab 1' }, { title: 'Tab 2' }, { title: 'Tab 3' }];
<>
  <ThemeProvider theme={{}}>
    <Calendar />
    <ThemeProvider theme={{ colors: dark }}>
      <Calendar />
    </ThemeProvider>
  </ThemeProvider>
</>;
```
