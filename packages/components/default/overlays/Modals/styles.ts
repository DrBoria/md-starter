import styled, { css, keyframes } from "styled-components";
import { withSpaceBetween } from '@md/styles';
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

// --- Animations ---
export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

export const centerZoomIn = keyframes`
  from { transform: translate(-50%, -50%) scale(0.7); opacity: 0; }
  to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
`;

export const centerZoomOut = keyframes`
  from { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  to { transform: translate(-50%, -50%) scale(0.7); opacity: 0; }
`;

export const expandAnimation = keyframes`
  0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
  80% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
  100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

export const collapseAnimation = keyframes`
  0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  40% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
`;

// --- Shared Components ---

export const Overlay = styled.div<{ $isClosing: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 50%);
  cursor: pointer;
  z-index: 999;
  animation: ${({ $isClosing }) => $isClosing ? fadeOut : fadeIn} 0.2s forwards;
`;

export const ModalContainer = styled.div<{ $isClosing: boolean, $fullScreen?: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme?.colors?.section || 'white'};
  color: ${({ theme }) => theme?.colors?.sectionContent || 'inherit'};
  
  /* Size logic */
  ${({ $fullScreen }) => $fullScreen ? css`
      width: 90vw;
      height: 90vh;
      padding: 40px;
  ` : css`
      min-width: 440px;
      max-height: 90%;
      padding: ${withSpaceBetween};
  `}

  /* Base styles */
  border-radius: 20px;
  border: none;
  box-shadow: 0 10px 30px rgb(0 0 0 / 20%);
  z-index: 1000;
  
  /* Animations */
  ${({ $isClosing, $fullScreen }) => {
        if ($fullScreen) {
            return css`animation: ${$isClosing ? collapseAnimation : expandAnimation} 0.3s ease-in-out forwards;`;
        } else {
            return css`animation: ${$isClosing ? centerZoomOut : centerZoomIn} 0.2s forwards;`;
        }
    }}

  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;

export const StyledModal = styled.div`
  background: transparent;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 16px;
  flex: 1;
  overflow: auto;
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgb(0 0 0 / 10%);
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background: rgb(0 0 0 / 20%);
  }
`;
