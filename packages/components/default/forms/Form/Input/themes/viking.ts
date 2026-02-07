import { css } from "styled-components";

export const vikingTheme = css`
  /* VIKING THEME: Engraved Rune Slate */
  background-color: ${({ theme }) => theme?.colors?.overlay || 'black'}; 
  background-image: ${({ theme }) => theme?.effects?.texture}; /* NOISE */
  border: none;
  border-radius: 0;
  color: ${({ theme }) => theme?.colors?.sectionContent || 'white'};
  
  /* Inner Shadow for Depth */
  box-shadow: ${({ theme }) => theme?.effects?.depth?.inner?.medium || 'inset 2px 2px 5px rgba(0,0,0,0.8)'};
  
  /* Ragged Edges */
  ${({ theme }) => theme?.geometry?.ragged && `clip-path: ${theme.geometry.ragged};`}
  border-bottom: 2px solid ${({ theme }) => theme?.colors?.disabled || 'gray'};

  &::placeholder {
      color: ${({ theme }) => theme?.colors?.labelText || 'lightgray'};
      opacity: 0.5;
  }

  &:focus {
      outline: none;
      color: ${({ theme }) => theme?.colors?.highlighted || 'gold'};
      border-bottom-color: ${({ theme }) => theme?.colors?.highlighted || 'gold'};
      box-shadow: ${({ theme }) => theme?.effects?.glow?.strong}, ${({ theme }) => theme?.effects?.depth?.inner?.strong};
      caret-color: ${({ theme }) => theme?.colors?.highlighted || 'gold'};
      filter: brightness(1.1);
  }
`;
