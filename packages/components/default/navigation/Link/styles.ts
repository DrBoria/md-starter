import styled from "styled-components";
import Link from "next/link";
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

export const LinkStyled = styled(Link)`
  &:hover {
    color: ${({ theme }) => theme.colors.sectionContent};
    text-decoration: underline;
  }

  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;

export const LinkInForm = styled(Link)`
  font-size: ${({ theme }) => theme.font.sizes.small};
  color: ${({ theme }) => theme.colors.highlighted};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;
