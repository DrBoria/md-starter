```jsx
import { ThemeProvider } from 'styled-components';
import Pagination from '.';
import { dark } from '@md/styles';
<>
  Light Theme
  <div style={{ width: '100%', padding: '10px' }}>
    <Pagination pagesCount={5} currentPage={3} />
  </div>
  Dark theme
  <ThemeProvider theme={{ colors: dark }}>
    <Pagination pagesCount={5} currentPage={3} />
  </ThemeProvider>
</>;
```
