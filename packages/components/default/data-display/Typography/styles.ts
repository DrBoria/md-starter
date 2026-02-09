import styled, { css } from "styled-components";
import type { TWithBasicElementOffsets } from '@md/styles';
import { withOffsetBottom, withOffsetsRight, basicFont } from '@md/styles';
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

export { basicFont };

const themeStyles = css`
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;

export const StyledPageTitle = styled.h1<TWithBasicElementOffsets>`
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  color: ${({ theme }) => theme.colors.sectionContent};
  font: ${basicFont};
  font-weight: 700;
  font-size: ${({ theme }) => theme.font.sizes.large};
  font-family: ${({ theme }) => theme.font.family.title};
  line-height: 1.2;
  text-transform: capitalize;
  
  ${themeStyles}
`;

export const StyledSubTitle = styled.h2<TWithBasicElementOffsets>`
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  color: ${({ theme }) => theme.colors.sectionContent};
  font: ${basicFont};
  font-size: ${({ theme }) => theme.font.sizes.large};
  font-family: ${({ theme }) => theme.font.family.title};
  line-height: 1.3;

  ${themeStyles}
`;

export const StyledSectionTitle = styled.h3<TWithBasicElementOffsets>`
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  color: ${({ theme }) => theme.colors.sectionContent};
  font: ${basicFont};
  font-weight: 700;
  font-size: ${({ theme }) => theme.font.sizes.regular};
  font-family: ${({ theme }) => theme.font.family.title};
  line-height: 1.4;
  text-transform: capitalize;

  ${themeStyles}
`;

export const StyledPlainText = styled.p<TWithBasicElementOffsets>`
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  color: ${({ theme }) => theme.colors.sectionContent};
  font: ${basicFont};
  font-size: ${({ theme }) => theme.font.sizes.regular};
  line-height: 1.5;

  ${themeStyles}
`;

export const StyledHighlighted = styled.span<TWithBasicElementOffsets>`
  color: ${({ theme }) => theme.colors.highlighted};
  ${themeStyles}
`;

export const StyledLabel = styled.label<TWithBasicElementOffsets>`
  display: inline-block;
  padding: ${({ theme }) => theme.offsets.elementContent};
  color: ${({ theme }) => theme.colors.labelText};
  background-color: ${({ theme }) => theme.colors.labelBackground};
  border-radius: ${({ theme }) => theme.border.radius}px;
  
  ${themeStyles}
`;

export const StyledDescriptionText = styled.h3`
  font-weight: 500;
  font-size: ${({ theme }) => theme.font.sizes.small};
  line-height: 1.25;
  ${themeStyles}
`;

export const StyledHeaderText = styled.h3`
  font-weight: 700;
  font-size: ${({ theme }) => theme.font.sizes.large};
  color: ${({ theme }) => theme.colors.sectionContent};
  ${themeStyles}
`;
