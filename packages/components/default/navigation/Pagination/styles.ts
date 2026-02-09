import styled, { css } from "styled-components";
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.offsets.elementContent} 0;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.offsets.elementContent};
`;

export const PageNumber = styled.button<{ $active: boolean }>`
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.highlighted : theme.colors.overlay};
  color: ${({ $active, theme }) => ($active ? theme.colors.highlightedText : theme.colors.sectionContent)};
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.disabled};
  margin: 0 ${({ theme }) => theme.offsets.elementContent};
  padding: ${({ theme }) => theme.offsets.elementContent};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.border.radius}px;
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};

  &:hover {
    background-color: ${({ theme }) => theme.colors.highlighted};
    color: ${({ theme }) => theme.colors.highlightedText};
  }

  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;

export const ArrowButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.highlighted};
  border: none;
  margin: 0 ${({ theme }) => theme.offsets.elementContent};
  padding: ${({ theme }) => theme.offsets.elementContent};
  cursor: pointer;
  font-weight: bold;

  &:hover {
    color: ${({ theme }) => theme.colors.highlightedText};
    text-shadow: ${({ theme }) => theme.shadows.small};
  }

  &:disabled {
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.disabled};
    color: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
  }

  /* Theme Support - Arrow Specific */
  ${({ theme }) => theme?.theme === 'viking' && css`
    font-family: ${theme.font.family.text};
    text-transform: uppercase;
    letter-spacing: 1px;
  `}
`;

export const Dots = styled.span`
  margin: 0 ${({ theme }) => theme.offsets.elementContent};
  font-weight: bold;
`;
