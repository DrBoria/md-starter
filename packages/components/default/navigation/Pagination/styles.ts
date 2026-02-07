import styled, { css } from "styled-components";
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  flex-wrap: wrap; /* Handle small screens */
  gap: 4px;
`;

export const PageNumber = styled.button<{ $active: boolean }>`
  background-color: ${({ $active, theme }) =>
    $active ? (theme?.colors?.highlighted || "#007bff") : (theme?.colors?.overlay || "var(--color-bg-secondary)")};
  color: ${({ $active, theme }) => ($active ? (theme?.colors?.highlightedText || "#fff") : (theme?.colors?.sectionContent || "#000"))};
  border: 1px solid ${({ theme }) => theme?.colors?.disabled || 'rgb(204 204 204)'};
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};

  &:hover {
    background-color: ${({ theme }) => theme?.colors?.highlighted || "#007bff"};
    color: ${({ theme }) => theme?.colors?.highlightedText || "#fff"};
  }

  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;

export const ArrowButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme?.colors?.highlighted || "#007bff"};
  border: none;
  margin: 0 10px;
  padding: 5px 10px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    color: ${({ theme }) => theme?.colors?.highlightedText || "#0056b3"};
    text-shadow: 0 0 8px ${({ theme }) => theme?.colors?.highlighted || "transparent"};
  }

  &:disabled {
  border: 1px solid ${({ theme }) => theme?.colors?.disabled || 'rgb(204 204 204)'};
    color: ${({ theme }) => theme?.colors?.disabled || "#ccc"};
    cursor: not-allowed;
  }

  /* Theme Support - Arrow Specific */
  ${({ theme }) => theme?.theme === 'viking' && css`
    font-family: ${theme?.font?.family?.text || 'inherit'};
    text-transform: uppercase;
    letter-spacing: 1px;
  `}
`;

export const Dots = styled.span`
  margin: 0 5px;
  font-weight: bold;
`;
