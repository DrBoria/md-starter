// @md/styles/ThemeProviderNative.tsx
import React, { ReactNode, useState } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components/native'; // Native version
import { light, baseTheme } from '@md/styles/themes'; // Make sure this path is correct

const ThemeProviderNative = ({ children, theme: colorTheme }: { children: ReactNode, theme?: any }) => {
  const [theme] = useState<DefaultTheme>(baseTheme);

  return (
    <ThemeProvider theme={{ ...theme, colors: colorTheme || light }}>
        {children}
    </ThemeProvider>
  );
};

export default ThemeProviderNative;
