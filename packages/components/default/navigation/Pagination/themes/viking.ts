import { css } from "styled-components";

export const vikingTheme = css<{ $active?: boolean }>`
  /* VIKING THEME: PageNumber (Runestones) */
  border-radius: 0;
  clip-path: ${({ theme }) => theme?.geometry?.ragged};
  background-image: ${({ theme }) => theme?.effects?.texture};
  
  /* Active state: Dark background with Glowing Green Digit */
  background-color: ${({ $active, theme }) => $active ? theme.colors.overlayActive : theme.colors.overlay};
  color: ${({ $active, theme }) => $active ? (theme?.colors?.highlighted || 'gold') : (theme?.colors?.sectionContent || '#ccc')};
  border: none;
  box-shadow: ${({ $active, theme }) => $active ? (theme?.effects?.glow?.medium) : (theme?.effects?.depth?.inner?.medium)};
  height: ${({ theme }) => theme?.elements?.form?.height || '40px'};
  min-width: ${({ theme }) => theme?.elements?.form?.height || '40px'};
  font-family: ${({ theme }) => theme?.font?.family?.text || 'serif'};
  font-weight: 700;
  font-size: 1.2rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme?.colors?.overlayActive || '#555'};
    color: ${({ theme }) => theme?.colors?.highlighted || 'gold'};
    box-shadow: ${({ theme }) => theme?.effects?.glow?.medium};
    filter: brightness(1.2);
    text-shadow: 0 0 8px ${({ theme }) => theme?.colors?.highlighted || 'gold'};
  }
`;
