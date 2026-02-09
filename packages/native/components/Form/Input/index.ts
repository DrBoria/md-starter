import styled from 'styled-components/native';
import { TextInput } from 'react-native';
import type { TWithBasicElementOffsets, TFullWidth } from '@md/native/components/helpers';
import { withOffsetBottom, withOffsetsRight } from '@md/native/components/helpers';

type TInputProps = {
  name: string;
  fullWidth?: boolean;
} & TWithBasicElementOffsets &
  TFullWidth;

const Input = styled(TextInput) <TInputProps>`
  font-family: ${({ theme }) => theme.font.family.text};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  height: ${({ theme }) => theme.elements.form?.height}px;
  margin-right: ${withOffsetsRight}px;
  margin-bottom: ${withOffsetBottom}px;
  padding: ${({ theme }) => theme.offsets.elementContent}px;

  color: ${({ theme }) => theme.colors.sectionContent};

  background-color: ${({ theme }) => theme.colors.overlay};
  border-radius: ${({ theme }) => theme.border.radius}px;
`;

export { Input };
