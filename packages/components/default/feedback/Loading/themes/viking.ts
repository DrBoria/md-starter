import { css, keyframes } from "styled-components";

const vikingRotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const vikingTheme = css`
  /* VIKING THEME: Ouroboros or Rune Circle */
  
  /* Replace standard spinner styling with something distinct if possible, 
     but for now we augement the container/image */
     
  display: flex;
  justify-content: center;
  align-items: center;

  img, svg {
    filter: drop-shadow(0 0 10px ${({ theme }) => theme?.colors?.highlighted || 'gold'});
    animation: ${vikingRotate} 3s linear infinite;
  }
`;
