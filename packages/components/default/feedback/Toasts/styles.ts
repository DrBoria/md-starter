import styled from "styled-components";
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

export const ToastContainer = styled.div`
  position: fixed;
  bottom: ${({ theme }) => theme.offsets.section};
  right: ${({ theme }) => theme.offsets.section};
  z-index: ${({ theme }) => theme.zIndex.alert};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.offsets.elementContent};
`;

export const ToastItem = styled.div<{ $tone?: 'positive' | 'negative' | 'warning' }>`
  min-width: ${({ theme }) => theme.elements.form.minWidth};
  max-width: ${({ theme }) => `calc(${theme.elements.form.minWidth} * 3)`};
  padding: ${({ theme }) => theme.offsets.elementContent};
  background: ${({ theme }) => theme.colors.sectionContent};
  border-radius: ${({ theme }) => theme.border.radius}px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.offsets.elementContent};
  position: relative;
  
  h4 {
    margin: 0;
    font-size: ${({ theme }) => theme.font.sizes.regular};
    font-weight: 600;
  }
  
  p {
    margin: 0;
    font-size: ${({ theme }) => theme.font.sizes.small};
    opacity: 0.8;
  }
  
  .close-btn {
    position: absolute;
    top: ${({ theme }) => theme.offsets.elementContent};
    right: ${({ theme }) => theme.offsets.elementContent};
  }

  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;
