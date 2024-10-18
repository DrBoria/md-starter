```jsx
import { ThemeProvider } from 'styled-components';
import Spinner from '.';
import { dark } from '@md/styles';
<>
  Light Theme
  <div style={{ width: '100%', padding: '10px' }}>
    <Spinner />
  </div>
  Dark theme
  <ThemeProvider theme={{ colors: dark }}>
    <div style={{ width: '100%', padding: '10px', background: 'black' }}>
      <Spinner />
    </div>
  </ThemeProvider>
</>;
```
