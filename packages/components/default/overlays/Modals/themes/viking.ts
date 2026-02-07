import { css } from "styled-components";

export const vikingTheme = css`
  /* VIKING THEME: Modal */
  background-color: ${({ theme }) => theme?.colors?.section || '#222'};
  background-image: ${({ theme }) => theme?.effects?.texture};
  color: ${({ theme }) => theme?.colors?.sectionContent || 'white'};
  border-radius: 0;
  clip-path: ${({ theme }) => theme?.geometry?.cut || 'none'};
  box-shadow: ${({ theme }) => theme?.effects?.depth?.outer?.medium || '0 10px 30px rgba(0,0,0,0.8)'};
  border: 4px solid ${({ theme }) => theme?.colors?.sectionContent || '#555'};
  border-image: linear-gradient(to bottom, #8B4513, #555) 1;
`;
