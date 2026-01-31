import { StyledTextCell } from './styles';

interface CellProps {
  text: string;
  align?: 'left' | 'center' | 'right';
}

const BoldTextCell: React.FC<CellProps> = ({ text, align = 'left', ...props }: CellProps) => {
  return (
    <StyledTextCell align={align} {...props}>
      <b>{text}</b>
    </StyledTextCell>
  );
};

export default BoldTextCell;
