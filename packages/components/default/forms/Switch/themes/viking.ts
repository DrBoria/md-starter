import { css } from "styled-components";

export const vikingTheme = css`
  /* VIKING THEME: Switch (Stone Channel) */
  
  /* Label/Container */
  height: ${({ theme }) => theme?.elements?.form?.height || '28px'};
  width: 60px;
  background-color: ${({ theme }) => theme.colors.overlay};
  border: 1px solid ${({ theme }) => theme?.colors?.disabled || '#555'};
  clip-path: polygon(5% 0, 100% 0, 95% 100%, 0% 100%);
  padding: 4px;
  
  &:hover {
    border-color: ${({ theme }) => theme?.colors?.highlighted || 'gold'};
    box-shadow: inset 0 0 5px rgb(0 0 0 / 50%);
  }

  /* Slider (Stone Block) */
  .switch-slider {
     background-color: transparent;
     border-radius: 0;
     border: none;
     
     &::before {
        border-radius: 0;
        clip-path: polygon(10% 0, 100% 0, 90% 100%, 0% 100%);
        background-color: ${({ theme }) => theme?.colors?.disabled || '#777'};
        border: 1px solid rgb(0 0 0 / 50%);
     }
  }

  /* Checked State */
  input:checked + .switch-slider::before {
     background-color: ${({ theme }) => theme?.colors?.highlighted || 'gold'};
     box-shadow: 0 0 10px ${({ theme }) => theme?.colors?.highlighted || 'gold'};
  }
`;
