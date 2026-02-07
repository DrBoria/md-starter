import { Text } from "react-native";
import styled from "styled-components/native";
import type { TWithBasicElementOffsets } from "@md/native/components/helpers";
import { withOffsetBottom, withOffsetsRight } from "@md/native/components/helpers";

/**
 * @visibleName Typography
 */

const sizes = {
  PlainText: {
    fontSize: 18, // Approx. 1.1rem
    lineHeight: 24, // Approx. 1.5rem
  },
  SubTitle: {
    fontSize: 20, // Approx. 1.3rem
    lineHeight: 28, // Approx. 1.8rem
  },
  SectionTitle: {
    fontSize: 24, // Approx. 1.6rem
    lineHeight: 32, // Approx. 2rem
  },
  PageTitle: {
    fontSize: 40, // Approx. 2.5rem
    lineHeight: 48, // Approx. 3rem
  },
};

const PageTitle = styled(Text) <TWithBasicElementOffsets>`
  color: ${({ theme }) => theme?.colors?.sectionContent || 'black'};
  font-family: ${({ theme }) => theme?.font?.family?.title || 'System'};
  font-size: ${sizes.PageTitle.fontSize}px;
  line-height: ${sizes.PageTitle.lineHeight}px;
  font-weight: 600;
  text-transform: capitalize;
  margin-right: ${withOffsetsRight}px;
  margin-bottom: ${withOffsetBottom}px;
`;

const SubTitle = styled(Text) <TWithBasicElementOffsets>`
  color: ${({ theme }) => theme?.colors?.sectionContent || 'black'};
  font-family: ${({ theme }) => theme?.font?.family?.title || 'System'};
  font-size: ${sizes.SubTitle.fontSize}px;
  line-height: ${sizes.SubTitle.lineHeight}px;
  margin-right: ${withOffsetsRight}px;
  margin-bottom: ${withOffsetBottom}px;
`;

const SectionTitle = styled(Text) <TWithBasicElementOffsets>`
  color: ${({ theme }) => theme?.colors?.sectionContent || 'black'};
  font-family: ${({ theme }) => theme?.font?.family?.title || 'System'};
  font-size: ${sizes.SectionTitle.fontSize}px;
  line-height: ${sizes.SectionTitle.lineHeight}px;
  font-weight: 600;
  text-transform: capitalize;
  margin-right: ${withOffsetsRight}px;
  margin-bottom: ${withOffsetBottom}px;
`;

const PlainText = styled(Text) <TWithBasicElementOffsets>`
  color: ${({ theme }) => theme?.colors?.sectionContent || 'black'};
  font-family: ${({ theme }) => theme?.font?.family?.text || 'System'};
  font-size: ${sizes.PlainText.fontSize}px;
  line-height: ${sizes.PlainText.lineHeight}px;
  margin-right: ${withOffsetsRight}px;
  margin-bottom: ${withOffsetBottom}px;
`;

const Highlighted = styled(Text) <TWithBasicElementOffsets>`
  color: ${({ theme }) => theme?.colors?.highlighted || 'red'};
  font-family: ${({ theme }) => theme?.font?.family?.title || 'System'};
`;

const Label = styled(Text) <TWithBasicElementOffsets>`
  font-family: ${({ theme }) => theme?.font?.family?.text || 'System'};
  padding: ${({ theme }) => (theme?.offsets?.elementContent ? theme.offsets.elementContent / 2 : 0)}px;
  color: ${({ theme }) => theme?.colors?.sectionContent || 'black'};
  background-color: ${({ theme }) => theme?.colors?.labelBackground || 'transparent'};
  border-radius: ${({ theme }) => theme?.border?.radius || 0}px;
`;

const DescriptionText = styled(Text)`
  font-family: ${({ theme }) => theme?.font?.family?.text || 'System'};
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
`;

const HeaderText = styled(Text)`
  font-family: ${({ theme }) => theme?.font?.family?.title || 'System'};
  font-weight: 600;
  font-size: 20px; // same as in keystone
  color: #111827; // same as in keystone
`;

const LinkInForm = styled(Text)`
  font-family: ${({ theme }) => theme?.font?.family?.title || 'System'};
  color: #374151;
  font-size: 14px;
  font-weight: 600;
  text-decoration: underline;
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
