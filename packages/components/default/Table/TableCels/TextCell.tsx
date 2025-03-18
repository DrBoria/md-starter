import { PlainText } from '../../Typography';

import { StyledTextCell } from './styles';

interface TextCellProps {
  text: string | number;
  align?: 'left' | 'center' | 'right';
}

const TextCell: React.FC<TextCellProps> = ({ text, align }) => {
  return (
    <StyledTextCell align={align}>
      <PlainText>{text}</PlainText>
    </StyledTextCell>
  );
};

export default TextCell;
