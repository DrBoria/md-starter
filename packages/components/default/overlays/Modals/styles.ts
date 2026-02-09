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
  background-color: ${({ theme }) => theme.colors.overlayBackground};
  cursor: pointer;
  z-index: 999;
  animation: ${({ $isClosing }) => $isClosing ? fadeOut : fadeIn} 0.2s forwards;
`;

export const ModalContainer = styled.div<{ $isClosing: boolean, $fullScreen?: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.section};
  color: ${({ theme }) => theme.colors.sectionContent};
  
  /* Size logic */
  ${({ $fullScreen, theme }) => $fullScreen ? css`
      width: ${theme.elements.modal.width};
      height: ${theme.elements.modal.height};
      padding: ${theme.offsets.section};
  ` : css`
      min-width: ${theme.elements.form.minWidth};
      max-height: ${theme.elements.modal.height};
      padding: ${withSpaceBetween};
  `}

  /* Base styles */
  border-radius: ${({ theme }) => theme.border.radius}px;
  border: none;
  box-shadow: ${({ theme }) => theme.shadows.large};
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
  gap: ${({ theme }) => theme.offsets.betweenElements};
  padding: ${({ theme }) => theme.offsets.elementContent};
  flex: 1;
  overflow: auto;
`;

export const CloseButton = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.offsets.elementContent};
  right: ${({ theme }) => theme.offsets.elementContent};
  cursor: pointer;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.elements.icons.width};
  height: ${({ theme }) => theme.elements.icons.height};
  background: ${({ theme }) => theme.colors.overlay};
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.overlayActive};
  }
`;
