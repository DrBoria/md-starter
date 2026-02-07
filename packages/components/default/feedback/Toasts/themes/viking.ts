import { css, keyframes } from "styled-components";

const slideIn = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

export const vikingTheme = css`
  /* VIKING THEME: Message Scroll */
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme?.colors?.highlighted || 'gold'};
  color: ${({ theme }) => theme?.colors?.text || 'white'};
  font-family: ${({ theme }) => theme?.fontFamily || 'serif'};
  border-radius: 0;
  box-shadow: 5px 5px 0 rgb(0 0 0 / 50%);
  animation: ${slideIn} 0.3s ease-out forwards;
  
  /* Paper/Scroll texture simulation */
  &::before {
    content: '';
    position: absolute;
    inset: 5px;
    border: 1px dashed ${({ theme }) => theme?.colors?.sectionContent || '#555'};
    pointer-events: none;
  }

  h4 {
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${({ theme }) => theme?.colors?.highlighted || 'gold'};
  }

  button {
    background: transparent;
    border: 1px solid ${({ theme }) => theme?.colors?.text || 'white'};
    color: ${({ theme }) => theme?.colors?.text || 'white'};
    cursor: pointer;
    padding: 2px 8px;

    &:hover {
      background: ${({ theme }) => theme?.colors?.highlighted || 'gold'};
      color: black;
    }
  }
`;
