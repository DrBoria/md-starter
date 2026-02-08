import styled, { css } from "styled-components";
import type { TWithBasicElementOffsets } from '@md/styles';
import { withOffsetBottom, withOffsetsRight, basicFont } from '@md/styles';
import { vikingTheme } from "./themes/viking";
import { liquidGlassTheme } from "./themes/liquid-glass";

export { basicFont };

const sizes = {
  PlainText: { fontSize: '1.1rem', lineHeight: '1.5rem' },
  SubTitle: { fontSize: '1.3rem', lineHeight: '1.8rem' },
  SectionTitle: { fontSize: '1.6rem', lineHeight: '2rem' },
  PageTitle: { fontSize: '2.5rem', lineHeight: '3rem' },
};

// Generic Theme Mixin
const themeStyles = css`
  ${({ theme }) => theme?.theme === 'viking' && vikingTheme}
  ${({ theme }) => theme?.theme === 'liquid-glass' && liquidGlassTheme}
`;

export const StyledPageTitle = styled.h1<TWithBasicElementOffsets>`
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  color: ${({ theme }) => theme?.colors?.sectionContent || 'inherit'};
  font: ${basicFont};
  font-weight: 700;
  font-size: ${sizes.PageTitle.fontSize};
  font-family: ${({ theme }) => theme?.fontFamily || theme?.font?.family?.text || 'inherit'};
  line-height: ${sizes.PageTitle.lineHeight};
  text-transform: capitalize;
  
  ${themeStyles}
`;

export const StyledSubTitle = styled.h2<TWithBasicElementOffsets>`
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  color: ${({ theme }) => theme?.colors?.sectionContent || 'inherit'};
  font: ${basicFont};
  font-size: ${sizes.SubTitle.fontSize};
  font-family: ${({ theme }) => theme?.fontFamily || theme?.font?.family?.title || 'inherit'};
  line-height: ${sizes.SubTitle.lineHeight};

  ${themeStyles}
`;

export const StyledSectionTitle = styled.h3<TWithBasicElementOffsets>`
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  color: ${({ theme }) => theme?.colors?.sectionContent || 'inherit'};
  font: ${basicFont};
  font-weight: 700;
  font-size: ${sizes.SectionTitle.fontSize};
  font-family: ${({ theme }) => theme?.fontFamily || theme?.font?.family?.title || 'inherit'};
  line-height: ${sizes.SectionTitle.lineHeight};
  text-transform: capitalize;

  ${themeStyles}
`;

export const StyledPlainText = styled.p<TWithBasicElementOffsets>`
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  color: ${({ theme }) => theme?.colors?.sectionContent || 'inherit'};
  font: ${basicFont};
  font-size: ${sizes.PlainText.fontSize};
  line-height: ${sizes.PlainText.lineHeight};

  ${themeStyles}
`;

export const StyledHighlighted = styled.span<TWithBasicElementOffsets>`
  color: ${({ theme }) => theme?.colors?.highlighted || 'inherit'};
  ${themeStyles}
`;

export const StyledLabel = styled.label<TWithBasicElementOffsets>`
  display: inline-block;
  padding: ${({ theme }) => theme?.offsets?.elementContent ? `calc(${theme.offsets.elementContent} / 2)` : '0'};
  color: ${({ theme }) => theme?.colors?.labelText || 'inherit'};
  background-color: ${({ theme }) => theme?.colors?.labelBackground || 'transparent'};
  border-radius: ${({ theme }) => theme?.borderRadius || theme?.border?.radius || '0'};
  
  ${themeStyles}
`;

export const StyledDescriptionText = styled.h3`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  ${themeStyles}
`;

export const StyledHeaderText = styled.h3`
  font-weight: 700;
  font-size: 20px;
  color: ${({ theme }) => theme?.colors?.sectionContent || '#111827'};
  ${themeStyles}
`;
