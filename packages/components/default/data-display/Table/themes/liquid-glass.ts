import { css } from "styled-components";

export const liquidGlassTheme = css`
  /* LIQUID GLASS THEME: Float Data Grid */
  
  /* Grid Container */
  background: rgb(255 255 255 / 5%);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  border: 1px solid rgb(255 255 255 / 10%);
  box-shadow: 0 8px 32px 0 rgb(31 38 135 / 15%);
  overflow: hidden;
  
  /* Header Cells */
  .header-cell {
    background: rgb(255 255 255 / 10%);
    color: ${({ theme }) => theme?.colors?.text || 'white'};
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 1px;
    border-bottom: 1px solid rgb(255 255 255 / 10%);
    padding: 20px;
  }

  /* Items (Rows) styles handled via child selectors usually, 
     but assuming flat grid structure from inspection */
  
  /* Row separation simulation for Grid */
  & > div {
     border-bottom: 1px solid rgb(255 255 255 / 5%);
     transition: background 0.3s ease;
  }

  & > div:hover {
     background: rgb(255 255 255 / 5%);
  }
`;
