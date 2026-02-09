import styled, { css } from "styled-components";
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

export const ToolTipContainer = styled.div<{ $fullWidth?: boolean }>`
  position: relative;
  display: inline-block;
  ${({ $fullWidth }) => $fullWidth && css`width: 100%;`}
`;

export const ToolTipText = styled.span<{ $position: string }>`
  visibility: hidden;
  min-width: ${({ theme }) => theme.elements.form.minWidth};
  background-color: ${({ theme }) => theme.colors.sectionContent};
  color: ${({ theme }) => theme.colors.section};
  text-align: center;
  border-radius: ${({ theme }) => theme.border.radius}px;
  padding: ${({ theme }) => theme.offsets.elementContent};
  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.navigationElement};
  left: 50%;
  margin-left: ${({ theme }) => `calc(-${theme.elements.form.minWidth} / 2)`};
  ${({ $position, theme }) => $position === "top"
    ? css`bottom: 100%; margin-bottom: ${theme.offsets.elementContent};`
    : css`top: 100%; margin-top: ${theme.offsets.elementContent};`}
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
