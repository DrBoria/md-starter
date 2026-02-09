import { css, keyframes } from "styled-components";

const slideIn = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

export const vikingTheme = css`
  background: ${({ theme }) => theme.colors.section};
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.highlighted};
  color: ${({ theme }) => theme.colors.sectionContent};
  font-family: ${({ theme }) => theme.fontFamily};
  border-radius: ${({ theme }) => theme.border.radius}px;
  box-shadow: ${({ theme }) => theme.effects.depth.outer.medium};
  animation: ${slideIn} 0.3s ease-out forwards;
  
  &::before {
    content: '';
    position: absolute;
    inset: 5px;
    border: ${({ theme }) => theme.border.size}px dashed ${({ theme }) => theme.colors.sectionContent};
    pointer-events: none;
  }

  h4 {
    text-transform: uppercase;
    letter-spacing: ${({ theme }) => theme.font.spacing};
    color: ${({ theme }) => theme.colors.highlighted};
  }

  button {
    background: transparent;
    border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.sectionContent};
    color: ${({ theme }) => theme.colors.sectionContent};
    cursor: pointer;
    padding: ${({ theme }) => theme.offsets.elementContent};

    &:hover {
      background: ${({ theme }) => theme.colors.highlighted};
      color: ${({ theme }) => theme.colors.highlightedText};
    }
  }
`;
