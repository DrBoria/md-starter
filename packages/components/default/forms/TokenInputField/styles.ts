import styled from "styled-components";
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

export const FieldContainer = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0 0 ${({ theme }) => theme.offsets.betweenElements};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.offsets.elementContent};

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
  margin-bottom: ${({ theme }) => theme.offsets.elementContent};
  color: ${({ theme }) => theme.colors.labelBackground};
`;

export const FieldDescription = styled.div`
  font-size: ${({ theme }) => theme.font.sizes.small};
  color: ${({ theme }) => theme.colors.labelText};
  margin-bottom: ${({ theme }) => theme.offsets.elementContent};
`;
