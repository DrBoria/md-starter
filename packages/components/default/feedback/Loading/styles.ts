import styled, { css, keyframes } from 'styled-components';
import Image from "next-image-export-optimizer";
import { vikingTheme } from './themes/viking';
import { liquidGlassTheme } from './themes/liquid-glass';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const fadeOut = keyframes`
  0% { opacity: 0.9; }
  100% { opacity: 0; }
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 0.9; }
`;

export const fadeInAnimation = css`
   animation: ${fadeIn} 0.2s linear forwards;
`;

export const fadeOutAnimation = css`
   animation: ${fadeOut} 0.2s linear forwards;
`;

export const LoadingWrapper = styled.div<{ $hidden: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    inset: 0;
    opacity: 0;
    z-index: ${({ theme }) => theme.zIndex.animatedElements};
    background: ${({ theme }) => theme.colors.overlay};

    ${({ $hidden }) => $hidden ?
    css`${fadeOutAnimation} pointer-events: none;` :
    css`${fadeInAnimation}`
  }
`;

export const LoaderContainer = styled.div<{ $size?: 'small' | 'medium' | 'large' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  ${({ $size, theme }) => {
    switch ($size) {
      case 'small': return css`width: ${theme.elements.icons.width}; height: ${theme.elements.icons.height};`;
      case 'large': return css`width: calc(${theme.elements.icons.width} * 3); height: calc(${theme.elements.icons.height} * 3);`;
      default: return css`width: calc(${theme.elements.icons.width} * 1.5); height: calc(${theme.elements.icons.height} * 1.5);`;
    }
  }}

  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;

export const StyledLoaderImage = styled(Image)`
  animation: ${rotate} 2s linear infinite;
  width: 100%;
  height: 100%;
`;
