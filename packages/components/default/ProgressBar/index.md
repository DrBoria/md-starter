```jsx
import { ThemeProvider } from 'styled-components';

import { BasicSection } from '../Containers';
import ProgressBar from '.';
import { dark } from '@md/styles';
const tabs = [{ title: 'Tab 1' }, { title: 'Tab 2' }, { title: 'Tab 3' }];
<>
  <ThemeProvider theme={{}}>
    <ProgressBar percentage={20} $offsetBottom />
    <ThemeProvider theme={{ colors: dark }}>
      <BasicSection>
        <ProgressBar percentage={89} />
      </BasicSection>
    </ThemeProvider>
  </ThemeProvider>
</>;
```
