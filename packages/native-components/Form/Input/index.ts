import styled from 'styled-components/native';
import { TextInputProps } from 'react-native';
import { withOffsetBottom, withOffsetsRight, TWithBasicElementOffsets, TFullWidth } from '../../helpers';

type TInputProps = TextInputProps & {
  name: string;
  fullWidth?: boolean;
} & TWithBasicElementOffsets &
  TFullWidth;

const Input = styled.TextInput<TInputProps>`
  font-family: ${({ theme }) => theme.font.family.text};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  height: ${({ theme }) => theme.elements.form.height}px;
  margin-right: ${withOffsetsRight};
  margin-bottom: ${withOffsetBottom};
  padding: ${({ theme }) => theme.offsets.elementContent}px;

  color: ${({ theme }) => theme.colors.sectionContent};

  background-color: ${({ theme }) => theme.colors.overlay};
  border-radius: ${({ theme }) => theme.border.radius}px;
  border: none;
`;

export { Input };
