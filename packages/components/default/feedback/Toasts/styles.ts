import styled from "styled-components";
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

export const ToastContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ToastItem = styled.div<{ $tone?: 'positive' | 'negative' | 'warning' }>`
  min-width: 300px;
  max-width: 400px;
  padding: 16px;
  background: ${({ theme }) => theme?.colors?.sectionContent || 'white'}; /* Default fallback */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  
  h4 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
  }
  
  p {
    margin: 0;
    font-size: 0.875rem;
    opacity: 0.8;
  }
  
  .close-btn {
    position: absolute;
    top: 8px;
    right: 8px;

    /* Styles handled by theme usually, but default here */
  }

  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;
