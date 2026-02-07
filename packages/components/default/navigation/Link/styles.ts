import styled from "styled-components";
import Link from "next/link";
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

export const LinkStyled = styled(Link)`
  &:hover {
    color: ${({ theme }) => theme?.colors?.sectionContent || 'inherit'};
    text-decoration: underline;
  }

  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;

export const LinkInForm = styled(Link)`
  font-size: 0.875rem;
  color: ${({ theme }) => theme?.colors?.highlighted || 'blue'};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;
