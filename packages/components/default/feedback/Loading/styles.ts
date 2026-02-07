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

// Full Screen Wrapper
export const LoadingWrapper = styled.div<{ $hidden: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    inset: 0;
    opacity: 0;
    z-index: ${({ theme }) => theme?.zIndex?.animatedElements || 100};
    background: ${({ theme }) => theme?.colors?.background || 'rgba(0,0,0,0.5)'};

    ${({ $hidden }) => $hidden ?
    css`${fadeOutAnimation} pointer-events: none;` :
    css`${fadeInAnimation}`
  }
`;

// Generic Loader Container (for inline usage)
export const LoaderContainer = styled.div<{ $size?: 'small' | 'medium' | 'large' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  ${({ $size }) => {
    switch ($size) {
      case 'small': return css`width: 20px; height: 20px;`;
      case 'large': return css`width: 64px; height: 64px;`;
      default: return css`width: 32px; height: 32px;`;
    }
  }}

  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;

// Image Styling
export const StyledLoaderImage = styled(Image)`
  animation: ${rotate} 2s linear infinite;
  
  /* Ensure generic style doesn't conflict with theme specifics too much */
  width: 100%;
  height: 100%;
`;
