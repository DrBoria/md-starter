import { css, keyframes } from "styled-components";

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
  20%, 40%, 60%, 80% { transform: translateX(2px); }
`;

export const vikingTheme = css`
  /* VIKING THEME: Warning Rune */
  color: ${({ theme }) => theme?.colors?.errorText || "red"};
  font-family: ${({ theme }) => theme?.fontFamily || "serif"};
  text-transform: uppercase;
  letter-spacing: 1px;

  &::before {
    content: "⚠";
    margin-right: ${({ theme }) => theme?.offsets?.elementContent || "8px"};
    font-size: 1.2em;
    color: ${({ theme }) => theme?.colors?.error || "red"};
  }

  animation: ${shake} 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
`;
