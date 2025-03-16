import Link from "next/link";
import styled, { css } from "styled-components";

import { TWithBasicElementOffsets, withOffsetBottom, withOffsetsRight } from '@md/styles';

export const basicFont = css`
  ${({ theme }) => `500 ${theme.font.size} ${theme.font.family.text}`}
`;

/**
 * @visibleName Typography
 */

const sizes = {
  PlainText: {
    fontSize: '1.1rem;',
    lineHeight: '1.5rem;',
  },

  SubTitle: {
    fontSize: '1.3rem;',
    lineHeight: '1.8rem;',
  },

  SectionTitle: {
    fontSize: '1.6rem;',
    lineHeight: '2rem;',
  },

  PageTitle: {
    fontSize: '2.5rem;',
    lineHeight: '3rem;',
  },
};

const PageTitle = styled.h1<TWithBasicElementOffsets>`
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};

  color: ${({ theme }) => theme.colors.sectionContent};
  font: ${basicFont};
  font-weight: 700;
  font-size: ${sizes.PageTitle.fontSize};
  font-family: ${({ theme }) => theme.font.family.text};
  line-height: ${sizes.PageTitle.lineHeight};
  text-transform: capitalize;
`;

const SubTitle = styled.h2<TWithBasicElementOffsets>`
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};

  color: ${({ theme }) => theme.colors.sectionContent};
  font: ${basicFont};
  font-size: ${sizes.SubTitle.fontSize};
  font-family: ${({ theme }) => theme.font.family.title};
  line-height: ${sizes.SubTitle.lineHeight};
`;

const SectionTitle = styled.h3<TWithBasicElementOffsets>`
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};

  color: ${({ theme }) => theme.colors.sectionContent};
  font: ${basicFont};
  font-weight: 700;
  font-size: ${sizes.SectionTitle.fontSize};
  font-family: ${({ theme }) => theme.font.family.title};
  line-height: ${sizes.SectionTitle.lineHeight};
  text-transform: capitalize;
`;

const PlainText = styled.p<TWithBasicElementOffsets>`
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};

  color: ${({ theme }) => theme.colors.sectionContent};
  font: ${basicFont};
  font-size: ${sizes.PlainText.fontSize};
  line-height: ${sizes.PlainText.lineHeight};
`;

const Highlighted = styled.span<TWithBasicElementOffsets>`
  color: ${({ theme }) => theme.colors.highlighted};
`;

const Label = styled.label<TWithBasicElementOffsets>`
  display: inline-block;
  padding: ${({ theme }) => `calc(${theme.offsets.elementContent} / 2)`};

  color: ${({ theme }) => theme.colors.sectionContent};

  background-color: ${({ theme }) => theme.colors.label};
  border-radius: ${({ theme }) => theme.border.radius};
`;

const DescriptionText = styled.h3`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
`;

const HeaderText = styled.h3`
  font-weight: 700;
  font-size: 20px; // same as in keystone
  color: #111827; // same as in keystone
`;

const LinkInForm = styled(Link)`
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  &:hover {
    color: #2563eb;
    text-decoration: underline;
  }
`;

export {
  Label,
  Highlighted,
  SubTitle,
  SectionTitle,
  PageTitle,
  DescriptionText,
  PlainText,
  HeaderText,
  LinkInForm,
};
