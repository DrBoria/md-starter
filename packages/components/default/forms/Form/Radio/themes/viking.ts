import { css } from 'styled-components';

export const vikingTheme = css`
  /* VIKING THEME: Rune Stone Markers */
  border-radius: 0;
  clip-path: ${({ theme }) => theme?.geometry?.ragged};
  background-image: ${({ theme }) => theme?.effects?.texture};
  box-shadow: ${({ theme }) => theme?.effects?.depth?.inner?.medium};
  border: 1px solid ${({ theme }) => theme?.colors?.disabled};

  &::before {
    content: '';
    color: ${({ theme }) => theme.colors.highlighted};
    font-size: ${({ theme }) => theme.font.sizes.small};
    font-weight: 700;
    transition: all 0.2s ease;
    opacity: 0;
    transform: scale(0.5);
  }

  /* Checked State Context */
  input:checked + && {
    background-color: ${({ theme }) => theme?.colors?.overlayActive};
    box-shadow: ${({ theme }) => theme?.effects?.glow?.medium};
    border-color: ${({ theme }) => theme?.colors?.highlighted};

    &::before {
      content: 'ᛟ'; /* Othala Rune */
      opacity: 1;
      transform: scale(1);
      text-shadow: ${({ theme }) => theme?.effects?.glow?.soft};
    }
  }
`;
