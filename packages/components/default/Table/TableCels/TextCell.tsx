import { PlainText } from '../../Typography';

import { StyledTextCell } from './styles';

type TTextDisplayCellProps = {
  text: any;
  align?: 'center' | 'left' | 'right';
};

const TextDisplayCell = ({ text, align, ...props }: TTextDisplayCellProps) => {
  return (
    <StyledTextCell align={align} {...props}>
      <PlainText>{text}</PlainText>
    </StyledTextCell>
  );
};

export default TextDisplayCell;
