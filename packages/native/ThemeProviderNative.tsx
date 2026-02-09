import React from 'react';
import { Dimensions } from 'react-native';
import type { DefaultTheme } from 'styled-components/native';
import { ThemeProvider } from 'styled-components/native';
import { baseTheme } from '@md/styles/themes';
import { mergeDeep } from '@md/utils/mapping/mergeDeep';

// Get device screen width
const { width: screenWidth } = Dimensions.get('window');

// Define nativeBaseTheme with new values
const nativeBaseTheme = {
  elements: {
    header: {
      height: `${baseTheme.variables.header.height.mobile}`,
    },
  },
  border: {
    radius: `${baseTheme.variables.border.radius}`,
    size: `${baseTheme.variables.border.size}`,
  },
  offsets: {
    // Calculate page offset based on screen width and theme values
    page: `${(screenWidth - baseTheme.screens.desktop.width - baseTheme.variables.offsets.section.mobile) / 2}`,
    section: `${baseTheme.variables.offsets.section.mobile}`,
    betweenElements: `${baseTheme.variables.offsets.betweenElements.mobile}`,
    elementContent: `${baseTheme.variables.offsets.elementContent.mobile}`,
  },
};

const ThemeProviderNative = ({ children, theme = {} }: { children: React.ReactNode, theme?: Record<string, boolean | object> }) => {
  // Merge baseTheme, nativeBaseTheme, and colorTheme
  const mergedTheme = {
    ...mergeDeep(baseTheme, nativeBaseTheme, theme),
  };

  return (
    <ThemeProvider theme={mergedTheme as unknown as DefaultTheme}>
      <>{children}</>
    </ThemeProvider>
  );
};

export default ThemeProviderNative;


