import styled from 'styled-components/native';
import type { TextInputProps } from 'react-native';
import type { TWithBasicElementOffsets, TFullWidth } from '../../helpers';
import { withOffsetBottom, withOffsetsRight } from '../../helpers';

type TInputProps = TextInputProps & {
  name: string;
  fullWidth?: boolean;
} & TWithBasicElementOffsets &
  TFullWidth;

const Input = styled.TextInput<TInputProps>`
  font-family: ${({ theme }) => theme?.font?.family?.text || 'System'};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  height: ${({ theme }) => theme?.elements?.form?.height || 40}px;
  margin-right: ${withOffsetsRight}px;
  margin-bottom: ${withOffsetBottom}px;
  padding: ${({ theme }) => theme?.offsets?.elementContent || 8}px;

  color: ${({ theme }) => theme?.colors?.sectionContent || 'black'};

  background-color: ${({ theme }) => theme?.colors?.overlay || 'transparent'};
  border-radius: ${({ theme }) => theme?.border?.radius || 0}px;
`;

export { Input };
