import { css } from "styled-components";

export const vikingTheme = css<{ $tone?: string }>`
  border-radius: ${({ theme }) => theme.border.radius}px;
  ${({ theme }) => theme.geometry.ragged && `clip-path: ${theme.geometry.ragged};`}
  font-family: ${({ theme }) => theme.fontFamily};
  letter-spacing: ${({ theme }) => theme.font.spacing};
  text-transform: uppercase;
  font-weight: 700;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  color: ${({ theme }) => theme.colors.highlightedText};

  span {
    color: inherit;
    transition: text-shadow 0.2s ease;
  }
  
  background: ${({ theme }) => theme.colors.highlighted};
  background-image: ${({ theme }) => theme.effects.texture};
  border: none;
  box-shadow: 
    ${({ theme }) => theme.effects.depth.inner.soft},
    ${({ theme }) => theme.effects.depth.outer.soft},
    ${({ theme }) => theme.effects.glow.soft};

  ${({ $tone, theme }) => $tone === 'passive' && css`
    background: ${theme.colors.labelBackground};
    background-image: ${theme.effects.texture};
    color: ${theme.colors.sectionContent}; 
  `}

  ${({ $tone, theme }) => $tone === 'warning' && css`
    background: ${theme.colors.warningBackground};
    background-image: ${theme.effects.texture};
    color: ${theme.colors.warningText};
  `}

  &:hover {
    filter: brightness(1.2);
    transform: translateY(-2px);
    box-shadow: 
      ${({ theme }) => theme.effects.depth.inner.medium},
      ${({ theme }) => theme.effects.depth.outer.medium},
      ${({ theme }) => theme.effects.glow.medium};
    
    span, svg {
      color: ${({ theme }) => theme.colors.highlightedText};
      filter: drop-shadow(${({ theme }) => theme.effects.glow.small});
      text-shadow: ${({ theme }) => theme.effects.glow.small};
    }
  }

  &:active {
    transform: translateY(2px);
    box-shadow: ${({ theme }) => theme.effects.depth.inner.strong}; 
    filter: brightness(0.8);
  }

  &::after {
      content: '';
      position: absolute;
      inset: 2px;
      pointer-events: none;
      border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.highlighted};
      opacity: 0.2;
      clip-path: ${({ theme }) => theme.geometry.ragged};
  }

  &:hover::after {
      opacity: 0.6;
      box-shadow: ${({ theme }) => theme.effects.glow.soft};
  }
`;
