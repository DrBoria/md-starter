import React, { useState } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import StyledReset from 'styled-reset';

import baseTheme from './themes/baseTheme';
import type { ThemeInterface } from './types';

// Extend ThemeInterface with baseTheme specifics if needed, or just use ThemeInterface
interface Theme extends ThemeInterface {
  variables: typeof baseTheme.variables;
  screens: typeof baseTheme.screens;
  offsets: typeof baseTheme.offsets;
}

const MediaProvider = styled.div`
  ${({ theme }: { theme: Theme }) => {
    const { variables, screens, offsets } = theme;
    return `
    --border-radius: ${theme.geometry?.radius || `${variables.border.radius}px`};
    --border-size: ${variables.border.size}px;
    --glass-effect: ${theme.effects.texture || 'none'};

    --page-offset: calc((100% - ${screens.desktop.width}px - ${offsets.section}) / 2);

    --height-header: ${variables.header.height.mobile}px;
    --offset-section: ${variables.offsets.section.mobile}px;
    --offset-between-elements: ${variables.offsets.betweenElements.mobile}px;
    --offset-element-content: ${variables.offsets.elementContent.mobile}px;

    @media (min-width: ${screens.tablet.width}px) {
      --height-header: ${variables.header.height.tablet}px;
      --offset-section: ${variables.offsets.section.tablet}px;
      --offset-between-elements: ${variables.offsets.betweenElements.tablet}px;
      --offset-element-content: ${variables.offsets.elementContent.tablet}px;
    }

    @media (min-width: ${screens.desktop.width}px) {
      --height-header: ${variables.header.height.desktop}px;
      --offset-section: ${variables.offsets.section.desktop}px;
      --offset-between-elements: ${variables.offsets.betweenElements.desktop}px;
      --offset-element-content: ${variables.offsets.elementContent.desktop}px;
    }
  `}}
`;

const ResetStyle = createGlobalStyle`
${StyledReset}
  
html,
body {
  margin: 0;
  padding: 0;
  font-weight: 500;
  font-size: ${({ theme }: { theme: Theme }) => theme?.font?.sizes?.regular || '1rem'};
  font-family: ${({ theme }: { theme: Theme }) => theme?.font?.family?.text || 'serif'};
  background-color: ${({ theme }: { theme: Theme }) => theme?.colors?.section || 'white'};
}

* {
  box-sizing: border-box;
  letter-spacing: 1.5px;}
`;

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
  theme?: Partial<ThemeInterface>;
}

const ThemeProviderWrapper = ({ children, theme: colorTheme }: ThemeProviderWrapperProps) => {
  const [base] = useState(baseTheme);

  // Merge base theme with color theme
  const mergedTheme = React.useMemo(() => {
    // If colorTheme has nested 'colors', use it.
    const mergedColors = {
      ...base.colors,
      ...(colorTheme?.colors || {})
    };

    // Deep merge font to preserve base sizes if specific theme doesn't provide them
    const font = {
      ...base.font,
      ...(colorTheme?.font || {})
    };

    return {
      ...base,
      ...colorTheme,
      colors: mergedColors,
      font,
    };
  }, [base, colorTheme]);

  return (
    <ThemeProvider theme={mergedTheme}>
      <>
        <link href="https://fonts.cdnfonts.com/css/norse" rel="stylesheet" />
        <ResetStyle />
        <MediaProvider>{children}</MediaProvider>
      </>
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
