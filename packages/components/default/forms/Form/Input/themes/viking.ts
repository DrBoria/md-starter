import { css } from "styled-components";

export const vikingTheme = css`
  background-color: ${({ theme }) => theme.colors.overlay}; 
  background-image: ${({ theme }) => theme.effects.texture};
  border: none;
  border-radius: ${({ theme }) => theme.border.radius}px;
  color: ${({ theme }) => theme.colors.sectionContent};
  box-shadow: ${({ theme }) => theme.effects.depth.inner.medium};
  ${({ theme }) => theme.geometry.ragged && `clip-path: ${theme.geometry.ragged};`}
  border-bottom: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.disabled};

  &::placeholder {
      color: ${({ theme }) => theme.colors.labelText};
      opacity: 0.5;
  }

  &:focus {
      outline: none;
      color: ${({ theme }) => theme.colors.highlighted};
      border-bottom-color: ${({ theme }) => theme.colors.highlighted};
      box-shadow: ${({ theme }) => theme.effects.glow.strong}, ${({ theme }) => theme.effects.depth.inner.strong};
      caret-color: ${({ theme }) => theme.colors.highlighted};
      filter: brightness(1.1);
  }
`;
