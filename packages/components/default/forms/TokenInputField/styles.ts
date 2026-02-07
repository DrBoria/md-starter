import styled from "styled-components";
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

export const FieldContainer = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0 0 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  /* Theme Support */
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const FieldLabel = styled.label`
  font-weight: 500;
  margin-bottom: 4px;
  color: ${({ theme }) => theme?.colors?.labelBackground || 'inherit'};
`;

export const FieldDescription = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme?.colors?.labelText || 'gray'};
  margin-bottom: 8px;
`;
