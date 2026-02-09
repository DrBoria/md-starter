import { css } from 'styled-components';

export const liquidGlassTheme = css`
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.overlay};
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.disabled};
  box-shadow: ${({ theme }) => theme.effects.depth.outer.soft};
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    width: 50%;
    height: 50%;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.highlighted};
    opacity: 0;
    transform: scale(0);
    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: ${({ theme }) => theme.effects.glow.small};
  }

  input:checked + && {
    background: ${({ theme }) => theme.colors.overlayActive};
    border-color: ${({ theme }) => theme.colors.highlighted};
    box-shadow: ${({ theme }) => theme.effects.glow.soft};

    &::before {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
