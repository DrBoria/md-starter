import styled from "styled-components";
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

// Styled container for the tooltip
export const ToolTipContainer = styled.div<{ $fullWidth?: boolean }>`
  position: relative;
  display: inline-block;
  ${({ $fullWidth }) => ($fullWidth ? "width: 100%;" : "")}
`;

// Styled text element for the tooltip
export const ToolTipText = styled.span<{ $position: string }>`
  visibility: hidden;
  min-width: 120px;
  background-color: ${({ theme }) => theme?.colors?.sectionContent || '#202020'};
  color: ${({ theme }) => theme?.colors?.overlay || '#e6e6e6'};
  text-align: center;
  border-radius: ${({ theme }) => theme?.variables?.border?.radius || 4}px;
  padding: ${({ theme }) => theme?.variables?.offsets?.elementContent?.mobile || 8}px;

  /* Position the tooltip based on the dynamic '$position' prop */
  position: absolute;
  z-index: ${({ theme }) => theme?.zIndex?.navigationElement || 1000};
  left: 50%;
  margin-left: -60px; /* Half of min-width */
  ${({ $position }) => ($position === "top" ? "bottom: 100%; margin-bottom: 8px;" : "top: 100%; margin-top: 8px;")}
  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;

  ${ToolTipContainer}:hover & {
    visibility: visible;
    opacity: 1;
  }

  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;
