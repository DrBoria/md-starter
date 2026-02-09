import { css } from "styled-components";

export const vikingTheme = css`
  height: ${({ theme }) => theme.elements.form.height};
  width: ${({ theme }) => theme.elements.icons.width};
  background-color: ${({ theme }) => theme.colors.overlay};
  border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.disabled};
  clip-path: polygon(5% 0, 100% 0, 95% 100%, 0% 100%);
  padding: ${({ theme }) => theme.offsets.elementContent};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.highlighted};
    box-shadow: ${({ theme }) => theme.effects.depth.inner.soft};
  }

  .switch-slider {
     background-color: transparent;
     border-radius: 0;
     border: none;
     
     &::before {
        border-radius: 0;
        clip-path: polygon(10% 0, 100% 0, 90% 100%, 0% 100%);
        background-color: ${({ theme }) => theme.colors.disabled};
        border: ${({ theme }) => theme.border.size}px solid ${({ theme }) => theme.colors.overlay};
     }
  }

  input:checked + .switch-slider::before {
     background-color: ${({ theme }) => theme.colors.highlighted};
     box-shadow: ${({ theme }) => theme.effects.glow.medium};
  }
`;
