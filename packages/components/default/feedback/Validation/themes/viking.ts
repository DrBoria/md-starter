import { css, keyframes } from "styled-components";

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
  20%, 40%, 60%, 80% { transform: translateX(2px); }
`;

export const vikingTheme = css`
  color: ${({ theme }) => theme.colors.errorText};
  font-family: ${({ theme }) => theme.fontFamily};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.font.spacing};

  &::before {
    content: "⚠";
    margin-right: ${({ theme }) => theme.offsets.elementContent};
    font-size: ${({ theme }) => theme.font.sizes.large};
    color: ${({ theme }) => theme.colors.errorText};
  }

  animation: ${shake} 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
`;
