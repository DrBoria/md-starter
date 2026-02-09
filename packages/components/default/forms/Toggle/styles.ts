import styled, { css } from "styled-components";
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

export const MainContainer = styled.div`
  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;

export const ArrowContainer = styled.div<{ $rotated: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transform: ${(props) => (props.$rotated ? "rotate(180deg)" : "none")};
  transition: transform 0.3s ease-in-out;
`;

export const ToggleContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: ${({ theme }) => theme.offsets.elementContent} 0;
`;

export const Title = styled.span`
  width: 100%;
`;

export const ChildrensContainer = styled.div<{ $showContent: boolean }>`
  padding-left: ${({ theme }) => theme.offsets.elementContent};
  ${({ $showContent, theme }) => $showContent
    ? css`max-height: calc(${theme.elements.form.height} * 6);`
    : css`max-height: 0;`}
  ${({ $showContent }) => $showContent
    ? css`opacity: 1;`
    : css`opacity: 0;`}
  overflow: hidden;
  transition: all 0.3s ease-in-out;
`;
