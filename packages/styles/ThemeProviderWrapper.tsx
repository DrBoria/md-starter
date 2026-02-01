import React, { useState } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import StyledReset from 'styled-reset';

import baseTheme from './themes/baseTheme';

interface Theme {
  theme?: string;
  font?: {
    size?: string;
    family?: {
      text?: string;
    };
  };
  colors?: {
    fontFamily?: string;
    background?: string;
    section?: string;
    sectionContent?: string;
    overlay?: string;
    disabled?: string;
    highlighted?: string;
    highlightedText?: string;
    labelText?: string;
  };
  effects?: {
    texture?: string;
    glow?: {
      soft?: string;
      medium?: string;
      strong?: string;
    };
    depth?: {
      inner?: {
        soft?: string;
        medium?: string;
        strong?: string;
      };
      outer?: {
        soft?: string;
        medium?: string;
        strong?: string;
      };
    };
  };
  geometry?: {
    radius?: string;
    ragged?: string;
    cut?: string;
  };
  assets?: {
    knotPattern?: string;
  };
  variables: any;
  screens: any;
  offsets: any;
}

const MediaProvider = styled.div`
  ${({ theme }: { theme: Theme }) => {
    const { variables, screens, offsets, colors } = theme;
    return `
    --border-radius: ${colors?.background || `${variables.border.radius}px`};
    --border-size: ${variables.border.size}px;
    --glass-effect: ${variables.glassEffect || 'none'};

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
  font-size: ${({ theme }: { theme: Theme }) => theme?.font?.size || '1rem'};
  font-family: ${({ theme }: { theme: Theme }) => theme?.colors?.fontFamily || theme?.font?.family?.text || 'serif'};
  background-color: ${({ theme }: { theme: Theme }) => theme?.colors?.background || theme?.colors?.section || 'white'};
}

* {
  box-sizing: border-box;
  letter-spacing: 1.5px;}
`;

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
  theme?: Partial<Theme>;
}

const ThemeProviderWrapper = ({ children, theme: colorTheme }: ThemeProviderWrapperProps) => {
  const [base] = useState(baseTheme);

  // Merge base theme with color theme
  // We want effects, geometry, and assets at the top level for convenience
  const mergedTheme = React.useMemo(() => {
    const colors = { ...base.colors, ...(colorTheme as any) };
    return {
      ...base,
      ...colors, // Spread colors to top level (includes effects, geometry, assets)
      colors,
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
