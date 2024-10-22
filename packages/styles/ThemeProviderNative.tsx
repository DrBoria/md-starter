// @md/styles/ThemeProviderNative.tsx
import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components/native'; // Native version
import { light } from './themes'; // Make sure this path is correct

const ThemeProviderNative = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={light}>{children}</ThemeProvider>;
};

export default ThemeProviderNative;
