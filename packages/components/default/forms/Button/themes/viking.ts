import { css } from "styled-components";

export const vikingTheme = css<{ $tone?: string }>`
  /* VIKING THEME AUGMENTATION (Valhalla Style) */

  /* 1. Geometry: Rough Stone */
  border-radius: 0;
  ${({ theme }) => theme?.geometry?.ragged && `clip-path: ${theme.geometry.ragged};`}
  /* 2. Typography: Glow on hover */
  font-family: ${({ theme }) => theme?.fontFamily || theme?.font?.family?.text || 'serif'};
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 700;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Ensure text is bright and can glow */
  color: ${({ theme }) => theme?.colors?.highlightedText || 'white'};

  span {
    color: inherit;
    transition: text-shadow 0.2s ease;
  }
  
  /* 3. Material: Etched Stone with Texture */
  background: ${({ theme }) => theme?.colors?.highlighted || 'gold'};
  background-image: ${({ theme }) => theme?.effects?.texture}; /* NOISE */
  border: none; 

  /* 4. Volume: Highlight top, Shadow bottom */
  box-shadow: 
    inset 0 1px 0 rgb(255 255 255 / 40%), 
    0 4px 0 rgb(0 0 0 / 50%),
    ${({ theme }) => theme?.effects?.glow?.soft};

  /* Tone Overrides */

  /* Tone Overrides */
  ${({ $tone, theme }) => $tone === 'passive' && css`
    background: ${theme?.colors?.labelBackground || 'gray'};
    background-image: ${theme?.effects?.texture};
    color: ${theme?.colors?.sectionContent || 'white'}; 
  `}

  ${({ $tone, theme }) => $tone === 'warning' && css`
    background: ${theme?.colors?.warning || 'orange'};
    background-image: ${theme?.effects?.texture};
    color: ${theme?.colors?.warningText || 'white'};
  `}

  /* 5. Interaction: Glow & Cracks */
  &:hover {
    filter: brightness(1.2);
    transform: translateY(-2px);
    box-shadow: 
      inset 0 1px 0 rgb(255 255 255 / 50%), 
      0 6px 0 rgb(0 0 0 / 50%),
      0 6px 0 rgb(0 0 0 / 50%),
      ${({ theme }) => theme.effects.glow.medium};
    
    /* Text/Number glow - CRITICAL FIX */
    span, svg {
      color: ${({ theme }) => theme.colors.highlightedText || 'white'};
      filter: drop-shadow(0 0 5px ${({ theme }) => theme.colors.highlighted || 'white'});
      text-shadow: 0 0 10px ${({ theme }) => theme.colors.highlighted || 'white'};
    }
  }

  &:active {
    transform: translateY(2px);
    box-shadow: inset 0 2px 5px rgb(0 0 0 / 70%); 
    filter: brightness(0.8);
    
    /* Crack effect on click */
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: ${({ theme }) => theme.effects.cracks};
      background-size: cover;
      opacity: 0.6;
      pointer-events: none;
    }
  }

  /* 6. Decorative Frame (Simplified Knotwork) */
  &::after {
      content: '';
      position: absolute;
      inset: 2px;
      pointer-events: none;
      border: 1px solid ${({ theme }) => theme?.colors?.highlighted || 'gold'};
      opacity: 0.2;
      clip-path: ${({ theme }) => theme?.geometry?.ragged};
  }

  &:hover::after {
      opacity: 0.6;
      box-shadow: inset 0 0 10px ${({ theme }) => theme?.colors?.highlighted || 'gold'}30;
  }
`;
