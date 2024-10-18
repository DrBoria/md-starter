import React, { useState, ReactNode } from 'react';
import styled, { createGlobalStyle, TDefaultTheme, ThemeProvider } from 'styled-components';
import StyledReset from 'styled-reset';

import themes from './baseTheme';
import { light } from './themes';
type TColorTheme = typeof light;

const MediaProvider = styled.div`
  ${({ theme: { variables, screens, offsets } }) => `
    --border-radius: ${variables.border.radius}px;
    --border-size: ${variables.border.size}px;

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
  `}
`;

const ResetStyle = createGlobalStyle`
${StyledReset}
  
html,
body {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}
`;

const ThemeProviderWrapper = ({ children, theme: colorTheme }: { children: ReactNode, theme?: TColorTheme }) => {
  const [theme] = useState<TDefaultTheme>(themes);

  return (
    <ThemeProvider theme={{ ...theme, ...colorTheme }}>
      <ResetStyle />
      <MediaProvider>{children}</MediaProvider>
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
