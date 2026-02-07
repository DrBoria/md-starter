import styled from "styled-components";
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
  padding: 8px 0;
`;

export const Title = styled.span`
  width: 100%;
`;

export const ChildrensContainer = styled.div<{ $showContent: boolean }>`
  padding-left: 15px;
  max-height: ${({ $showContent }) => ($showContent ? "2000px" : "0")};
  opacity: ${({ $showContent }) => ($showContent ? "1" : "0")};
  overflow: hidden;
  transition: all 0.3s ease-in-out;
`;
