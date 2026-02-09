import { css } from "styled-components";

export const vikingTheme = css<{ $active?: boolean }>`
  border-radius: 0;
  clip-path: ${({ theme }) => theme.geometry.ragged};
  background-image: ${({ theme }) => theme.effects.texture};
  background-color: ${({ $active, theme }) => $active ? theme.colors.overlayActive : theme.colors.overlay};
  color: ${({ $active, theme }) => $active ? theme.colors.highlighted : theme.colors.sectionContent};
  border: none;
  box-shadow: ${({ $active, theme }) => $active ? theme.effects.glow.medium : theme.effects.depth.inner.medium};
  height: ${({ theme }) => theme.elements.form.height};
  min-width: ${({ theme }) => theme.elements.form.height};
  font-family: ${({ theme }) => theme.font.family.text};
  font-weight: 700;
  font-size: ${({ theme }) => theme.font.sizes.regular};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.overlayActive};
    color: ${({ theme }) => theme.colors.highlighted};
    box-shadow: ${({ theme }) => theme.effects.glow.medium};
    filter: brightness(1.2);
    text-shadow: ${({ theme }) => theme.effects.glow.small};
  }
`;
